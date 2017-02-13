Pisos = new Mongo.Collection("pisos");
Precios = new Mongo.Collection("precios");
Reservaciones = new Mongo.Collection("reservaciones");
Prospectos = new Mongo.Collection("prospectos");
Clientes = new Mongo.Collection("clientes");

Schemas = {};

Schemas.Precios = new SimpleSchema({
    Piso: {
        type: String
    },
    Tipo: {
        type: String
    },
    Precio: {
       type: String
    }
});

Precios.attachSchema(Schemas.Precios);


Schemas.Pisos = new SimpleSchema({
    Piso: {
        type: Number,
        label: 'Numero de piso'
    },
    Estado: {
        type: String
    },
    Distribucion: {
        type: Object
    },
    'Distribucion.Norte': {
        type: Array
    },
    'Distribucion.Norte.$': {
        type: Object
    },
    'Distribucion.Norte.$.id': {
        type: String,
        label: 'Identificador del bloque'
    },
    'Distribucion.Norte.$.posicion': {
        type: String,
        label: 'Posicion en el piso'
    },
    'Distribucion.Norte.$.estado': {
        type: String
    },
    'Distribucion.Norte.$.permitido': {
        type: Object
    },
    'Distribucion.Norte.$.permitido.A': {
        type: String
    },
    'Distribucion.Norte.$.permitido.B': {
        type: String
    },
    'Distribucion.Norte.$.permitido.C': {
        type: String
    },
    'Distribucion.Sur': {
        type: Array
    },
    'Distribucion.Sur.$': {
        type: Object
    },
    'Distribucion.Sur.$.id': {
        type: String,
        label: 'Identificador del modulo'
    },
    'Distribucion.Sur.$.posicion': {
        type: String,
        label: 'Posicion en el piso'
    },
    'Distribucion.Sur.$.estado': {
        type: String
    },
    'Distribucion.Sur.$.permitido': {
        type: Object
    },
    'Distribucion.Sur.$.permitido.A': {
        type: String
    },
    'Distribucion.Sur.$.permitido.B': {
        type: String
    },
    'Distribucion.Sur.$.permitido.C': {
        type: String
    }
});

Pisos.attachSchema(Schemas.Pisos);


Schemas.Reservaciones = new SimpleSchema({
    Codigo:{
      type: String
    },
    Fecha:{
        type: String
    },
    Usuario: {
        type: String
    },
    Cliente: {
        type: String
    },
    Email: {
        type: String
    },
    Tipo: {
        type: String
    },
    Layout: {
        type: Number
    },
    Fachada: {
        type: String
    },
    Modulos:{
        type: Array
    },
    'Modulos.$':{
        type: String
    },
    Precio:{
        type: String
    },
    Nivel:{
        type: Number
    },
    Selected:{
        type: Array
    },
    'Selected.$':{
        type: String
    }
});

Reservaciones.attachSchema(Schemas.Reservaciones);

Schemas.Clientes = new SimpleSchema({
    Nombre: {
        type: String
    },
    Apellido: {
        type: String
    },
    Email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    Telefono:{
        type: String
    },
    Edad:{
        type: String
    },
    Pasatiempos:{
        type: String
    },
    Presupuesto:{
        type: String
    },
    Ubicacion:{
        type: String
    },
    eCivil:{
        type: String
    },
    Mood:{
        type: String
    },
    Genero:{
        type: String
    }
});

Clientes.attachSchema(Schemas.Clientes);

Schemas.Prospectos = new SimpleSchema({
    Nombre:{
        type: String
    },
    Apellido:{
        type: String
    },
    Email: {
        type: String
    },
    Telefono:{
        type: String
    },
    Edad:{
        type: String
    },
    Fecha:{
        type: String
    },
    Tipo: {
        type: String
    },
    Layout: {
        type: String
    },
    Fachada: {
        type: String
    },
    Precio:{
        type: String
    },
    Nivel:{
        type: String
    },
    Pasatiempos:{
        type: String
    },
    Presupuesto:{
        type: String
    },
    Ubicacion:{
        type: String
    },
    eCivil:{
        type: String
    },
    Mood:{
        type: String
    },
    Genero:{
        type: String
    }
});

Prospectos.attachSchema(Schemas.Prospectos);