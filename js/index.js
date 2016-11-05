const SERVER_URL = "192.168.0.3",
      REST_SERVER = "http://"+SERVER_URL+":8080/api/pasta";
angular.module('listaApp', [])
.controller('listaController', function($scope, $http, $window) {
    $scope.lista = [];
    $scope.filtro = "";

    $scope.recuperarLista = function(lista){
    	$http.get(REST_SERVER, {
                params: {p : lista}
            }
        ).then(function(response) {
                $scope.lista = response.data;
                $scope.filtro = "";
	       }
    	);
    };

    $scope.reproduzir = function(lista){
        $window.location.href = 'player.html#?playlist=' + encodeURIComponent(lista);
    };

    $scope.recuperarLista('musicas');
});