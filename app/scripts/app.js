$(document).ready(function() {
    $('a[href="#"]').click(function(e){
        e.preventDefault();
    });

    $('.m_header .logo a').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $(window).scroll(function(){
          if ($(this).scrollTop() > 80) {
              $('.m_header').addClass('fixed');
          } else {
              $('.m_header').removeClass('fixed');
          }
    });

    // Forms
    // Маска для телефона
    $("[type='tel']").mask("+7(999) 999-99-99");
    //

    // Обработка форма на AJAX
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    },
                          "Введите полный номер.");
    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    },
                          "Это поле необходимо заполнить.");

    $(".form").each(function(){
        $(this).validate({
            rules: {
                name: {
                    required: true,
                },
                tel: {
                    requiredphone: true,
                    minlenghtphone: true

                }
            },
            submitHandler: function(form, event){
                event = event || window.event;
                $(form).ajaxSubmit({
                    //dataType: 'script',
                    error: function(){
                        // alert("Ошибка!");
                        var n = noty({
                            text: 'Ваша заявка отправлена!',
                            type: 'success',
                            theme: 'relax',
                            timeout: 3000,
                            closeWith: ['hover'],
                            animation: {
                              open: 'animated bounceInLeft', // Animate.css class names
                              close: 'animated bounceOutLeft', // Animate.css class names
                              easing: 'swing', // unavailable - no need
                              speed: 500 // unavailable - no need
                            }
                        });
                    },
                    success: function(responseText, statusText, xhr){
                        $('.form-input').val('');
                        var n = noty({
                            text: 'Ваша заявка отправлена!',
                            type: 'success',
                            theme: 'relax',
                            timeout: 3000,
                            closeWith: ['hover'],
                            animation: {
                              open: 'animated bounceInLeft', // Animate.css class names
                              close: 'animated bounceOutLeft', // Animate.css class names
                              easing: 'swing', // unavailable - no need
                              speed: 500 // unavailable - no need
                            }
                        });
                }
            });
                return false;
        }
        });
    });
    // end Forms

    $('video,audio').mediaelementplayer({
        alwaysShowControls: false,
        features: ['playpause']
    });

    var $tabsNavLink = $('.tabs-nav a');
    $('.tabs-item').hide();
    $('.tabs-content').find('.tabs-item').eq(1).show();
    $('.tabs-nav').find('li').eq(1).find('a').addClass('current');

    $tabsNavLink.click(function(e) {
      e.preventDefault();
      $tabsNavLink.removeClass('current');
      $(this).addClass('current');
      $(this.hash).show().siblings().hide();
    });

    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade modal-video',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});
