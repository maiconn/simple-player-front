app
.controller('playerController', function($scope, $rootScope, $http, $window, public, constantes) {
    $scope.trackTitle = "";
    $scope.playing = true,
    $scope.trackCount = 0;
    $scope.aleatorio = false;

    $scope.btnPrevClick = function () {
                if($scope.aleatorio){
                    var idx = public.proximaAleatoria();
                    $scope.loadTrack(idx);
                } else if ((public.getIndexTrack() - 1) > -1) {
                    public.setIndexTrack(public.getIndexTrack()-1);
                    $scope.loadTrack(public.getIndexTrack());
                } else {
                    $scope.audio.pause();
                    public.setIndexTrack(0);
                    $scope.loadTrack(public.getIndexTrack());
                }
                if ($scope.playing) {
                    $scope.audio.play();
                }
    };

    $scope.btnNextClick = function () {
                if($scope.aleatorio){
                    var idx = public.proximaAleatoria();
                    $scope.loadTrack(idx);
                } else if((public.getIndexTrack() + 1) < $scope.trackCount) {
                    public.setIndexTrack(public.getIndexTrack()+1);
                    $scope.loadTrack(public.getIndexTrack());
                } else {
                    $scope.audio.pause();
                    public.setIndexTrack(0);
                    $scope.loadTrack(public.getIndexTrack());
                }
                if ($scope.playing) {
                    $scope.audio.play();
                }
    };

    $scope.audio = 
             $('#audio1').bind('play', function () {
                $scope.playing = true;
            }).bind('pause', function () {
                $scope.playing = false;                
            }).bind('ended', function () {
                if($scope.aleatorio){
                    $scope.loadTrack($scope.proximaAleatoria());
                } else if ((public.getIndexTrack() + 1) < $scope.trackCount) {
                    public.setIndexTrack(public.getIndexTrack()+1)
                    $scope.loadTrack(public.getIndexTrack());
                } else {
                    $scope.loadTrack(0);
                }
                $scope.audio.play();
            }).get(0);

    $scope.loadTrack = function($index){
        $scope.indexTrack = $index;
        $scope.trackTitle = public.getTracks()[$index].name;
        $scope.audio.src = public.getTracks()[$index].file;
        $rootScope.$emit("selecionarFaixa", { idx : $index});
    }    

    $scope.playTrack = function(track){
        var idx = getIndex(public.getTracks(), track.name)
        $scope.loadTrack(idx);
        $scope.audio.play();
    }


    $rootScope.$on("reproduzirPlaylist", function(obj, params){
        $scope.trackCount = public.getTracks().length;
        $scope.playTrack(public.getTracks()[0])
    }); 

    $rootScope.$on("reproduzirFaixa", function(obj, params){
        $scope.playTrack(params.track)
    }); 
});