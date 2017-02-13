Template.tierpreview.helpers({
    url: function(){
        return Session.get('tierpreviewpic');
    },
    nombre: function(){
        return Session.get('tiertitle');
    }
});

