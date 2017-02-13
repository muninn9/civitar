Template.gracias.onRendered(function () {
    Meteor.logout(function (err, res) {
        if (err) {
            sAlert.error('We could not log you out. Please refresh the page.');
        }
    });

    Meteor.logoutOtherClients(function (err, res) {
        if (err) {

        }
    })
});