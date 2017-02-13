Template.export.events({
    'click #toAdmin'() {
      Router.go('/admin');
    },
    'click #prospectos': function (event) {
        var nameFile = 'prospectos.csv';
        Meteor.call('downloadProspectos', function (err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    },
    'click #reservaciones': function (event) {
        var nameFile = 'reservaciones.csv';
        Meteor.call('downloadReservaciones', function (err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    },
    'click #clientes': function (event) {
        var nameFile = 'clientes.csv';
        Meteor.call('downloadClientes', function (err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    }
});

Template.export.onRendered(function () {
    var el = $('.container-fluid');
    el.addClass('white');
});