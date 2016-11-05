app
.controller('listaController', function($scope, $rootScope, $http, $window, constantes) {
    $scope.lista = [];
    $scope.filtro = "";
    $scope.mostraLista = true;

    $scope.recuperarLista = function(lista){
    	$http.get(constantes.REST_SERVER + '/pasta', {
                params: {p : lista}
            }
        ).then(function(response) {
                $scope.lista = response.data;
                $scope.filtro = "";
	       }
    	);
    };

    $scope.reproduzir = function(lista){
        $scope.mostraLista = false;
        topo();
        $rootScope.$emit("carregarPlaylist", { playlist: lista });
    };

    $scope.recuperarLista();
});