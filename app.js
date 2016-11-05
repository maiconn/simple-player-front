var app = angular.module('app', ['ui.router', 'as.sortable']);

const URL = "simpleplayer.ddns.net";
app.constant('constantes', {
    SERVER_URL: URL,
    REST_SERVER: "http://"+ URL +":8080/api"
});

app.service('public', function () {
        var indexTrack = 0;
        var tracks = [];

        return {
            getIndexTrack: function () {
                return indexTrack;
            },
            setIndexTrack: function(value) {
                indexTrack = value;
            },

            getTracks: function () {
                return tracks;
            },
            setTracks: function(value) {
                tracks = value;
            },


            proximaAleatoria: function(){
                return Math.floor((Math.random() * tracks.length) + 0);
            }
        };
});


app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('player', {
            url: '/player',
            templateUrl: 'partial/player.html',
            controller: 'playerController'
        })

        
        .state('playlist', {
            url: '/playlist',
            templateUrl: 'partial/playlist.html',
            controller: 'playlistController'
        })

        .state('lista', {
            url: '/lista',
            templateUrl: 'partial/lista.html',
            controller: 'listaController'
        });
        
});
function topo(){
    $('html, body').animate({ scrollTop: 0 }, 'fast');
}
