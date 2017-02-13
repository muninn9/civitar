Template.genero.events({
    'click .m': function() {
        Session.setPersistent('genero', 'masculino');
        Router.go('/edad');
    },
    'click .f': function() {
        Session.setPersistent('genero', 'femenino');
        Router.go('/edad');
    }
});