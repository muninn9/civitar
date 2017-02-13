Template.AdminLayout.events({
    'click .btn-delete': function () {                                                                                //
        if (Router.current().route.path() == '/admin/Precios') validateAssAdmin(Meteor.user()._id);
        if (Router.current().route.path() == '/admin/Pisos') validateAssAdmin(Meteor.user()._id)
    }
});

function validateAssAdmin(user) {
    if (!Roles.userIsInRole(user, 'admin') && !Roles.userIsInRole(user, 'assistant-admin')) {

        setTimeout(function() {
            var backdrop = document.getElementsByClassName('modal-backdrop'),
                modal = document.getElementsByClassName('modal');

            _.each(modal, function(val) {
               val.classList.add('hidden')
            });

            _.each(backdrop, function(val) {
                val.classList.add('hidden')
            });


            Router.go('/unauthorized')
        }, 0);

    }
}