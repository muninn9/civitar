Template.tier.events({
    'click .a': function() {
        Session.setPersistent('tier', 'A');
        Session.setPersistent('tierpreviewpic', 'img/aptos/a1.jpg');
        Session.setPersistent('layout', 1);
        Session.setPersistent('tiertitle', '40M²');
        Router.go('/tierpreview');
    },
    'click .b': function() {
        Session.setPersistent('tier', 'B');
        Session.setPersistent('tierpreviewpic', 'img/aptos/b1.jpg');
        Session.setPersistent('layout', 1);
        Session.setPersistent('tiertitle', '60M²');
        Router.go('/tierpreview');
    },
    'click .c': function() {
        Session.setPersistent('tier', 'C');
        Session.setPersistent('tierpreviewpic', 'img/aptos/c1.jpg');
        Session.setPersistent('layout', 1);
        Session.setPersistent('tiertitle', '80M²');
        Router.go('/tierpreview');
    },
    'click .a2': function() {
        Session.setPersistent('tier', 'A');
        Session.setPersistent('tierpreviewpic', 'img/aptos/a2.jpg');
        Session.setPersistent('layout', 2);
        Session.setPersistent('tiertitle', '40M²');
        Router.go('/tierpreview');
    },
    'click .b2': function() {
        Session.setPersistent('tier', 'B');
        Session.setPersistent('tierpreviewpic', 'img/aptos/b2.jpg');
        Session.setPersistent('layout', 2);
        Session.setPersistent('tiertitle', '60M²');
        Router.go('/tierpreview');
    },
    'click .c2': function() {
        Session.setPersistent('tier', 'C');
        Session.setPersistent('tierpreviewpic', 'img/aptos/c2.jpg');
        Session.setPersistent('layout', 2);
        Session.setPersistent('tiertitle', '80M²');
        Router.go('/tierpreview');
    }
});