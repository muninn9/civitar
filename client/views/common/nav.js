Template.nav.events({
    'click .back': function(){
        history.back();
    },
    'click .home': function(){
        Router.go('/');
    }
});