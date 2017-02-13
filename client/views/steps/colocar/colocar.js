Template.colocar.helpers({
    tier: function () {
        return Session.get('tier');
    },
    level: function () {
        return Session.get('level');
    },
    msg: function () {
        return Session.get('msg');
    },
    complete: function () {
        return Session.get('complete');
    },
    url: function () {
        return Session.get('tierpreviewpic');
    }
});

Template.colocar.onRendered(function () {
    Session.setPersistent('msg', '');
    Session.setPersistent('selected', []);
    Session.setPersistent('complete', false);
});

Template.colocar.events({
    'dragstart .tile': function (e, t) {
        e.originalEvent.dataTransfer.setData('text', 'foo');
    },
    'dragover .tile': function (e, t) {
        e.preventDefault();
        $(e.currentTarget).addClass('dragover');
        e.originalEvent.dataTransfer.dropEffect = 'move';
    },

    'dragleave .tile': function (e, t) {
        $(e.currentTarget).removeClass('dragover');
    },
    'drop .tile': function (e, t) {
        var tar = $(e.currentTarget);
        e.preventDefault();
        tar.removeClass('dragover');
        if (tar.hasClass('forbidden-rule') || tar.hasClass('blocked') || tar.hasClass('reserved') || tar.hasClass('forbidden') || tar.hasClass('forbidden-blocker') || tar.hasClass('forbidden-blocker-restriction') || tar.hasClass('forbidden-start')) {
            Session.setPersistent('msg', 'Not allowed in ' + e.target.id);
            Session.setPersistent('complete', false);
        } else {
            if (tar.hasClass('nope')) {
                return;
            }
            $('#piso').addClass('empty');
            var extra = 0;
            switch (Session.get('tier')) {
                case 'A':
                    extra = 1;
                    break;
                case 'B':
                    extra = 2;
                    break;
                case 'C':
                    extra = 3;
                    break;
                default:
                    break;
            }

            var selected = [], mult = extra + 1, div = 1.5 * extra, parent = e.target.parentElement, fachada = (e.target.id > 15) ? 'Sur' : 'Norte';
            selected.push(parseInt(e.target.id));


            //This places the actual image of the apartment in the appropriate position
            var filled = $('<div id="filled-img"></div>')
                .css("background-image", "url(" + Session.get('tierpreviewpic') + ")")
                .css("background-size", 'cover')
                .css('top', e.target.offsetTop - 1 + 'px')
                .css('left', e.target.offsetLeft - 1 + 'px')
                .css('height', e.target.offsetHeight + 1 + 'px')
                .css('width', e.target.offsetWidth * mult + div + 'px')
                .css('position', 'absolute');

            $(parent).append(filled);

            //This adds a transparent color to the selected apartment spots. This is what it was like before the actual image was
            //used as a placeholder only with a green color (class of 'filled') instead of transparent ('empty').
            $('#' + e.target.id).addClass('empty');


            for (var x = 0; x < extra; x++) {
                selected.push((+e.target.id + x + 1));
                $('#' + (+e.target.id + x + 1)).addClass('empty');
            }


            Session.setPersistent('fachadaSelected', fachada);
            Session.setPersistent('msg', 'Selected: ' + selected);
            Session.setPersistent('selected', selected);
            Session.setPersistent('complete', true);
            console.log(Session.get('selected'))
        }
    },
    'click .reset': function (e, t) {
        //clean classes
        var selected = Session.get('selected');
        selected.forEach(function (item) {
            $('#' + item).removeClass('empty');
        });
        $("#filled-img").remove();
        $('#piso').removeClass('empty');
        Session.setPersistent('msg', '');
        Session.setPersistent('selected', []);
        Session.setPersistent('complete', false);
    }
});

