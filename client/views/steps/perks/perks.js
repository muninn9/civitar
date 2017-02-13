Template.perks.events({
    'click .t': function() {
        Session.setPersistent('perks', 'Cercanía al trabajo');
        Router.go('/fachada');
    },
    'click .v': function() {
        Session.setPersistent('perks', 'Vida urbana');
        Router.go('/fachada');
    },
    'click .u': function() {
        Session.setPersistent('perks', 'Ubicación céntrica');
        Router.go('/fachada');
    },
    'click .f': function() {
        Session.setPersistent('perks', 'Cercanía a familia');
        Router.go('/fachada');
    }
});