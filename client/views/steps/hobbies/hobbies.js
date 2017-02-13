Template.hobbies.events({
    'click .d': function() {
        Session.setPersistent('hobbies', 'Deportista');
        Router.go('/ecivil');
    },
    'click .s': function() {
        Session.setPersistent('hobbies', 'Social');
        Router.go('/ecivil');
    },
    'click .c': function() {
        Session.setPersistent('hobbies', 'Chef');
        Router.go('/ecivil');
    },
    'click .l': function() {
        Session.setPersistent('hobbies', 'Lectura');
        Router.go('/ecivil');
    },
    'click .t': function() {
        Session.setPersistent('hobbies', 'Tecnologia');
        Router.go('/ecivil');
    }
});