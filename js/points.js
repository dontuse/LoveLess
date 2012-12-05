(function () {

    var map,
        myCollection;

// когда яндекс карта соизволила реади
    ymaps.ready(function () {
        map = new ymaps.Map('map', {
            center:[56.326944, 44.0075],
            zoom:10,
            type:'yandex#map',
            behaviors:['default', 'scrollZoom']
        });

        //Добавляем элементы управления
        map.controls
            .add('zoomControl');
        //  .add('typeSelector')
        //  .add('mapTools');

        myCollection = new ymaps.GeoObjectCollection();

        var xxxLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="b-map-baloon">' +

                ' <div class="b-map-baloon__content">' +
                ' <p class="b-map-baloon__name">$[properties.pointName]</p>' +
                ' <p class="b-map-baloon__address">$[properties.pointAddress]</p>' +
                ' <p class="b-map-baloon__phones">$[properties.pointPhones]</p>' +
                ' $[properties.pointWd]' +
                '  </div>' +
                '  <div class="b-map-baloon__bot-decor"></div>' +
                ' <span class="b-map-baloon__close"></span>' +
                ' </div>',
            {
                build:function () {
                    xxxLayout.superclass.build.call(this);
                    //console.log(this);
                    $('.b-map-baloon__close').on('click', $.proxy(this.onCloseClick, this));
                },
                clear:function () {
                    $('.b-map-baloon__close').off('click');
                    this.constructor.superclass.build.call(this);
                },
                onCloseClick:function () {
                    this.getData().geoObject.balloon.close();
                }
            });

        do_search(glb.points);


        function do_search(json) {

            for (i = 0; i < json.length; i++) {

                var wd = '<table class="b-map-baloon__wd">';

                $.each(json[i].wd, function (kay, value) {
                    $.each(value, function (days, time) {
                        //console.log(kay,value);
                        wd += '<tr>' +
                            '<td class="b-map-baloon__wd-days">' + days + '</td>' +
                            '<td class="b-map-baloon__wd-time">' + time + '</td>' +
                            '</tr>';
                    });
                });

                wd += '</table>';

                var placemark = new ymaps.Placemark([json[i].lon, json[i].lat], {
                    pointName:json[i].name,
                    pointAddress:json[i].address,
                    pointPhones:json[i].phones,
                    pointId:json[i].id,
                    pointWd:wd
                }, {
                    // Опции
                    balloonLayout:xxxLayout,
                    iconImageHref:'imgs/ya-maps/point.png', // картинка иконки
                    iconImageSize:[38, 52], // размеры картинки
                    balloonShadow:false ,
                    balloonMaxWidth: 245,
                    balloonMinWidth: 245,
                    balloonOffset : [ -10 , -50]
                    // iconImageOffset: [-3, -42] // смещение картинки
                });

                // добавляем метки в коллекцию
                myCollection.add(placemark);
            }

            map.geoObjects.add(myCollection);
// Set center and zoom using collection bounds.
            map.setBounds(myCollection.getBounds(), {checkZoomRange:true});

        }


        $(function () {
            $('.b-places tr').on("hover", function (e) {


                var id = $(this).find('.b-places__link').data("id");

                selectPoint(id);


            });

            $('.b-places__link').click(function () {
                return false;
            });


            function selectPoint(id) {
                myCollection.each(function (item) {

                    id = parseInt(id, 10);
                    var idProp = parseInt(item.properties.get('pointId'), 10);

                    // console.log(idProp);
                    //  console.log(id);


                    if (idProp === id) {
                        item.options.set('iconImageHref', 'imgs/ya-maps/point.png');
                    }
                    else {
                        item.options.set('iconImageHref', 'imgs/ya-maps/point-no.png');
                    }

                    //map.setBounds(myCollection.getBounds());

                });

                return false;
            }
        });


    });

})();

