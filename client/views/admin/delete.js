Template.delete.onRendered(function () {
    var el = $('.container-fluid');
    el.addClass('white');
});

Template.delete.events({
    'click #button2id': function (event, template) {
        event.preventDefault();
        var codigo = template.find('#Codigo').value;
        Meteor.call('eliminarReservacion', codigo, function (error, result) {
            if (error) {
                sAlert.error(error.message);
            } else {
                sAlert.success('Eliminado exitosamente!');
                template.find('#Codigo').value = '';
            }
        });
    },
    'click #button3id': function () {
        Router.go('/admin')
    }
});