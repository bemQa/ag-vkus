$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.lang-select').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.lang-dropdown').fadeToggle();
        $('body').on('click', function (e) {
            var div = $('.lang-select, .lang-dropdown');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.lang-select').removeClass('active');
                $('.lang-dropdown').fadeOut();
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    $('.table-wrapper').scrollbar();
    $('.faq-wrap').scrollbar();
    if(window.innerWidth < 1000) {
        $('.products-list').scrollbar();
    }
    $('.choc-history').scrollbar();

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"999-999-999-999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        var parent = $('select').parents('.select');
        $('select').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.tab-trigger').click(function(){
        $('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
        if($('.tabs').length && window.innerWidth > 1000) {
            $('.lk-items').slick('unslick');
            $('.lk-items').slick({
                dots: false,
                arrows: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1281,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    });

    if($('.tabs').length && window.innerWidth > 1000) {
        $('.lk-items').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    } else {
        $('.lk-items').not('.lk-items-loyalty').scrollbar();
    }

    function formatDate(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yyyy = date.getFullYear();
        if (yyyy < 10) yyyy = '0' + yyyy;

        return dd + '.' + mm + '.' + yyyy;
    }

    if($('.datepicker-here').length) {
        $('.datepicker-here').datepicker({
            minDate: new Date(2020, 1, 1)
        });
        $('.datepicker-here').val(formatDate(new Date()));
    }

    if($('.prizes')) {
        $('.prizes').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if(window.innerWidth > 1000) {
        $('.people').click(function() {
            $('.people').removeClass('active');
            $(this).toggleClass('active');
            if($('.people-list').hasClass('choose') && !$('.people').hasClass('active')) {
                $(this).parent('.people-list').removeClass('choose');
            } else {
                $(this).parent('.people-list').addClass('choose');
            }
        });
    }

    if($('.tm-slider-block')) {
        $('.tm-slider-block').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 10000
        });
    }

    if ($('.people-list.mobile-visible').length && window.innerWidth < 1000) {

        function swipperInit() {
            var wrap = $('.people-list.mobile-visible');

            var swiper = new Swiper(wrap, {
                slidesPerView: 2,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },

                effect: 'coverflow',
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 50,
                    depth: 400,
                    modifier: 1,
                    slideShadows: false
                },

                loop: true,
                speed: 400,
                observer: true,
                observeParents: true
            });
            swiper.init();
        }

        swipperInit();

    }

    $('.voting .voting-btn').click(function(e) {
        e.preventDefault();
        if($('.voting').valid()){
            OpenPopup('voting2');
        }
    });

    $('.ch').click(function(e) {
        e.preventDefault();
        $('.ch').removeClass('active');
        $(this).addClass('active');
        if($('.voting-btn.disabled')){
            $('.voting-btn.disabled').removeClass('disabled');
        }
    });

    $('.choosing .voting-btn').click(function(e) {
        e.preventDefault();
        if($('.ch').hasClass('active')){
            // setTimeout(function(){
            //     OpenPopup('voting-prize');
            // },2000);
            OpenPopup('voting-prize');
        }
    });

    $(window).on('scroll',function() {
        var doc = window.pageYOffset;
        if(doc > 300) {
            $(".up").fadeIn();
        } else {
            $(".up").fadeOut();
        }
    });

    $(".up").on("click", function() {
        var body = $("body, html");
        body.stop()
        .animate({
            scrollTop:0
        }, 500, 'swing');
    });

    if($('.main-block').length && window.innerWidth > 1000) {
        $(window).on('scroll load', function () {
            var top = $(window).scrollTop();
            if(top >= 50) {
                $('header').addClass('inner-header fixed');
            } else {
                $('header').removeClass('inner-header fixed');
            }
        });
    }

    if($('.main-block').length && window.innerWidth < 1000) {
        $(window).on('scroll load', function () {
            var top = $(window).scrollTop();
            if(top >= 50) {
                $('header').addClass('inner-header');
            } else {
                $('header').removeClass('inner-header');
            }
        });
    }

    $('.loyalty-what').click(function(e) {
        e.preventDefault();
        $(this).next('.loyalty-tooltip').fadeIn();
    });
    $('.loyalty-tooltip').click(function(e) {
        $(this).fadeOut();
    });
});