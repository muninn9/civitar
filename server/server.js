Meteor.startup(function () {

    smtp = {
        username: 'info@ununciatura-app.com',
        password: 'Jocote34',
        server: 'smtp.gmail.com',
        port: 465
    };


    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    var roles = _.map(Roles.getAllRoles().fetch(), function(doc) { return doc.name });
    if(_.indexOf(roles, 'assistant-admin') < 0) Roles.createRole('assistant-admin');
    if(_.indexOf(roles, 'basic-admin') < 0) Roles.createRole('basic-admin');

    if (Meteor.users.find().count() === 0) {
        var options = {
            email: 'admin@civitar.com',
            password: '1234'
        };
        return Accounts.createUser(options);
    }

    if (Pisos.find().count() === 0) {
        var myjson = {}, i;
        for (i = 2; i < 27; i++) {
            myjson = JSON.parse(Assets.getText(i + ".json"));
            Pisos.insert(myjson);
        }
    }

    if (Precios.find().count() === 0) {
        var precios = JSON.parse(Assets.getText("precios.json"));
        precios.forEach(function (item) {
            Precios.insert(item);
        });
    }


});

Meteor.methods({
    getFloor: function (n) {
        return Pisos.find({Piso: parseInt(n)}).fetch()[0];
    },
    getPrice: function (l, t) {
        var result = Precios.find({
            Piso: l.toString(),
            Tipo: t
        }).fetch()[0].Precio;
        return result;
    },
    reservar: function (client, reservation) {
        var free = true;
        var piso = Pisos.findOne({Piso: reservation.Nivel});
        reservation.Modulos.forEach(function (item) {
            piso.Distribucion.Norte.forEach(function (n) {
                if (n.posicion === item) {
                    if (n.estado !== 'libre') {
                        free = false;
                    }
                }
            });
            piso.Distribucion.Sur.forEach(function (s) {
                if (s.posicion === item) {
                    if (s.estado !== 'libre') {
                        free = false;
                    }
                }
            });
        });
        if (!free) {
            throw new Meteor.Error("Los modulos no estan libres");
        } else {
            var params = {
                Email: client.Email
            };
            var query = Clientes.find(params).fetch();
            if (query.length === 0) {
                Clientes.insert(client, function (err, res) {
                    if (err) {
                        throw new Meteor.Error("Ocurrio un error al reservar", err.message);
                    }
                });
            }
            Reservaciones.insert(reservation, function (err, res) {
                if (!err) {
                    reservation.Modulos.forEach(function (item, index) {
                        var indexFix = (reservation.Fachada === 'Norte') ? 0 : 15;
                        var selector = "Distribucion." + reservation.Fachada + "." + ((+reservation.Selected[index] - 1) - indexFix) + ".estado";
                        var params = {};
                        params['$set'] = {};
                        params.$set[selector] = 'reservado';
                        Pisos.update(piso._id, params);
                    });

                    var nombre = client.Nombre + ' ' + client.Apellido;
                    var size;
                    var fotoLayout;
                    var fotoDesign;
                    switch (reservation.Tipo) {
                        case 'A':
                            size = '40m2';
                            if (reservation.Layout === 1) {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/a1.jpg';
                            } else {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/a2.jpg';
                            }
                            break;
                        case 'B':
                            size = '60m2';
                            if (reservation.Layout === 1) {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/b1.jpg';
                            } else {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/b2.jpg';
                            }
                            break;
                        case 'C':
                            size = '80m2';
                            if (reservation.Layout === 1) {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/c1.jpg';
                            } else {
                                fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/c2.jpg';
                            }
                            break;
                        default:
                            break
                    }
                    switch (client.Mood) {
                        case 'Black Velvet':
                            fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/black.jpg';
                            break;
                        case 'Clean Dreamer':
                            fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/clean.jpg';
                            break;
                        case 'Loud Smile':
                            fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/loug.jpg';
                            break;
                        default:
                            break;
                    }
                    var infoAparta = 'Apartamento ' + size + ', Nivel ' + reservation.Nivel + ', Fachada ' + reservation.Fachada + ' $' + reservation.Precio + '*';

                    var clientHtml = '';
                    _.each(client, function(val, prop) {
                        clientHtml += prop + ': ' + val + '<br>'
                    });

                    var reservationHtml = '';
                    _.each(reservation, function(val, prop) {
                        reservationHtml += prop + ': ' + val + '<br>'
                    });

                     Email.send({
                        to: client.Email,
                        from: 'info@ununciatura-app.com',
                        subject: 'Informacion Civitar',
                        html: "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head> <meta name=\"viewport\" content=\"width=device-width\"/> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title>HTML email test</title> <link href=\"styles.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\"/></head><body itemscope itemtype=\"http://schema.org/EmailMessage\"><div marginheight=\"0\" marginwidth=\"0\" style=\"margin:0px;background-color:#00b1cd\" bgcolor=\"#00b1cd\"> <table bgcolor=\"#00b1cd\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"45\" align=\"center\" valign=\"middle\"><p>&nbsp;</p></td></tr></tbody> </table> <table style=\"background-color:#ffffff\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"684\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td valign=\"middle\" width=\"493\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"60\"></td></tr><tr> <td style=\"text-align:center\"><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/header-new.png\"> <div style=\"opacity: 0.01; left: 543.033px; top: 824.167px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q6\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><h1>" + infoAparta + "</h1></td></tr><tr> <td height=\"40\"></td></tr></tbody> </table> </td><td width=\"18\"></td></tr></tbody> </table> </td></tr></tbody> </table> <table align=\"center\" bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"684\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"624\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td align=\"center\" valign=\"top\"><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/img1.jpg\" alt=\"image dsc\" style=\"border:solid 1px #fff\" width=\"622\"> <div style=\"opacity: 0.01; left: 606.45px; top: 1262.42px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q8\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"50\" valign=\"bottom\"><img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/line-break.jpg\" height=\"27\" width=\"622\"></td></tr></tbody> </table> <p> <img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/suapartamentou-new.png\"> </p><h1>" + nombre + "</h1><br><br><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"" + fotoDesign + "\"> <div style=\"opacity: 0.01; left: 594.983px; top: 1882.07px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip-class=\"a1V\" id=\":q7\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" title=\"Descargar\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><br><br><a href=\"https://www.dropbox.com/sh/rwy0o4ye0dsl4j6/AAA1kwDL0KTIrr695qCpPEzIa?dl=0\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?hl=es&amp;q=https://www.dropbox.com/sh/rwy0o4ye0dsl4j6/AAA1kwDL0KTIrr695qCpPEzIa?dl%3D0&amp;source=gmail&amp;ust=1474474788600000&amp;usg=AFQjCNEz4Rq8g4KmJ2v2BDNW0sX9S4G3KA\">VER TENDENCIA COMPLETA</a> <br><br><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"" + fotoLayout + "\" width=\"600\"> <div style=\"opacity: 0.01; left: 594.983px; top: 2320.83px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip-class=\"a1V\" id=\":r6\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" title=\"Descargar\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><br><br><img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/amenidades.png\"> <img tabindex=\"0\" class=\"CToWUd a6T\" src=\"https://ci4.googleusercontent.com/proxy/IZMmMYFVVGXdCUOQUOTRLI3w5VHrn36z84pp5ernk2tRggLeNNiUFqJyrs2VY2wxEl1wKquFt1rtpuChZuAENN0NWweGym-IG20pQq3ljvpBkrLG3HQyIR14cSfbPtM5T8Q=s0-d-e1-ft#http://www.ununciatura.com/app/admin/includes/funciones/images/amenities.png\"> <div style=\"opacity: 0.01; left: 595px; top: 3049.83px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q9\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"yj6qo\"></div><div class=\"adL\"> </div></div></body></html>"
                    });

                    Email.send({
                        to: Meteor.user().emails[0].address,
                        from: 'info@ununciatura-app.com',
                        subject: 'Nueva Reserva',
                        html: "<h1>Información del Cliente</h1><br>" + clientHtml + '<br><h1>Detalles de la Reserva</h1><br>' + reservationHtml
                    });


                } else {
                    throw new Meteor.Error("Ocurrio un error al reservar", err.message);
                }
            });
        }
    },
    enviar: function (cotizacion) {
        Prospectos.insert(cotizacion, function (err, res) {
            if (err) {
                throw new Meteor.Error("Ocurrio un error al guardar la cotizacion", err.message);
            }
        });

        var nombre = cotizacion.Nombre + ' ' + cotizacion.Apellido;
        var size;
        var fotoLayout;
        var fotoDesign;
        switch (cotizacion.Tipo) {
            case 'A':
                size = '40m2';
                if (cotizacion.Layout === 1) {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/a1.jpg';
                } else {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/a2.jpg';
                }
                break;
            case 'B':
                size = '60m2';
                if (cotizacion.Layout === 1) {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/b1.jpg';
                } else {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/b2.jpg';
                }
                break;
            case 'C':
                size = '80m2';
                if (cotizacion.Layout === 1) {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/c1.jpg';
                } else {
                    fotoLayout = 'http://www.camiondechocolate.com/civitar/app/assets/img/aptos/c2.jpg';
                }
                break;
            default:
                break
        }
        switch (cotizacion.Mood) {
            case 'Black Velvet':
                fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/black.jpg';
                break;
            case 'Clean Dreamer':
                fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/clean.jpg';
                break;
            case 'Loud Smile':
                fotoDesign = 'http://www.ununciatura.com/app/admin/includes/funciones/images/loug.jpg';
                break;
            default:
                break;
        }
        var infoAparta = 'Apartamento ' + size + ', Nivel ' + cotizacion.Nivel + ', Fachada ' + cotizacion.Fachada + ' $' + cotizacion.Precio + '*';

        var clientHtml = '';
        _.each(cotizacion, function(val, prop) {
            clientHtml += prop + ': ' + val + '<br>'
        });

        Email.send({
            to: cotizacion.Email,
            from: 'info@ununciatura-app.com',
            subject: 'Informacion Civitar',
            html: "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head> <meta name=\"viewport\" content=\"width=device-width\"/> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <title>HTML email test</title> <link href=\"styles.css\" media=\"all\" rel=\"stylesheet\" type=\"text/css\"/></head><body itemscope itemtype=\"http://schema.org/EmailMessage\"><div marginheight=\"0\" marginwidth=\"0\" style=\"margin:0px;background-color:#00b1cd\" bgcolor=\"#00b1cd\"> <table bgcolor=\"#00b1cd\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"45\" align=\"center\" valign=\"middle\"><p>&nbsp;</p></td></tr></tbody> </table> <table style=\"background-color:#ffffff\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"684\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td valign=\"middle\" width=\"493\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"60\"></td></tr><tr> <td style=\"text-align:center\"><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/header-new.png\"> <div style=\"opacity: 0.01; left: 543.033px; top: 824.167px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q6\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><h1>" + infoAparta + "</h1></td></tr><tr> <td height=\"40\"></td></tr></tbody> </table> </td><td width=\"18\"></td></tr></tbody> </table> </td></tr></tbody> </table> <table align=\"center\" bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"684\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"624\"> <tbody> <tr> <td> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td align=\"center\" valign=\"top\"><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/img1.jpg\" alt=\"image dsc\" style=\"border:solid 1px #fff\" width=\"622\"> <div style=\"opacity: 0.01; left: 606.45px; top: 1262.42px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q8\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> <tbody> <tr> <td height=\"50\" valign=\"bottom\"><img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/line-break.jpg\" height=\"27\" width=\"622\"></td></tr></tbody> </table> <p> <img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/suapartamentou-new.png\"> </p><h1>" + nombre + "</h1><br><br><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"" + fotoDesign + "\"> <div style=\"opacity: 0.01; left: 594.983px; top: 1882.07px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip-class=\"a1V\" id=\":q7\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" title=\"Descargar\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><br><br><a href=\"https://www.dropbox.com/sh/rwy0o4ye0dsl4j6/AAA1kwDL0KTIrr695qCpPEzIa?dl=0\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?hl=es&amp;q=https://www.dropbox.com/sh/rwy0o4ye0dsl4j6/AAA1kwDL0KTIrr695qCpPEzIa?dl%3D0&amp;source=gmail&amp;ust=1474474788600000&amp;usg=AFQjCNEz4Rq8g4KmJ2v2BDNW0sX9S4G3KA\">VER TENDENCIA COMPLETA</a> <br><br><img tabindex=\"0\" class=\"CToWUd a6T\" src=\"" + fotoLayout + "\" width=\"600\"> <div style=\"opacity: 0.01; left: 594.983px; top: 2320.83px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip-class=\"a1V\" id=\":r6\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" title=\"Descargar\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div><br><br><img class=\"CToWUd\" src=\"http://www.ununciatura.com/app/admin/includes/funciones/images/amenidades.png\"> <img tabindex=\"0\" class=\"CToWUd a6T\" src=\"https://ci4.googleusercontent.com/proxy/IZMmMYFVVGXdCUOQUOTRLI3w5VHrn36z84pp5ernk2tRggLeNNiUFqJyrs2VY2wxEl1wKquFt1rtpuChZuAENN0NWweGym-IG20pQq3ljvpBkrLG3HQyIR14cSfbPtM5T8Q=s0-d-e1-ft#http://www.ununciatura.com/app/admin/includes/funciones/images/amenities.png\"> <div style=\"opacity: 0.01; left: 595px; top: 3049.83px;\" dir=\"ltr\" class=\"a6S\"> <div data-tooltip=\"Descargar\" data-tooltip-class=\"a1V\" id=\":q9\" class=\"T-I J-J5-Ji aQv T-I-ax7 L3 a5q\" role=\"button\" tabindex=\"0\" aria-label=\"Descargar el archivo adjunto \"> <div class=\"aSK J-J5-Ji aYr\"></div></div></div></td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></tbody> </table> <div class=\"yj6qo\"></div><div class=\"adL\"> </div></div></body></html>"
        });

        Email.send({
            to: Meteor.user().emails[0].address,
            from: 'info@ununciatura-app.com',
            subject: 'Nuevo Prospecto',
            html: "<h1>Cotizacion</h1><br>" + clientHtml + '<br>'
        });
    },
    downloadProspectos: function () {
        var collection = Prospectos.find().fetch();
        var heading = true;
        var delimiter = ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
    },
    downloadClientes: function () {
        var collection = Clientes.find().fetch();
        var heading = true;
        var delimiter = ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
    },
    downloadReservaciones: function () {
        var collection = Reservaciones.find().fetch();
        var heading = true;
        var delimiter = ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
    },
    eliminarReservacion: function(codigo){
        var reservation = Reservaciones.find({Codigo: codigo}).fetch()[0];
        var piso = Pisos.find({Piso: reservation.Nivel}).fetch()[0];
        reservation.Modulos.forEach(function (item, index){
            var indexFix = (reservation.Fachada === 'Norte') ? 0 : 15;
            var selector = "Distribucion." + reservation.Fachada + "." + ((+reservation.Selected[index] - 1) - indexFix) + ".estado";
            var params = {};
            params['$set'] = {};
            params.$set[selector] = 'libre';
            Pisos.update(piso._id, params);
        });
        Reservaciones.remove({Codigo: codigo});
    }
});
