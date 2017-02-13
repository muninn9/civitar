Template.ecivil.events({
    'click .as': function() {
        Session.setPersistent('ecivil', 'Adulto solo');
        Router.go('/perks');
    },
    'click .p': function() {
        Session.setPersistent('ecivil', 'Pareja');
        Router.go('/perks');
    },
    'click .a1': function() {
        Session.setPersistent('ecivil', 'Adulto con 1 hijo');
        Router.go('/perks');
    },
    'click .a2': function() {
        Session.setPersistent('ecivil', 'Adulto con 2 hijos');
        Router.go('/perks');
    },
    'click .p1': function() {
        Session.setPersistent('ecivil', 'Pareja con 1 hijo');
        Router.go('/perks');
    },
    'click .p2': function() {
        Session.setPersistent('ecivil', 'Pareja con 2 hijos');
        Router.go('/perks');
    },
    'click .o': function() {
        Session.setPersistent('ecivil', 'Otro');
        Router.go('/perks');
    }
});