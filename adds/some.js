window.onload = () => {
    let personalInfoDiv = document.createElement("div");
    let wrapper = document.querySelector('.wrapper');

    let loadDataForCard = 0;
    let signBlock = document.querySelector(".start");
    let personBlock = document.querySelector(".person");
    let mainBlock = document.querySelector(".workspace");
    let tab = document.querySelector('#maket');
    //nav
    let navigation = document.querySelectorAll('.link');
    console.log(navigation);
    let login, password;
    let user = {};
    let formLog = document.querySelector('#form-signin');
    let dbTable = document.querySelector('.db-table');
    const dbTableDoc = document.createElement('table'); //table of doctors
    let btnForm = formLog.lastElementChild;
    let btnExit = document.querySelector('.sign-out');
    let btnViewDb = document.querySelector('.button-view');
    const butDoctors = document.querySelector('.button-viewDoctors');
    const butPatients = document.querySelector('.button-viewPatients');
    const butAddNewDoctor = document.querySelector('.button-addDoc');
    const butHealing = document.querySelector('.button-createHealing');
    let btnAddNewPatient = document.querySelector('.button-add').lastElementChild;
    let formNewPatient = document.querySelector('.form');
    let arrayOfNewData = [];
    const healingBlock = document.querySelector('.block');

    let p = 0;


    function myFunction() {
        this.hidden = true;
    }
    const heal = function() {
        const sel = document.querySelector('#fir');
        const sell = document.querySelector('#sec');


        if (p > 0) {
            p = 0;
            healingBlock.style.opacity = 0;
            healingBlock.style.width = '0px';
            healingBlock.style.transform = 'rotate(360deg)';
            healingBlock.addEventListener("transitionend", myFunction);
            return;

        }
        $.ajax({
            type: "POST",
            url: './php/getSelectHealing.php',
            success: function(data) {
                //console.log(data);
                //fir.innerHTML = data;
                const div = document.createElement('div');
                div.innerHTML = data;
                sel.innerHTML = div.childNodes[0].innerHTML;
                sell.innerHTML = div.childNodes[2].innerHTML;

            }
        });
        healingBlock.style.opacity = 1.0;
        healingBlock.style.width = '300px';
        healingBlock.style.transform = 'rotate(-360deg)';
        p++;

        //отправка
        const send = document.querySelector('#send');
        send.onclick = () => {
            p = 0;
            healingBlock.style.opacity = 0;
            healingBlock.style.width = '0px';
            healingBlock.style.transform = 'rotate(360deg)';
            healingBlock.addEventListener("transitionend", myFunction);


            let idDoc = '';
            let idPat = '';
            for (let i = 0; i < sel.value.length; i++) {
                if (sel.value[i] != '-') idDoc += sel.value[i];
                else break;
            }
            for (let i = 0; i < sell.value.length; i++) {
                if (sell.value[i] != '-') idPat += sell.value[i];
                else break;
            }


            $.ajax({
                type: "POST",
                url: './php/insertHealing.php',
                data: {
                    idDoc: idDoc,
                    idPat: idPat
                },
                success: function(data) {
                    alert(data);
                }
            });
        }
    }


    //Создание нового доктора
    const funAddNewDoctor = function() {
        const form1 = document.createElement('div');
        form1.className = 'form';
        form1.classList.add('form-doc');
        const box = document.createElement('div');
        box.className = 'content';
        form1.append(box);
        box.insertAdjacentHTML('beforeend', '<h1>Регистрация нового Доктора</h1>');
        box.insertAdjacentHTML('beforeend', `<div class="inputs"><input type="text" placeholder="ФИО"><input type="text" placeholder="birthday in format 0000-00-00"><input type="text" placeholder="Post"><input type="text" placeholder="Street"><input type="text" placeholder="House"><input type="text" placeholder="phone number"> <input type="text" placeholder="login"><input type="text" placeholder="password"><input type="text" placeholder="department"><input id='createDoc' type="submit" value="Create"></div>`);

        //blur

        document.body.append(form1);
        wrapper.style.filter = 'blur(25px)';
        //wrapper.classList.add('off');
        $(document).mouseup(function(e) { // событие клика по веб-документу
            let div = $('.form-doc'); // тут указываем класс элемента
            if (form1.hasAttribute('hidden')) {
                return;
            }
            if (!div.is(e.target) // если клик был не по нашему блоку
                &&
                div.has(e.target).length === 0) { // и не по его дочерним элементам
                form1.remove(); // скрываем его
                wrapper.style.filter = 'none';
                wrapper.classList.remove('off');
            }

        });

        (document.querySelector('#createDoc')).onclick = function() {
            const inputs = form1.querySelector(".inputs");
            const fio = [];
            let tmp = '';
            for (let i = 0; i < inputs.children.length - 1; i++) {
                arrayOfNewData.push(inputs.children[i].value);
                console.log(arrayOfNewData[i]);
            }
            for (let i = 0; i <= arrayOfNewData[0].length; i++) {
                if (arrayOfNewData[0].length == i || arrayOfNewData[0][i] == ' ') {
                    fio.push(tmp);
                    tmp = '';
                } else {
                    tmp += arrayOfNewData[0][i];
                }
            }
            console.log(arrayOfNewData);
            $.ajax({
                type: "POST",
                url: './php/insertNewDoc.php',
                data: {
                    surname: fio[0],
                    name: fio[1],
                    patronym: fio[2],
                    birthday: arrayOfNewData[1],
                    post: arrayOfNewData[2],
                    street: arrayOfNewData[3],
                    house: arrayOfNewData[4],
                    phone: arrayOfNewData[5],
                    login: arrayOfNewData[6],
                    password: arrayOfNewData[7],
                    department: arrayOfNewData[8]
                },
                success: function(data) {
                    alert(data);
                    arrayOfNewData = [];
                    //console.log(data);
                    //dbTable.innerHTML = tab.innerHTML + data;
                }
            });
        }
    }
    const viewDbOf = function(hash) {
            console.log(hash);

            $.ajax({
                type: "POST",
                url: `./php/${hash}.php`,
                success: function(data) {
                    console.log(data);
                    if (hash == 'docs') {
                        dbTable.hidden = true;
                        dbTableDoc.removeAttribute('hidden');
                        const base = document.querySelector('.data-base');
                        dbTableDoc.className = 'db-table';
                        dbTableDoc.innerHTML = data;


                        dbTableDoc.innerHTML = data;
                        base.prepend(dbTableDoc);
                    } else if (hash == 'pats') {
                        dbTableDoc.remove();
                        dbTable.removeAttribute('hidden');
                        dbTable.innerHTML = tab.innerHTML + data;

                    }
                }
            });
        }
        //View table of pacients
    let funViewData = function(id) {

            //!AJAX
            //alert(id + 'its fucking id');
            $.ajax({
                type: "POST",
                url: './php/selectDB.php',
                data: {
                    id: id
                },
                success: function(data) {
                    console.log(data);
                    dbTable.innerHTML = tab.innerHTML + data;
                }
            });
        }
        //Create new patient
    let funAddNewPatient = function() {
        //blur
        if (formNewPatient.hasAttribute('hidden')) {
            formNewPatient.removeAttribute('hidden');
            wrapper.style.filter = 'blur(25px)';
            wrapper.classList.add('off');

        }

        $(document).mouseup(function(e) { // событие клика по веб-документу
            let div = $('.form'); // тут указываем класс элемента
            if (formNewPatient.hasAttribute('hidden')) {
                return;
            }
            if (!div.is(e.target) // если клик был не по нашему блоку
                &&
                div.has(e.target).length === 0) { // и не по его дочерним элементам
                formNewPatient.hidden = true; // скрываем его
                wrapper.style.filter = 'none';
                wrapper.classList.remove('off');

            }

        });

        (document.querySelector('#addNewPatient')).onclick = function() {
                const inputs = document.querySelector(".inputs");
                const fio = [];
                let tmp = '';
                for (let i = 0; i < inputs.children.length - 1; i++) {
                    arrayOfNewData.push(inputs.children[i].value);
                    console.log(arrayOfNewData[i]);
                }
                for (let i = 0; i <= arrayOfNewData[0].length; i++) {
                    if (arrayOfNewData[0].length == i || arrayOfNewData[0][i] == ' ') {
                        fio.push(tmp);
                        tmp = '';
                    } else {
                        tmp += arrayOfNewData[0][i];
                    }
                }
                $.ajax({
                    type: "POST",
                    url: './php/insertData.php',
                    data: {
                        surname: fio[0],
                        name: fio[1],
                        patronym: fio[2],
                        birthday: arrayOfNewData[1],
                        disease: arrayOfNewData[2],
                        room: arrayOfNewData[3],
                        street: arrayOfNewData[4],
                        house: arrayOfNewData[5],
                        phone: arrayOfNewData[6],
                        login: arrayOfNewData[7],
                        password: arrayOfNewData[8]
                    },
                    success: function(data) {
                        alert(data);
                        arrayOfNewData = [];
                        //console.log(data);
                        //dbTable.innerHTML = tab.innerHTML + data;
                    }
                });
            }
            //!AJAX

    };


    //Sign in profile 
    let funEntry = function() {
        let inp = formLog.querySelectorAll('input');

        for (let key of inp) {
            if (key.name == 'login') {
                login = key.value;
                key.value = '';
            } else if (key.name == 'password') {
                password = key.value;
                key.value = '';
            }
        }

        //!     AJAX
        $.ajax({
            type: "POST",
            url: './php/selectLogin.php',
            data: {
                //php : js
                log: login,
                pas: password
            },
            //dataType: 'json',
            success: function(returnedData) {
                // if (login == 'admin') return;

                if (returnedData == '') {
                    alert('Error, login isn`t valid')
                    return;
                }
                //alert(returnedData);
                //let out = JSON.parse(returnedData);
                let ul = document.createElement('ul');
                ul.innerHTML = returnedData;
                if (ul.firstElementChild.innerHTML.indexOf('patient') != -1) {
                    user.surname = ul.children[1].innerHTML;
                    user.name = ul.children[2].innerHTML;
                    user.patronym = ul.children[3].innerHTML;
                    user.disease = ul.children[4].innerHTML;
                    user.birthday = ul.children[5].innerHTML;
                    user.roomId = ul.children[6].innerHTML;
                    user.street = ul.children[7].innerHTML;
                    user.home = ul.children[8].innerHTML;
                    user.number = ul.children[9].innerHTML;
                    user.department = ul.children[10].innerHTML;
                    user.login = ul.children[11].innerHTML;
                    user.password = ul.children[12].innerHTML;
                    user.doc = ul.children[13].innerHTML + " " + ul.children[14].innerHTML + " " + ul.children[15].innerHTML;

                    //!удаление фото кастыль
                    cardPhoto = document.querySelector(".card-photo ");
                    cardPhoto.style.backgroundImage = "none";

                    // видимость ссылок
                    navigation.forEach(arg => {
                        let classes = arg.classList;
                        if (classes[0] != 'home')
                            arg.removeAttribute('hidden');
                    });
                    signBlock.hidden = true;
                    //mainBlock.removeAttribute("hidden");
                    personBlock.removeAttribute("hidden");
                    let personalInfoBlock = document.querySelector(".personal-info");
                    personalInfoBlock.append(personalInfoDiv);

                    let userName = document.querySelector('#username');

                    let str = [];
                    let k = 2;

                    for (let i = 0; i < user.birthday.length; i++) {
                        if (str[k] == undefined) str[k] = '';
                        if (user.birthday[i] == '-' || user.birthday[i] == ' ') {
                            k--;
                            continue;
                        }
                        str[k] += user.birthday[i];
                    }
                    str = str.join('.');
                    user.birthday = str;

                    userName.innerHTML = user.name;

                    let p = document.createElement("p");

                    p.innerHTML = "<b>ФИО:</b> " + user.surname + "  " + user.name + "  " + user.patronym + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Болезнь:</b> ${user.disease}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Дата рождения:</b> ${user.birthday}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Палата №</b> ${user.roomId}` + " " + user.department + " отделение <br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Номер телефона:</b> ${user.number}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Адрес проживания:</b> улица ${user.street} дом ${user.home}` + "<br>";
                    personalInfoDiv.append(p);

                    p = document.createElement("p");
                    p.innerHTML = `<b>Лечащий врач:</b> ${user.doc}` + "<br>";
                    personalInfoDiv.append(p);



                } else if (ul.firstElementChild.innerHTML.indexOf('doctor') != -1) {
                    btnViewDb.removeAttribute('hidden');
                    butAddNewDoctor.hidden = true;
                    btnAddNewPatient.hidden = true;
                    user.surname = ul.children[1].innerHTML;
                    user.name = ul.children[2].innerHTML;
                    user.patronym = ul.children[3].innerHTML;
                    user.post = ul.children[4].innerHTML;
                    user.birthday = ul.children[5].innerHTML;
                    user.department = ul.children[6].innerHTML;
                    user.phone = ul.children[7].innerHTML;
                    user.login = ul.children[8].innerHTML;
                    user.password = ul.children[9].innerHTML;
                    user.id = ul.children[10].innerHTML;
                    user.street = ul.children[11].innerHTML;
                    user.house = ul.children[12].innerHTML;
                    user.departmentChiefFK = ul.children[13].innerHTML;
                    user.laboratoryChiefFK = ul.children[14].innerHTML;
                    user.departmentIdFK = ul.children[15].innerHTML;
                    user.image = ul.children[16].innerHTML;

                    let str = [];
                    let k = 2;

                    for (let i = 0; i < user.birthday.length; i++) {
                        if (str[k] == undefined) str[k] = '';
                        if (user.birthday[i] == '-' || user.birthday[i] == ' ') {
                            k--;
                            continue;
                        }
                        str[k] += user.birthday[i];
                    }
                    str = str.join('.');
                    user.birthday = str;

                    funViewData(user.id);

                    cardPhoto = document.querySelector(".card-photo ");
                    cardPhoto.style.backgroundImage = "url('img/profileImg/" + user.image + ".jpg')"

                    //видимость
                    navigation.forEach(arg => {
                        arg.removeAttribute('hidden');
                    });
                    signBlock.hidden = true;
                    mainBlock.removeAttribute("hidden");
                    let personalInfoBlock = document.querySelector(".personal-info");
                    personalInfoBlock.append(personalInfoDiv);

                    let userName = document.querySelector('#username');
                    userName.innerHTML = user.name + "  " + user.surname;
                    let p = document.createElement("p");
                    p.innerHTML = "<b>ФИО:</b> " + user.surname + "  " + user.name + "  " + user.patronym + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Должность:</b> ${user.post}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Дата рождения:</b> ${user.birthday}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Отделение:</b> ${user.department}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Номер телефона:</b> ${user.phone}` + "<br>";
                    personalInfoDiv.append(p);
                    p = document.createElement("p");
                    p.innerHTML = `<b>Адрес проживания:</b> улица ${user.street} дом ${user.house}` + "<br>";
                    personalInfoDiv.append(p);

                    if (user.id == user.departmentChiefFK) {
                        p = document.createElement("p");
                        p.innerHTML = `<b>Заведующий отделением</b> <br>`;
                        personalInfoDiv.append(p);

                        //personalInfoDiv.append(document.createElement('p').innerHTML = `Заведующий отделением`);
                    }
                    if (user.id == user.laboratoryChiefFK) {
                        p = document.createElement("p");
                        //personalInfoDiv.append(document.createElement("br"));
                        p.innerHTML = `<b>Заведующий лабораторией</b> <br>`;
                        personalInfoDiv.append(p);


                    }
                    console.log(user);

                } else {
                    if (login != 'admin' && password != 'admin') {
                        return;
                    }
                    // видимость ссылок
                    navigation.forEach(arg => {
                        let classes = arg.classList;
                        if (classes[0] == 'sign-out')
                            arg.removeAttribute('hidden');
                    });
                    btnAddNewPatient.removeAttribute('hidden');
                    butAddNewDoctor.removeAttribute('hidden');
                    btnViewDb.hidden = true;
                    signBlock.hidden = true;
                    mainBlock.removeAttribute("hidden");

                    butDoctors.removeAttribute('hidden');
                    butPatients.removeAttribute('hidden');
                    butHealing.removeAttribute('hidden');


                    butPatients.onclick = () => viewDbOf('pats');
                    butDoctors.onclick = () => viewDbOf('docs');





                }
            }
        });
        //!    AJAX

    }




    //buttons events
    //
    //
    //
    butHealing.onclick = () => {
        healingBlock.removeAttribute('hidden');
        heal();

    }

    //sign in
    btnForm.onclick = () => {
        funEntry();

    }
    document.querySelector('#pas').addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            funEntry();
        }
    });
    //login out
    btnExit.onclick = function() {
            personalInfoDiv.innerHTML = "";

            console.log(btnExit);
            dbTable.innerHTML = tab.innerHTML;

            navigation.forEach(arg => {
                if (arg != 'button')
                    arg.hidden = true;

            });
            signBlock.removeAttribute('hidden');
            mainBlock.hidden = true;
            personBlock.hidden = true;
            butDoctors.hidden = true;
            butPatients.hidden = true;
            butHealing.hidden = true;

            user = {};
            login = '';
            password = '';
        }
        //nav
    navigation[0].onclick = () => {

        personBlock.hidden = true;
        mainBlock.removeAttribute("hidden");
    }
    navigation[1].onclick = () => {

            personBlock.removeAttribute("hidden");
            mainBlock.hidden = true;
        }
        //view DATA BASE
    btnViewDb.onclick = () => {
            funViewData(user.id);
        }
        //add Patient
    btnAddNewPatient.onclick = () => {
        funAddNewPatient();
    }
    butAddNewDoctor.onclick = () => {
        funAddNewDoctor();
    }
    let table = document.querySelector(".db-table");




    dbTableDoc.onclick = (e) => {
        //TODO: ////////////////////////////////////////////////////////////////////////////////////////////////

        let id = e.target.parentNode.children[0].innerHTML;
        if (e.target.tagName == 'TD') {
            console.log(id);
            $.ajax({
                type: "POST",
                url: './php/selectDoctorInfo.php',
                data: {
                    id: id
                },
                success: function(data) {
                    console.log(data);
                    let ul = document.createElement('ul');
                    ul.innerHTML = data;
                    const blockEditPersonalData = document.createElement('div');
                    blockEditPersonalData.classList.add('form');
                    const div = document.createElement('div');
                    div.classList.add('flex-column');
                    blockEditPersonalData.append(div);
                    const fio = document.createElement('h2');
                    fio.innerHTML = ul.children[0].innerHTML;
                    div.append(fio);
                    const arrOfNamesInputs = ['Фамилия', 'Должность', 'Дата рождения', 'Отделение', 'Улица', 'Дом', 'Номер'];
                    for (let i = 1; i < ul.children.length; i++) {
                        const label = document.createElement('label');
                        label.style.display = 'flex';
                        label.style.flexDirection = 'column';
                        label.textContent = arrOfNamesInputs[i];
                        let p = document.createElement('input');
                        label.append(p);
                        p.defaultValue = ul.children[i].innerHTML;
                        div.append(label);
                    }
                    const input = document.createElement('input');
                    input.setAttribute("type", "submit");
                    input.defaultValue = 'Edit';
                    div.append(input);
                    let wrapper = document.querySelector('.wrapper');

                    wrapper.style.filter = 'blur(25px)';
                    wrapper.classList.add('off');
                    document.body.prepend(blockEditPersonalData);

                    $(document).mouseup(function(e) { // событие клика по веб-документу
                        let div = $('.form'); // тут указываем класс элемента
                        if (blockEditPersonalData.hasAttribute('hidden')) {
                            return;
                        }
                        if (!div.is(e.target) // если клик был не по нашему блоку
                            &&
                            div.has(e.target).length === 0) { // и не по его дочерним элементам
                            blockEditPersonalData.remove(); // скрываем его
                            wrapper.style.filter = 'none';
                            wrapper.classList.remove('off');

                        }
                    });
                    input.onclick = function() {

                            console.log(div.children[1].lastChild.value);
                            console.log(div.children[2].lastChild.value);
                            console.log(div.children[3].lastChild.value);
                            console.log(div.children[4].lastChild.value);
                            console.log(div.children[5].lastChild.value);
                            console.log(div.children[6].lastChild.value);
                            $.ajax({
                                type: "POST",
                                url: './php/editDoc.php',
                                data: {
                                    //php : js
                                    id: id,
                                    post: div.children[1].lastChild.value,
                                    bir: div.children[2].lastChild.value,
                                    dep: div.children[3].lastChild.value,
                                    street: div.children[4].lastChild.value,
                                    house: div.children[5].lastChild.value,
                                    number: div.children[6].lastChild.value
                                        //dep: ul.children[10].innerHTML
                                },
                                //dataType: 'json',
                                success: function(data) {
                                    alert(data);
                                }
                            });
                        }
                        //dbTable.innerHTML = tab.innerHTML + data;
                }
            });
        }


    }


    table.onclick = (e) => {
        let id = e.target.parentNode.children[0].innerHTML;
        if (e.target.tagName == 'TD') {
            console.log(id);
            $.ajax({
                type: "POST",
                url: './php/selectUserInfo.php',
                data: {
                    id: id
                },
                success: function(data) {
                    console.log(data);
                    let ul = document.createElement('ul');
                    ul.innerHTML = data;
                    const blockEditPersonalData = document.createElement('div');
                    blockEditPersonalData.classList.add('form');
                    const div = document.createElement('div');
                    div.classList.add('flex-column');
                    blockEditPersonalData.append(div);
                    const fio = document.createElement('h2');
                    fio.innerHTML = ul.children[1].innerHTML + ul.children[2].innerHTML + ul.children[3].innerHTML;
                    div.append(fio);
                    const arrOfNamesInputs = [1, 'Фамилия', 'Имя', 'Отчество', 'Синдром', 'Дата рождения', 'Палата', 'Улица', 'Дом', 'Номер', 'Отделение'];
                    for (let i = 4; i < ul.children.length - 1; i++) {
                        const label = document.createElement('label');
                        label.style.display = 'flex';
                        label.style.flexDirection = 'column';
                        label.textContent = arrOfNamesInputs[i];
                        let p = document.createElement('input');
                        label.append(p);
                        p.defaultValue = ul.children[i].innerHTML;
                        div.append(label);
                    }
                    const input = document.createElement('input');
                    input.setAttribute("type", "submit");
                    input.defaultValue = 'Edit';
                    div.append(input);
                    let wrapper = document.querySelector('.wrapper');

                    wrapper.style.filter = 'blur(25px)';
                    wrapper.classList.add('off');
                    document.body.prepend(blockEditPersonalData);

                    $(document).mouseup(function(e) { // событие клика по веб-документу
                        let div = $('.form'); // тут указываем класс элемента
                        if (blockEditPersonalData.hasAttribute('hidden')) {
                            return;
                        }
                        if (!div.is(e.target) // если клик был не по нашему блоку
                            &&
                            div.has(e.target).length === 0) { // и не по его дочерним элементам
                            blockEditPersonalData.remove(); // скрываем его
                            wrapper.style.filter = 'none';
                            wrapper.classList.remove('off');

                        }
                    });
                    input.onclick = function() {

                        console.log(div.children[1].lastChild.value);
                        console.log(div.children[2].lastChild.value);
                        console.log(div.children[3].lastChild.value);
                        console.log(div.children[4].lastChild.value);
                        console.log(div.children[5].lastChild.value);
                        console.log(div.children[6].lastChild.value);
                        $.ajax({
                            type: "POST",
                            url: './php/editPatient.php',
                            data: {
                                //php : js
                                id: id,
                                dis: div.children[1].lastChild.value,
                                bir: div.children[2].lastChild.value,
                                room: div.children[3].lastChild.value,
                                street: div.children[4].lastChild.value,
                                house: div.children[5].lastChild.value,
                                number: div.children[6].lastChild.value
                            },
                            success: function(data) {
                                alert(data);
                            }
                        });
                    }
                }
            });
        }

    }

}