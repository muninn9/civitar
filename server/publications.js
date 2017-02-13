Meteor.publish('pisos', function(){
    return Pisos.find();
});

Meteor.publish('precios',function(){
    return Precios.find();
});
Meteor.publish('reservaciones',function(){
    return Reservaciones.find();
});
Meteor.publish('prospectos',function(){
    return Prospectos.find();
});
Meteor.publish('clientes',function(){
    return Clientes.find();
});