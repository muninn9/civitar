Template.login.onRendered(function () {
    var el = $('.container-fluid');
    el.addClass('white');
    this.autorun(function () {
        if (Meteor.userId()) {
            Router.go('/admin')
        }
    });
});

Template.login.events({
   'click .go-home': function() {
        Router.go('/')
    }
});

Template.login.onCreated(function() {

});

