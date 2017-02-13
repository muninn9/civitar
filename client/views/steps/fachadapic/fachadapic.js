

Template.fachadapic.helpers({
    url: function(){
        return (Session.get('fachada') === 'Norte') ? '/img/F-Norte.jpg': '/img/F-Sur.jpg';
    },
    nombre: function(){
        return (Session.get('fachada') === 'Norte') ? 'Norte': 'Sur';

    }
});