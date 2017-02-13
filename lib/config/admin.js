AdminConfig = {
    name: 'Civitar',
    skin: 'black-light',
    collections: {
        Reservaciones: {
            tableColumns:[
                {label: 'Codigo', name: 'Codigo'},
                {label: 'Fecha', name:'Fecha'},
                {label: 'Usuario', name:'Usuario'},
                {label: 'Cliente', name:'Cliente'},
                {label: 'Piso', name:'Nivel'},
                {label: 'Tipo', name:'Tipo'},
                {label: 'Layout', name:'Layout'},
                {label: 'Fachada', name:'Fachada'},
                {label: 'Modulos', name:'Modulos'}
            ]
        },
        /*Clientes: {
            tableColumns:[
                {label: 'Nombre', name: 'Nombre'},
                {label: 'Apellido', name:'Apellido'},
                {label: 'Telefono', name: 'Telefono'},
                {label: 'Email', name:'Email'}
            ]
        },*/
        Prospectos: {
            tableColumns:[
                {label: 'Fecha', name:'Fecha'},
                {label: 'Nombre', name:'Nombre'},
                {label: 'Apellido', name:'Apellido'},
                {label: 'Email', name: 'Email'},
                {label: 'Telefono', name: 'Telefono'},
            ]
        },
        Pisos: {
            tableColumns: [
                { label: 'Id', name: '_id'},
                { label: 'Piso', name: 'Piso' },
                { label: 'Estado', name: 'Estado'}
            ]
        },
        Precios: {
            tableColumns: [
                { label: 'Tipo', name: 'Tipo'},
                { label: 'Piso', name: 'Piso' },
                { label: 'Precio', name: 'Precio'}
            ],
            routes: {
                new: {
                    onBeforeAction: function () {
                        var valid = validateAdmin(Meteor.user()._id);
                        if (valid === true) this.next()
                    }
                },
                edit: {
                    onBeforeAction: function () {
                        var valid = validateAdmin(Meteor.user()._id);
                        if (valid === true) this.next()
                    }
                }
            }
        }
    }
};

function validateAdmin(user) {
    if (!Roles.userIsInRole(user, 'admin')) {
        Router.go('/unauthorized')
    } else {
        return true
    }
}


Meteor.startup(function() {
    AdminDashboard.addSidebarItem('Eliminar', AdminDashboard.path('../delete'), { icon: 'minus' });
    AdminDashboard.addSidebarItem('Exportar', AdminDashboard.path('../export'), { icon: 'download' });
});