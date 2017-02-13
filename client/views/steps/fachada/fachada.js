Template.fachada.events({
    'click .n': function() {
        Session.setPersistent('fachada', 'Norte');
        Router.go('/fachadapic');
    },
    'click .s': function() {
        Session.setPersistent('fachada', 'Sur');
        Router.go('/fachadapic');
    }
});