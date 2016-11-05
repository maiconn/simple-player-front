
const SERVER_URL = "192.168.0.3",
      REST_SERVER = "http://"+SERVER_URL+":8080/api/playlist",
      MUSICAS_SERVER = "http://"+SERVER_URL+":8090/";

// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// funcoes auxiliares
function getIndex(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].name == value) return i;
  }
}

/* ANGULAR */
angular.module('playerApp', ['ngRoute'])
.controller('playerController', ['$scope','$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    $scope.playlist = $location.search().playlist;
    $scope.tracks = [];
    $scope.trackTitle = "";
    $scope.statusReproducao = "Pausado...";
    $scope.indexTrack = 0;
    $scope.playing = true,
    $scope.trackCount = 0;
    $scope.aleatorio = false;
    $scope.audio = 
             $('#audio1').bind('play', function () {
                $scope.playing = true;
                $scope.statusReproducao = 'Reproduzindo...';
                $scope.$apply();
               
            }).bind('pause', function () {
                $scope.playing = false;
                $scope.statusReproducao = 'Pausado...';
                $scope.$apply();
                
            }).bind('ended', function () {
                $scope.statusReproducao = 'Pausado...';
                $scope.$apply();
               
                if($scope.aleatorio){
                    var idx = $scope.proximaAleatoria();
                    $scope.loadTrack($scope.tracks[idx]);
                    $scope.audio.play();
                } else if (($scope.indexTrack + 1) < $scope.trackCount) {
                    $scope.indexTrack++;
                    $scope.loadTrack($scope.tracks[$scope.indexTrack]);
                    $scope.audio.play();
                } else {
                    $scope.audio.pause();
                    $scope.indexTrack = 0;
                    loadTrack($scope.tracks[$scope.indexTrack]);
                }
            }).get(0);

    $scope.loadTrack = function($index){
        $('.plSel').removeClass('plSel');
        $('#plList li:eq(' + $index + ')').addClass('plSel');
        $scope.indexTrack = $index;
        $scope.trackTitle = $scope.tracks[$index].name;
        $scope.audio.src = MUSICAS_SERVER + $scope.tracks[$index].file;
    }    

    $scope.playTrack = function(track){
        $scope.loadTrack(getIndex($scope.tracks, track.name));
        $scope.audio.play();
    }

    $scope.carregarPlaylist = function(){
        $scope.playlist = $location.search().playlist
        $http.get(REST_SERVER, { params: {p : $scope.playlist} })
        .then(function(response) {
            $scope.tracks = response.data;
            $scope.trackCount = $scope.tracks.length;
            $scope.playTrack($scope.tracks[0]);
        });
    }

    $scope.aleatorioOnOf = function(){
        $scope.aleatorio = !$scope.aleatorio;
    }

    $scope.proximaAleatoria = function(){
        return Math.floor((Math.random() * $scope.tracks.length) + 0);
    }

    $scope.btnPrev = $('#btnPrev').click(function () {
                if($scope.aleatorio){
                    var idx = $scope.proximaAleatoria();
                    $scope.loadTrack(idx);
                } else if (($scope.indexTrack - 1) > -1) {
                    $scope.indexTrack--;
                    $scope.loadTrack($scope.indexTrack);
                    
                } else {
                    $scope.audio.pause();
                    $scope.indexTrack = 0;
                    $scope.loadTrack($scope.indexTrack);
                }
                if ($scope.playing) {
                    $scope.audio.play();
                }
            });
    $scope.btnNext = 
            $('#btnNext').click(function () {
                if($scope.aleatorio){
                    var idx = $scope.proximaAleatoria();
                    $scope.loadTrack(idx);
                } else if(($scope.indexTrack + 1) < $scope.trackCount) {
                    $scope.indexTrack++;
                    $scope.loadTrack($scope.indexTrack);
                } else {
                    $scope.audio.pause();
                    $scope.indexTrack = 0;
                    $scope.loadTrack($scope.indexTrack);
                }
                if ($scope.playing) {
                        $scope.audio.play();
                    }
            });

    $scope.carregarPlaylist();
}]);