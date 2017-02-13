Template.reservar.helpers({
    name: function () {
        return Session.get('name');
    }
});

Template.reservar.events({
    'submit #reservarForm': function (event) {
        event.preventDefault();
        var tiles = [];
        var selected = Session.get('selected');
        var free = true;
        var piso = Pisos.find({Piso: parseInt(Session.get('level'))}).fetch()[0];
        selected.forEach(function (item) {
            piso.Distribucion.Norte.forEach(function (n) {
                if (n.posicion.toString() === item.toString()) {
                    if (n.estado === 'libre') {
                        tiles.push(item);
                    } else {
                        free = false;
                    }
                }
            });
            piso.Distribucion.Sur.forEach(function (s) {
                if (s.posicion.toString() === item.toString()) {
                    if (s.estado === 'libre') {
                        tiles.push(item - 15);
                    } else {
                        free = false;
                    }
                }
            });
        });

        const level = (parseInt(Session.get('level')) < 10) ? "0" + Session.get('level') : Session.get('level');


        var client = {
            Nombre: Session.get('name'),
            Apellido: event.target.apellidoForm.value,
            Email: event.target.emailForm.value,
            Telefono: event.target.telefonoForm.value,
            Edad: Session.get('edad'),
            Pasatiempos: Session.get('hobbies'),
            Presupuesto: Session.get('budget'),
            Ubicacion: Session.get('perks'),
            eCivil: Session.get('ecivil'),
            Mood: Session.get('design'),
            Genero: Session.get('genero')
        };

        var reservation = {
            Codigo: level + (Reservaciones.find().count() + 1) + Session.get('fachadaSelected').charAt(0) + tiles.join(""),
            Fecha: new Date(),
            Usuario: Meteor.user().emails[0].address,
            Tipo: Session.get('tier'),
            Layout: parseInt(Session.get('layout')),
            Fachada: Session.get('fachadaSelected'),
            Cliente: Session.get('name') + ' ' + event.target.apellidoForm.value,
            Email: event.target.emailForm.value,
            Modulos: tiles,
            Precio: Session.get('precio'),
            Nivel: parseInt(Session.get('level')),
            Selected: selected
        };

        if (free) {
            Meteor.call('reservar', client, reservation, function (error, result) {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    sAlert.success('Reserva exitosa!');
                    event.target.apellidoForm.value = '';
                    event.target.emailForm.value = '';
                    event.target.telefonoForm.value = '';
                    Object.keys(Session.keys).forEach(function (key) {
                        Session.set(key, undefined);
                    });
                    Session.keys = {};
                    Meteor.setTimeout(function () {
                        Router.go('/gracias');
                    }, 1000);
                }
            });
        } else {
            sAlert.warning('Los bloques ya no estan libres');
        }
    }
});