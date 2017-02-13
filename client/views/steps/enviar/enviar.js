Template.enviar.helpers({
    name: function () {
        return Session.get('name');
    }
});

Template.enviar.events({
    'submit #interesForm': function (event) {
        event.preventDefault();
        var cotizacion = {
            Nombre: Session.get('name'),
            Apellido: event.target.apellidosFormInfo.value,
            Email: event.target.emailFormInfo.value,
            Telefono: event.target.telefonoFormInfo.value,
            Edad: Session.get('edad'),
            Fecha: new Date(),
            Tipo: Session.get('tier'),
            Layout: Session.get('layout'),
            Fachada: Session.get('fachada'),
            Precio: Session.get('precio'),
            Nivel: Session.get('level'),
            Pasatiempos: Session.get('hobbies'),
            Presupuesto: Session.get('budget'),
            Ubicacion: Session.get('perks'),
            eCivil: Session.get('ecivil'),
            Mood: Session.get('design'),
            Genero: Session.get('genero')
        };

        Meteor.call('enviar', cotizacion, function (error, result) {
            if (error) {
                sAlert.error(error.message);
            } else {
                sAlert.success('Enviado exitosamente!');
                event.target.apellidosFormInfo.value = '';
                event.target.emailFormInfo.value = '';
                event.target.telefonoFormInfo.value = '';
                Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); });
                Session.keys = {};
                Meteor.setTimeout(function(){Router.go('/');}, 5000);

            }
        });
    }
});