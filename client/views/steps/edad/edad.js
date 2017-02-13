Template.edad.events({
    'click .25': function() {
        Session.setPersistent('edad', 'Menos de 25 años');
        Router.go('/hobbies');
    },
    'click .35': function() {
        Session.setPersistent('edad', '26 a 35 años');
        Router.go('/hobbies');
    },
    'click .45': function() {
        Session.setPersistent('edad', '36 a 45 años');
        Router.go('/hobbies');
    },
    'click .55': function() {
    Session.setPersistent('edad', '46 a 5 años');
    Router.go('/hobbies');
    },
    'click .56': function() {
        Session.setPersistent('edad', '56 años o más');
        Router.go('/hobbies');
    }
});