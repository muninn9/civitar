Template.design.events({
    'click .bv': function() {
        Session.setPersistent('design', 'Black Velvet');
        Router.go('/designview');
    },
    'click .cd': function() {
        Session.setPersistent('design', 'Clean Dreamer');
        Router.go('/designview');
    },
    'click .ls': function() {
        Session.setPersistent('design', 'Loud Smile');
        Router.go('/designview');
    }
});