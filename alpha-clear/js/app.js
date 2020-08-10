/*********
 * preloader
 * *****/
$(document).ready(() => $('body').removeClass('preload'));


/*********
 * header on scroll
 * *****/
const header = document.querySelector('header');
const burger = $('.alp-burger');
document.addEventListener("scroll", checkScrollHeaderFix);

function checkScrollHeaderFix() {
    if (document.documentElement.scrollTop > 80) {
        header.classList.add('alp-fix');
    } else {
        header.classList.remove('alp-fix');
    }
}

checkScrollHeaderFix();


/*********
 * burger
 * *****/
burger.on('click', () => $('body').toggleClass('alp-menu_active'));


/*********
 * FAQ
 * *****/
$('.alp-faq__container-item.alp-active').css('height', function() {
    return this.scrollHeight;
});
document.querySelectorAll('.alp-faq__container-item__container')
    .forEach(item => item.onclick = function() {
        let faq = this.parentNode;
        let classname = 'alp-active';
        if (faq.classList.contains(classname)) {
            faq.classList.remove(classname);
            faq.style.height = '';
        } else {
            faq.classList.add(classname);
            faq.style.height = faq.scrollHeight + 'px';
        }
    });

/*********
 * phone masks
 * *****/
$('input[type="tel"]').inputmask('+7 999 999-99-99');



/*********
 * forms
 * *****/
function openRequestModal(f) {
    let title = f.querySelector('h1')
        || f.querySelector('h4');
    title = title.innerHTML;
    let products = f.querySelector('p').innerHTML;
    $('#request-modal #title').val(title);
    $('#request-modal #selectedProduct').val(products);
    $('#request-modal').arcticmodal();
}

function openHelpModal() {
    $('#help-request-modal').arcticmodal();
}

function sendRequest(f) {
    const data = {};
    const inputs = f.querySelectorAll('input');
    inputs.forEach(inp => {
        if (inp.type === 'checkbox') {
            data[inp.name] = 'Согласен';
        } else if (inp.type === 'radio') {
            if (inp.checked) {
                data[inp.name] = inp.value;
            }
        } else {
            data[inp.name] = inp.value;
            if (!inp.classList.contains('alp-date')) inp.value = '';
        }
    });
    Object.keys(data).forEach(key => console.log(`${key}: ${data[key]}`));
    goodRequest();
}

function goodRequest() {
    $.arcticmodal('close');
    $('#good-request').arcticmodal({
        afterOpen: () => setTimeout(() => $('#good-request').arcticmodal('close'), 2000)
    });
}


/**
 * SLICK
 * */
const banner = $('.js-banner-slick');
const bannerNav = $('.js-banner-nav-slick .alp-banner-nav__item');
const banners = $('.alp-banner');
if (banner[0]) {
    banner.slick({
        fade: true,
        cssEase: 'linear',
        arrows: false,
        dots: false,
    });
    $('.js-banner-nav-slick').slick({
        infinite: false,
        variableWidth: true,
        dots: false,
        arrows: false,
        focusOnSelect: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    variableWidth: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    variableWidth: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}

banner.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
    let menu = header.querySelector('.alp-header');
    if (banners[nextSlide].classList.contains('js_is_light')) {
        menu.classList.add('alp-header_light');
        burger.addClass('alp-burger_black');
    } else {
        menu.classList.remove('alp-header_light');
        burger.removeClass('alp-burger_black');
    }
    bannerNav[currentSlide].classList.remove('js-slick-active');
    bannerNav[nextSlide].classList.add('js-slick-active');
});
bannerNav.on('click', changeNav);

function changeNav(targ) {
    let prev = document.querySelector('.js-slick-active');
    if (prev !== targ.currentTarget) {
        prev.classList.remove('js-slick-active');
        this.classList.add('js-slick-active');
        Array.from(bannerNav).forEach((nav, i) => {
            if (nav == targ.currentTarget) banner.slick('slickGoTo', i);
        });
    }
}


if ($('.js-products-slick')[0]) {
    $('.js-products-slick').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        variableWidth: true,
        prevArrow: '<button class="alp-slick-prev"></button>',
        nextArrow: '<button class="alp-slick-next"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true,
                    appendArrows: $('.alp-products .js-arrows-slick__container')
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }).on('beforeChange', hideArrow);
    hideArrow(0, 0, 0, 0);
}
if ($('.js-guarantees-slick')[0]) {
    $('.js-guarantees-slick').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}
if ($('.js-orders-slick')[0]) {
    $('.js-orders-slick').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}
if ($('.js-tariffs-slick')[0]) {
    $('.js-tariffs-slick').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        variableWidth: true,
        prevArrow: '<button class="alp-slick-prev"></button>',
        nextArrow: '<button class="alp-slick-next"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                    appendArrows: $('.alp-tariffs .js-arrows-slick__container')
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }).on('beforeChange', hideArrow);
    hideArrow(0, 0, 0, 0)
}

function hideArrow(e, slick, current, next) {
    let lengtnOfSlides = $('.alp-products__container-item').length;
    let arrows = $('.alp-products .js-arrows-slick__container button');
    if (!arrows[0]) {
        lengtnOfSlides = $('.alp-tariffs__container-item').length;
        arrows = $('.alp-tariffs .js-arrows-slick__container button');
    }
    if (!arrows[0]) return;
    if (lengtnOfSlides === 2) {
        arrows[1].classList.add('alp-arrow_hide');
        arrows[0].classList.add('alp-arrow_hide');
        return;
    }
    if (next + 2 === lengtnOfSlides || next + 1 === lengtnOfSlides) {
        arrows[1].classList.add('alp-arrow_hide');
        arrows[0].classList.remove('alp-arrow_hide');
        return;
    }
    if (next === 0) {
        arrows[0].classList.add('alp-arrow_hide');
        arrows[1].classList.remove('alp-arrow_hide');
        return;
    }
    arrows[0].classList.remove('alp-arrow_hide');
    arrows[1].classList.remove('alp-arrow_hide');

}


//
let inputs = $('.alp-input input').on('input', function() {
    if (this.classList.contains('alp-date')) return;
    this.classList.add('alp-input_fill');
}).on('focus', function() {
    if (this.classList.contains('alp-date')) return;
    this.classList.add('alp-input_fill');
}).on('focusout', function() {
    !this.value ? this.classList.remove('alp-input_fill') : '';
}).each(function() {
    if (this.value) this.classList.add('alp-input_fill');
});




