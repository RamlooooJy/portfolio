let dayTo;
let dayFrom;

function dayFromCallback(day) {
    getResult();
    dayFrom = day._d;
    $('#main__time-from-input').val(dayFrom.toLocaleDateString());
    options.minDate = dayFrom;
    $('#main__time-to').daterangepicker(options, dayToCallback);

    if (dayFrom && dayTo) {
        $('#rgsTime').val(Math.ceil((dayTo - dayFrom) / (60 * 60 * 24 * 1000)) + 1);

        if (dayFrom >= dayTo) {
            $('#main__time-to-input').val(day._d.toLocaleDateString());
            $('#rgsTime').val('1');
            dayTo = day._d;
        }
    }
    options.minDate = day._d;

}

function dayToCallback(day) {
    getResult();
    dayTo = day._d;
    $('#main__time-to-input').val(dayTo.toLocaleDateString());
    $('#main__time-to-input + span').addClass('alp-date-active');

    if (dayTo && dayFrom) {
        $('#rgsTime').val(Math.ceil((dayTo - dayFrom) / (60 * 60 * 24 * 1000)) + 1);
    } else if (!dayFrom) {
        $('#rgsTime').val(Math.ceil((dayTo - options.minDate) / (60 * 60 * 24 * 1000)) + 1);
    }
}

const options = {
    "autoApply": true,
    "singleDatePicker": true,
    'autoUpdateInput': true,
    "startDate": (new Date()).toLocaleDateString(),
    "endDate": (new Date()).toLocaleDateString(),
    'minDate': new Date(),
    "locale": {
        "format": "DD.MM.YYYY",
        "separator": " - ",
        "daysOfWeek": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        "firstDay": 1
    }
};

function setDaysValue() {
    let days = $('#rgsTime').val();
    if (days > 0) {
        $('#main__time-to-input').val((new Date(+options.minDate + (days - 1) * 1000 * 60 * 60 * 24)).toLocaleDateString());
    }
    getResult();
}


$('#main__time-from').daterangepicker(options, dayFromCallback);
$('#main__time-to').daterangepicker(options, dayToCallback);
$('#alp-btn-request').addClass('disabled');
$('#main__time-from-input + span').addClass('alp-date-active');


$('#main__time-from-input').val(new Date().toLocaleDateString());
dayFrom = options.minDate;

function getResult() {
    let fz = $('#alp-fz').val();
    let product = $('#alp-product').val();
    let sum = +$('#alp-sum').val().replace(/[\s₽]/g, '');
    let rgsTime = +$('#rgsTime').val();
    let date1 = $('#main__time-from-input').val();
    let date2 = $('#main__time-to-input').val();
    let advance = document.querySelector('#alp-advance');
    if (!fz || !product || !sum || !rgsTime || !date1 || !date2) {
        $('#alp-btn-request').addClass('disabled');
        return;
    }
    $('#alp-btn-request').removeClass('disabled');
    let data = {
        fz: fz,
        summ: sum,
        duration: rgsTime,
        product: product,
        date_start: date1,
        date_end: date2,
        advance: advance.checked
    };
    console.log(data);
    try {
        var url = (!!apiUrl) ? apiUrl : 'https://box.srvtests.com/tariff_calculator/api/calculate/';
        $.post(url, data, function(data) {
            if (data.cost == null) {
                $('#alp-finalSum').html(0 + ' ₽');
                document.querySelector('.alp-calc__container-item__button button').classList.add('disable');
            } else {
                $('#alp-finalSum').html(data.cost.split(',')[0] + ' ₽');
                document.querySelector('.alp-calc__container-item__button button').classList.remove('disable');
            }

        });
    } catch (e) {
        console.log(e);
    }

}

function openCalcRequest(f) {
    event.preventDefault();
    const data = {};
    let selects = $('select');
    selects.each((i, sel) => {
        let options = sel.querySelectorAll(`option`);
        data[sel.name] = [].find.call(options, (opt => opt.value === sel.value)).innerText;
    });
    data['sum'] = f.sum.value;
    data['time'] = f.time.value;
    data['date1'] = f.date1.value;
    data['date2'] = f.date2.value;
    data['advance'] = f.advance.value;
    data['sum'] = f.querySelector('#alp-finalSum').innerHTML;


    $('#calc-request-modal').arcticmodal({
        beforeOpen: ()=>{
            $('#calc-data').val(Object.keys(data).map(key=>`${key}: ${data[key]}`).join(' '));
            console.log($('#calc-data').val());
        }
    });
}


/**
 * RANGE SLIDER INPUT
 * */
const maxSum = 1000000000;

const sum = $('#alp-calc-sum').ionRangeSlider({
    skin: "round",
    min: 0,
    max: maxSum,
    from: 10000,
    step: 10000,
    grid: true,
    grid_num: 2,
    hide_min_max: true,
    onChange: (e) => {
        $('#alp-sum').val(e.from);
        getResult();

    }
}).data("ionRangeSlider");


const maxDays = 90;


const days = $('#alp-calc-date').ionRangeSlider({
    skin: "round",
    min: 0,
    max: maxDays,
    from: 1,
    to: 500,
    grid: true,
    grid_num: 2,
    hide_min_max: true,
    onChange: (e) => {
        $('#rgsTime').val(e.from);
        setDaysValue();
    }
}).data("ionRangeSlider");

$('#alp-sum').inputmask('9 999 999 999 ₽', {
    numericInput: true,
    jitMasking: true
});
$('#alp-sum').on('input', function() {
    let val = +this.value.replace(/\s/g, '').replace('₽', '');
    if (val > maxSum) {
        this.value = maxSum;
        val = maxSum;
    }
    sum.update({
        from: val
    });
    getResult();
});
$('#rgsTime').on('input', function() {
    let val = +this.value;
    if (val > maxDays) {
        this.value = maxDays;
        val = maxDays;
    }
    days.update({
        from: val
    });
    setDaysValue();
});

$('.alp-select').stylishSelect();