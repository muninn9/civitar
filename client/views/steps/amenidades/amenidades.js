Template.amenidades.events({
    'click .lounge': function() {
        Session.setPersistent('urlAmenidad','img/renders/lounge.jpg');
        Session.setPersistent('nombreAmenidad','Lounge');
        Router.go('/amenidad');
    },
    'click .piscinas': function() {
        Session.setPersistent('urlAmenidad','img/renders/piscina.jpg');
        Session.setPersistent('nombreAmenidad','Piscina');
        Router.go('/amenidad');
    },
    'click .gym': function() {
        Session.setPersistent('urlAmenidad','img/renders/gym.jpg');
        Session.setPersistent('nombreAmenidad','Gym');
        Router.go('/amenidad');
    },
    'click .piscina': function() {
        Session.setPersistent('urlAmenidad','img/renders/piscina.jpg');
        Session.setPersistent('nombreAmenidad','Piscina');
        Router.go('/amenidad');
    },
    'click .c': function() {
        Router.go('/budget');
    }
});