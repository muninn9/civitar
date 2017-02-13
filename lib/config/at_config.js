AccountsTemplates.configure({
    forbidClientAccountCreation: true,
    onLogoutHook: function(){
        Router.go('/login');
    }
});