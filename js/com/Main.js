
function Main(){
	this.main = document.getElementById('main');

	var header = new Header();

	var arr_secciones = new Array();
	arr_secciones.push(new Home());
	arr_secciones.push(new Registro());
	arr_secciones.push(new Reglas());
	arr_secciones.push(new ExitoRegistro());

	var actual = 0;

	arr_secciones[actual].animIn();

	var animando = false;
	var param;

	var sincronizador = new Sincronizador();

	Main.db = new DataBase();
	
	Main.alerta = new ToastMessage();
	$('body').append(Main.alerta.main);

	Main.loading = new Loading();
	$('body').append(Main.loading.main);


	Main.navegar = function(id, $param){
		if(!animando){
			animando = true;
			param = $param;
			
			header.set(id);

			arr_secciones[actual].animOut();
			actual = id;
			setTimeout(function(){
				arr_secciones[actual].animIn(param);
				animando = false;
			},500);

		}
	}


	Main.hayInternet = function(){

     		try{
            	var networkState = navigator.connection.type;
	        }catch(e){
				return true
	        }
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

           
            if(networkState == Connection.WIFI ||  networkState == Connection.CELL_3G || networkState == Connection.CELL_4G || networkState == Connection.WIFI){

 				return true

            }

        return false
    }


}