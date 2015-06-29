
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


	function checkUsuarioFB(uid, access_token){
		Main.loading.mostrar();
		$.ajax({
			url:'api/existe-usuario-fb/',
			type:'post',
			cache:false,
			data:'uid='+uid+'&access_token='+access_token,
			success: onCheckUsuarioFB
		})
	}

	function onCheckUsuarioFB(data){
		Main.loading.ocultar();
		if(data.error == 0){
			
			if(data.resultado == 1){
				Main.usuario = data.usuario;
				Main.navegar(1,true);
			}else{
				Main.usuario = new Usuario();
				Main.usuario.uid = data.uid;
				Main.usuario.nombre = data.nombre;
				Main.usuario.apellido = data.apellido;
				Main.navegar(1,false);
			}
		}
	}


}