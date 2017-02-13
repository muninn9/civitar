Template.resumen.helpers({
    url: function () {
        switch (Session.get('design')){
            case 'Black Velvet':
                return 'img/moods/blackvelvet-full.jpg';
            case 'Clean Dreamer':
                return 'img/moods/cleandreamer-full.jpg';
            case 'Loud Smile':
                return 'img/moods/loudsmile-full.jpg';
            default:
                return 'ERROR';
        }
    },
    nivel: function () {
        return Session.get('level');
    },
    precio: function () {
        return Session.get('precio');
    },
    fachada: function () {
        return Session.get('fachadaSelected');
    },
    tipo: function () {
        switch (Session.get('tier')){
            case 'A':
                return '40m²';
            case 'B':
                return '60m²';
            case 'C':
                return '80m²';
            default:
                return 'ERROR';
        }
    },
    nombre: function () {
        return Session.get('name');
    }
});

Template.resumen.events({
    'click .reservar': function () {
        Router.go('reservar');
    },
    'click .enviar': function () {
        Router.go('enviar');
    }
});