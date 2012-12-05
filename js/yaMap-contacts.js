(function () {

    var map,
        myCollection;

ymaps.ready(function () {
    map = new ymaps.Map('map', {
        center:[56.837992,60.597223],
        zoom:15,
        type:'yandex#map',
        behaviors:['default', 'scrollZoom']
    });

    //Добавляем элементы управления
    map.controls
        .add('zoomControl');
    //  .add('typeSelector')
    //  .add('mapTools');

    //myCollection = new ymaps.GeoObjectCollection();

    // Создаем шаблон для отображения контента балуна
    var myBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<h3>$[properties.name]</h3>' +
            '<p><strong>Расположение:</strong> $[properties.position]</p>' +
            '<p><small><strong>Численность населения:</strong> $[properties.population]</small></p>'
    );

    var xxxLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="b-map-baloon">' +

            ' <div class="b-map-baloon__content">' +
            ' <p class="b-map-baloon__name">$[properties.pointName]</p>' +
            ' <p class="b-map-baloon__address">$[properties.pointAddress]</p>' +
            ' <p class="b-map-baloon__phones">$[properties.pointPhones]</p>' +

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


    var placemark = new ymaps.Placemark([56.837992,60.597223], {
        pointName:'СКБ-Банк ',
        pointAddress:"620026, Екатеринбург, <br>   Куйбышева, 75 ",
        pointPhones:"8-800-1000-600"
    }, {
        balloonLayout:xxxLayout,
        // balloonContentBodyLayout:'my#superlayout',
        //  balloonCloseButtonLayout : close,
        balloonShadow : false,
        iconImageHref:'imgs/ya-maps/point.png', // картинка иконки
        iconImageSize:[38, 52] // размеры картинки
        // iconImageOffset: [-3, -42] // смещение картинки
    });

    map.geoObjects.add(placemark);
});
})();

