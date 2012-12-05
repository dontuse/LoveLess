var glb = {};
glb.calcCommisionUrl = "ajax/cy.json";
glb.pointsUrl = "ajax/points.json";


$(function () {

    // все задизайбленные кнопки ничего не должны делать
    (function () {
        $('body').on('click', '.b-button_state_disabled', function () {
            return false;
        });
    })();

    //=============================================================


    // // в
    (function () {
        $('.js-search-points').on('click', function (e) {
            e.preventDefault();
            $('.js-city-select:hidden').remove();
            $(this).parents('form').submit();
        });
    })();

    //=============================================================

    // кастомные селекты
    $(".chzn-select").chosen({no_results_text:"Не найдено:"});


    // табы на главной
    (function () {
        $('.js-tab-a').each(function (i) {

            $(this).on("click", function (e) {
                e.preventDefault();
                if ($(this).hasClass('b-header__tab-link_state_active')) {
                    return false;
                }
                $('.js-tab').hide();
                $('.js-tab').eq(i).fadeIn(600);
                $('.js-tab-a').removeClass('b-header__tab-link_state_active');
                $(this).addClass('b-header__tab-link_state_active');

            });
        });
    })();

    //===============================================================

    // расчет коммисси
    (function () {

        var $cyElems = $('.b-currency-selection__cy'),
            $block = $('.js-calc'),
            $resultBox = $('.b-calc-result', $block),
            $img = $('.b-making__img', $block),
            cyActiveClass = 'b-currency-selection__cy_state_selected',
            $cyInput = $('.js-cy-input', $block),
            cyCurrent = "руб",
            $errorLabel = $('.b-label_state_error', $block),
            $normLabel = $('.js-norm-label', $block),
            $button = $('.js-calcCommission', $block),
            numPattern = new RegExp(/^[0-9.\s]+$/);


        // расчет коммисии
        function calcCommission(cy) {
            var val = $cyInput.val();
            var cy = $('.b-currency-selection__cy_state_selected').data('cy');
            $.ajax({
                url:glb.calcCommisionUrl,
                data:{ cyd:cy, val:val }

            }).done(function (data) {
                    $img.hide();
                    $resultBox.fadeIn(200);
                    $('.js-cy-val').html(data.val);
                    $('.js-cy').html(data.cy);
                });
        }

        // валидация ввода
        function validateCy(val) {
            return(numPattern.test(val));
        }


        // биндим эвенты
        $cyElems.on("click", function (e) {
            e.preventDefault();
            $cyElems.removeClass(cyActiveClass);
            $(this).addClass(cyActiveClass);
        });

        $cyInput.on("keyup", function (e) {

            var val = $cyInput.val();
            if (validateCy(val)) {
                $(this).removeClass('b-input_state_error');
                $errorLabel.hide();
                $normLabel.show();
                $button.removeClass('b-button_state_disabled');
            }
            else {
                $(this).addClass('b-input_state_error');
                $errorLabel.show();
                $normLabel.hide();
                $button.addClass('b-button_state_disabled');
            }
        });

        //  жмякнули кнопку
        $button.on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('b-button_state_disabled')) {
                return false;
            } else {
                if($cyInput.val()) {
                    calcCommission(cyCurrent);
                }
                else {
                    $cyInput.addClass('b-input_state_error');
                    $errorLabel.show();
                    $normLabel.hide();
                    $button.addClass('b-button_state_disabled');
                }

            }

        });

    })();

    // =============================================================================

    (function () {
        $('#q').on("change", function () {
            var val = $(this).val();
            console.log("changes", $(this));
            $('.js-city-select').hide();
            $('#s' + val).show();
        });
    })();


    (function () {
        $block = $('.js-calc-in-aside');
        $elems = $(".b-nav-elem__i, .b-nav-elem__txt", $block);

        $('.b-nav-elem', $block).on("click", function (e) {
            e.preventDefault();
            if ($(this).hasClass('b-nav-elem__calc_state_activated')) {
                return false;
            }
            else {
                $('.js-calc', $block).fadeToggle(200);
                $(this).addClass('b-nav-elem__calc_state_activated');
                $(this).find(".b-nav-elem__txt a").replaceWith($(this).text());
            }

        });
    })();


});