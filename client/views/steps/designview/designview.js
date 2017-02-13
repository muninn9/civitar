Template.designview.helpers({
    urls: function () {
        switch (Session.get('design')) {
            case 'Black Velvet':
                return ['img/galerias/black/1.jpg','img/galerias/black/2.jpg','img/galerias/black/3.jpg','img/galerias/black/4.jpg'];
            case 'Clean Dreamer':
                return ['img/galerias/clean/1.jpg','img/galerias/clean/2.jpg','img/galerias/clean/3.jpg','img/galerias/clean/4.jpg'];
            case 'Loud Smile':
                return ['img/galerias/loud/1.jpg','img/galerias/loud/2.jpg','img/galerias/loud/3.jpg','img/galerias/loud/4.jpg'];
            default:
                return null;
        }
    },
    urls1: function () {
        switch (Session.get('design')) {
            case 'Black Velvet':
                return ['img/galerias/black/1.jpg','img/galerias/black/2.jpg'];
            case 'Clean Dreamer':
                return ['img/galerias/clean/1.jpg','img/galerias/clean/2.jpg'];
            case 'Loud Smile':
                return ['img/galerias/loud/1.jpg','img/galerias/loud/2.jpg'];
            default:
                return null;
        }
    },
    urls2: function () {
        switch (Session.get('design')) {
            case 'Black Velvet':
                return ['img/galerias/black/3.jpg','img/galerias/black/4.jpg'];
            case 'Clean Dreamer':
                return ['img/galerias/clean/3.jpg','img/galerias/clean/4.jpg'];
            case 'Loud Smile':
                return ['img/galerias/loud/3.jpg','img/galerias/loud/4.jpg'];
            default:
                return null;
        }
    },
    titulo:function(){
        return Session.get('design');
    }
});

Template.designview.events({
    'click':function(e){
        var tar = $(e.currentTarget);
        if(tar.hasClass('img-design-view')){
            $('.carousel-design-view').show();
            $('.design-view').hide();
            //$('.touch-icon').show();
            $('.carousel-control').show();
        }else{
            if(!tar.hasClass('glyphicon') && !tar.hasClass('carousel') && !tar.hasClass('carousel-control')){
                $('.carousel-design-view').hide();
                $('.design-view').show();
                //$('.touch-icon').hide();
                $('.carousel-control').hide();

            }
        }
    }
});
Template.designview.onRendered(function(){
    $(".owl-carousel").owlCarousel({
        items: 1
    });
});

Template.registerHelper('first',
    function(list, elem) {
        return _.first(list) === elem;
    }
);

