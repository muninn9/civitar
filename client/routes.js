Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/name', function () {
    this.render('nameform');
});

Router.route('/genero', function () {
    this.render('genero');
});

Router.route('/edad', function () {
    this.render('edad');
});

Router.route('/hobbies', function () {
    this.render('hobbies');
});

Router.route('/ecivil', function () {
    this.render('ecivil');
});

Router.route('/perks', function () {
    this.render('perks');
});

Router.route('/fachada', function () {
    this.render('fachada');
});

Router.route('/fachadapic', function () {
    this.render('fachadapic');
});

Router.route('/design', function () {
    this.render('design');
});

Router.route('/designview', function () {
    this.render('designview');
});

Router.route('/amenidades', function () {
    this.render('amenidades');
});

Router.route('/amenidad', function () {
    this.render('amenidad');
});


Router.route('/budget', function () {
    this.render('budget');
});

Router.route('/tier', function () {
    this.render('tier');
});

Router.route('/tierpreview', function () {
    this.render('tierpreview');
});

Router.route('/level', function () {
    this.render('level');
});

Router.route('/colocar', function () {
    this.render('colocar');
});

Router.route('/resumen', function () {
    this.render('resumen');
});

Router.route('/enviar', function () {
    this.render('enviar');
});

Router.route('/reservar', function () {
    this.render('reservar');
});

Router.route('/login', function () {
    this.render('login');
});

Router.route('/logout', function () {
    AccountsTemplates.logout();
    this.render('login');
});

Router.route('/export', function () {
    this.render('export');
});

Router.route('/gracias', function () {
    this.render('gracias');
});

Router.route('/delete', function () {
    this.render('delete');
});

Router.route('/unauthorized', {
    action: function() {
        this.render('unauthorized');
    },
    onAfterAction: function() {
            setTimeout(function() {
                Router.go('/admin')
            }, 3000)
    }
});