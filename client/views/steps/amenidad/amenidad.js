Template.amenidad.helpers({
    url: function () {
        return Session.get('urlAmenidad');
    },
    nombre:function(){
        return Session.get('nombreAmenidad');
    }
});

Template.amenidad.events({
    'click .c': function() {
        Router.go('/budget');
    }
});