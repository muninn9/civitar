Template.level.helpers({
    floors: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"],
    precio: function () {
        return Session.get('precio');
    },
    level: function(){
        return Session.get('level');
    },
    continuar: function(){
        return Session.get('levelContinue');
    }
});

Template.level.events({
    'change #level': function (evt) {
        var newValue = $(evt.target).val();
        var oldValue = Session.get('level');
        if (newValue != oldValue) {
            Meteor.call('getFloor', newValue.toString(), function (error, result) {

                Session.setPersistent('level', newValue);

                if(result.Estado === 'Disponible'){

                    Meteor.call('getPrice', Session.get('level'), Session.get('tier'), function(error, result){
                        Session.setPersistent('precio',result);
                        Session.setPersistent('levelContinue', true);
                    });

                }else{
                    Session.setPersistent('precio', 'No Disponible');
                    Session.setPersistent('levelContinue', false);
                }

            });
        }
    }
});

Template.level.onRendered(function () {

    var lvl = "2";

    Meteor.call('getFloor', lvl, function (error, result) {

        Session.setPersistent('level', lvl);

        if(result.Estado === 'Disponible'){

            Meteor.call('getPrice', Session.get('level'), Session.get('tier'), function(error, result){
                Session.setPersistent('precio',result);
                Session.setPersistent('levelContinue', true);
            });

        }else{
            Session.setPersistent('precio', 'No Disponible');
            Session.setPersistent('levelContinue', false);
        }

    });


    $("#slider-vertical").slider({
        orientation: "vertical",
        min: 2,
        max: 26,
        value: 2,
        slide: function (event, ui) {
            $("#level").val(ui.value);
            $('#level').trigger('change');
        }
    });
    $("#level").val($("#slider-vertical").slider("value"));

})
;