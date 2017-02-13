Template.budget.events({
    'click .100': function() {
        Session.setPersistent('budget', 'Menos de $100.000');
        Router.go('/tier');
    },
    'click .101': function() {
        Session.setPersistent('budget', '$101.000 a $150.000');
        Router.go('/tier');
    },
    'click .151': function() {
        Session.setPersistent('budget', '$151.000 a $200.000');
        Router.go('/tier');
    },
    'click .200': function() {
        Session.setPersistent('budget', 'Más de $200.000');
        Router.go('/tier');
    }
});