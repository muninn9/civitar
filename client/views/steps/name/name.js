Template.nameform.events({
    'submit .name-form'(event) {
        event.preventDefault();
        Session.setPersistent('name', event.target.text.value);
        Router.go('/genero');
    }
});