Template.colocar.onRendered(function () {
    Meteor.call('getFloor', parseInt(Session.get('level')), function (error, result) {
        var data = result;
        data.Distribucion.Norte.forEach(function (tile, index, data) {
            var el = $('#' + tile.posicion);
            if (tile.estado === 'vacio') {
                el.addClass('empty');
            }
            if (tile.estado === 'bloqueado') {
                el.addClass('blocked');
            }
            if (tile.estado === 'reservado') {
                el.addClass('reserved');
            }
            if (tile.permitido[Session.get('tier')] === 'N' && tile.estado !== 'bloqueado' && tile.estado !== 'reservado' && tile.estado !== 'vacio') {
                el.addClass('forbidden-rule');
            }
            if (tile.permitido.A === 'N') {
                el.addClass('forbidden-A');
            }
            if (tile.permitido.B === 'N') {
                el.addClass('forbidden-B');
            }
            if (tile.permitido.C === 'N') {
                el.addClass('forbidden-C');
            }
            var extra = 0;
            switch (Session.get('tier')) {
                case 'A':
                    extra = 1;
                    break;
                case 'B':
                    extra = 2;
                    break;
                case 'C':
                    extra = 3;
                    break;
                default:
                    break;
            }

            for (var x = 0; x < extra; x++) {
                var nextItemIndex = +tile.posicion + x;
                if (nextItemIndex < 15) {
                    var impactedTile = data[nextItemIndex];
                    if (impactedTile.estado === 'vacio') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.estado === 'bloqueado') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.estado === 'reservado') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.permitido[Session.get('tier')] === 'N' && impactedTile.estado !== 'bloqueado' && impactedTile.estado !== 'reservado' && impactedTile.estado !== 'vacio') {
                        el.addClass('forbidden');
                    }
                } else {
                    el.addClass('forbidden');
                }
            }
            var first = 1;
            var last = 15;
            var extraindex = 0;

            if (+tile.posicion != first) {
                var continuar = true;
                var current = (+tile.posicion - 2);
                var espaciosIzq = 0;
                var evaluated;
                while (continuar) {
                    evaluated = data[current - extraindex];
                    if (evaluated.estado === 'vacio'
                        || evaluated.estado === 'bloqueado'
                        || evaluated.estado === 'reservado'
                    ) {
                        continuar = false;
                    } else {
                        espaciosIzq++;
                        current--;
                        if (+evaluated.posicion === first) {
                            continuar = false;
                        }
                    }
                }
            }
            if (espaciosIzq === 1) {
                el.addClass('forbidden-blocker');
            }
            if (espaciosIzq === 2) {

                if ($('#' + (+tile.posicion - 1)).hasClass('forbidden-A') || $('#' + (+tile.posicion - 2)).hasClass('forbidden-A')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
            if (espaciosIzq === 3) {
                if ($('#' + (+tile.posicion - 1)).hasClass('forbidden-B') || $('#' + (+tile.posicion - 2)).hasClass('forbidden-B') || $('#' + (+tile.posicion - 3)).hasClass('forbidden-B')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }

            var lastImpacted = +tile.posicion + extra;
            if (lastImpacted < last) {
                continuar = true;
                current = (lastImpacted);
                var espaciosDerecha = 0;
                while (continuar) {
                    evaluated = data[current - extraindex];
                    if (evaluated.estado === 'vacio'
                        || evaluated.estado === 'bloqueado'
                        || evaluated.estado === 'reservado'
                    ) {
                        continuar = false;
                    } else {
                        espaciosDerecha++;
                        current++;
                        if (+evaluated.posicion === last) {
                            continuar = false;
                        }
                    }
                }
            }
            if (espaciosDerecha === 1) {
                el.addClass('forbidden-blocker');
            }
            if (espaciosDerecha === 2) {
                if ($('#' + (+lastImpacted + 1)).hasClass('forbidden-A') || $('#' + (+lastImpacted + 2)).hasClass('forbidden-A')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
            if (espaciosDerecha === 3) {
                if ($('#' + (+lastImpacted + 1)).hasClass('forbidden-B') || $('#' + (+lastImpacted + 2)).hasClass('forbidden-B') || $('#' + (+lastImpacted + 3)).hasClass('forbidden-B')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
        });
        data.Distribucion.Sur.forEach(function (tile, index, data) {
            var el = $('#' + tile.posicion);
            if (tile.estado === 'vacio') {
                el.addClass('empty');
            }
            if (tile.estado === 'bloqueado') {
                el.addClass('blocked');
            }
            if (tile.estado === 'reservado') {
                el.addClass('reserved');
            }
            if (tile.permitido[Session.get('tier')] === 'N' && tile.estado !== 'bloqueado' && tile.estado !== 'reservado' && tile.estado !== 'vacio') {
                el.addClass('forbidden-rule');
            }
            if (tile.permitido.A === 'N') {
                el.addClass('forbidden-A');
            }
            if (tile.permitido.B === 'N') {
                el.addClass('forbidden-B');
            }
            if (tile.permitido.C === 'N') {
                el.addClass('forbidden-C');
            }
            var extra = 0;
            switch (Session.get('tier')) {
                case 'A':
                    extra = 1;
                    break;
                case 'B':
                    extra = 2;
                    break;
                case 'C':
                    extra = 3;
                    break;
                default:
                    break;
            }
            for (var x = 0; x < extra; x++) {
                var nextItemIndex = +tile.posicion + x;
                if (nextItemIndex < 30) {
                    var impactedTile = data[nextItemIndex - 15];
                    if (impactedTile.estado === 'vacio') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.estado === 'bloqueado') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.estado === 'reservado') {
                        el.addClass('forbidden');
                    }
                    if (impactedTile.permitido[Session.get('tier')] === 'N' && impactedTile.estado !== 'bloqueado' && impactedTile.estado !== 'reservado' && impactedTile.estado !== 'vacio') {
                        el.addClass('forbidden');
                    }
                } else {
                    el.addClass('forbidden');
                }
            }
            var first = 16;
            var last = 30;
            var extraindex = 15;

            if (+tile.posicion != first) {
                var continuar = true;
                var current = (+tile.posicion - 2);
                var espaciosIzq = 0;
                var evaluated;
                while (continuar) {
                    evaluated = data[current - extraindex];
                    if (evaluated.estado === 'vacio'
                        || evaluated.estado === 'bloqueado'
                        || evaluated.estado === 'reservado'
                    ) {
                        continuar = false;
                    } else {
                        espaciosIzq++;
                        current--;
                        if (+evaluated.posicion === first) {
                            continuar = false;
                        }
                    }
                }
            }
            if (espaciosIzq === 1) {
                el.addClass('forbidden-blocker');
            }
            if (espaciosIzq === 2) {

                if ($('#' + (+tile.posicion - 1)).hasClass('forbidden-A') || $('#' + (+tile.posicion - 2)).hasClass('forbidden-A')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
            if (espaciosIzq === 3) {
                if ($('#' + (+tile.posicion - 1)).hasClass('forbidden-B') || $('#' + (+tile.posicion - 2)).hasClass('forbidden-B') || $('#' + (+tile.posicion - 3)).hasClass('forbidden-B')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }

            var lastImpacted = +tile.posicion + extra;
            if (lastImpacted < last) {
                continuar = true;
                current = (lastImpacted);
                var espaciosDerecha = 0;
                while (continuar) {

                    evaluated = data[current - extraindex];
                    if (evaluated.estado === 'vacio'
                        || evaluated.estado === 'bloqueado'
                        || evaluated.estado === 'reservado'
                    ) {
                        continuar = false;
                    } else {
                        espaciosDerecha++;
                        current++;
                        if (+evaluated.posicion === last) {
                            continuar = false;
                        }
                    }
                }
            }
            if (espaciosDerecha === 1) {
                el.addClass('forbidden-blocker');
            }
            if (espaciosDerecha === 2) {
                if ($('#' + (+lastImpacted + 1)).hasClass('forbidden-A') || $('#' + (+lastImpacted + 2)).hasClass('forbidden-A')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
            if (espaciosDerecha === 3) {
                if ($('#' + (+lastImpacted + 1)).hasClass('forbidden-B') || $('#' + (+lastImpacted + 2)).hasClass('forbidden-B') || $('#' + (+lastImpacted + 3)).hasClass('forbidden-B')) {
                    el.addClass('forbidden-blocker-restriction');
                }
            }
        });
    });
    var piso = parseInt(Session.get('level'));
    var tipo = Session.get('tier');
    if (tipo === 'A') {
        if (piso > 2 && piso < 20) {
            $('#20').addClass('forbidden-start');
            $('#22').addClass('forbidden-start');
            $('#24').addClass('forbidden-start');

        }
        if (piso > 19 && piso < 23) {
            $('#24').addClass('forbidden-start');
        }
        if (piso > 22 && piso < 27) {
            $('#24').addClass('forbidden-start');
        }
    }
});