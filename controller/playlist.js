// funcoes auxiliares
function getIndex(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].name == value) return i;
  }
}

/* ANGULAR */
app
.controller('playlistControler',  function($scope, $http, $rootScope, public, constantes) {
    $scope.mostraPlaylist = false;
    $scope.public = public;
    $scope.selectedTrack = 0;
    
    $scope.carregarPlaylist = function(){
        $http.get(constantes.REST_SERVER + '/playlist', { params: {p : $scope.playlist} })
        .then(function(response) {
            public.setTracks(response.data);
            public.setIndexTrack(0);
            $rootScope.$emit("reproduzirPlaylist", { });
        });
    }

    $rootScope.$on("carregarPlaylist", function(obj, params){
       $scope.playlist = params.playlist;
       $scope.carregarPlaylist();
       $scope.mostraPlaylist = true;
    });

    $rootScope.$on("selecionarFaixa", function(obj, params){
       $scope.selectedTrack = params.idx;
    });

    $scope.reproduzirFaixa = function(track){
        $scope.selectedTrack = getIndex(public.getTracks(), track.name);
        $rootScope.$emit("reproduzirFaixa", { track : track});
    }

    $scope.dragControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {return true;},//override to determine drag is allowed or not. default is true.
        itemMoved: function (event) {/*Do what you want*/},
        orderChanged: function(event) {/*Do what you want*/}
    };

    $scope.dragControlListeners1 = {
    };
});