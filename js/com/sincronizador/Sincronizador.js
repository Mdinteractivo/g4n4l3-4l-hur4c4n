
function Sincronizador(){
	this.main = document.getElementById('sincronizador');

	var holder = document.getElementById('sincronizador_holder');
	var div_sincronizando = document.getElementById('sicronizador_sincronizando');


	var sincronizar_btn = document.getElementById('sincronizador_sincronizar_btn');
	var salir_btn = document.getElementById('sincronizador_salir_btn');

	$(this.main).bind(Main.touchstart, onTouchstartThis);
	$(this.main).bind(Main.touchend, onTouchendThis);
	$(sincronizar_btn).bind(Main.touchstart, onTouchstartSincronizarBtn);
	$(salir_btn).bind(Main.touchstart, onTouchstartSalirBtn);

	var abierto = false;
	var espero = false;
	var timeout;
	var sincronizando = false;

	var req;

	function onTouchstartThis(e){
		espero = false;
		if(!abierto){
			timeout = setTimeout(function(){
				espero = true;
			},1000)
		}
	}

	function onTouchendThis(e){
		try{	
			 clearTimeout(timeout);
		}catch(e){

		}

		if(espero){
			abierto = true;
			$(holder).css('display','block');
		}
	}

	function onTouchstartSincronizarBtn(e){
		if(Main.hayInternet()){
			Main.db.getParticipacionesSinSincronizar(onGetParticipaciones);	
		}else{
			Main.alerta.mostrar("No hay conexión a Internet.");
		}
		
	}

	function onGetParticipaciones(data){
		sincronizando = true;
		$(sincronizar_btn).css('display','none');
		$(div_sincronizando).css('display','block');
		$(salir_btn).html('Detener');

		req = $.ajax({
			url:Main.SERVER+'api/sincronizar-participaciones/',
			type:'post',
			cache:false,
			data:'data='+json_encode(data),
			success:onSincronizoParticipaciones,
			error:onErrorSincronizoParticipacines
		});
	}

	function onSincronizoParticipaciones(data){
		if(parseInt(data.resultado,10) == 1){
			Main.alerta.mostrar("Sincronización exitosa.");
			Main.db.updateParticipacionesSincronizadas();
		}else{
			Main.alerta.mostrar("Ocurrio un error. Intentalo nuevamente.");
		}

		resetear();
	}

	function onErrorSincronizoParticipacines(){
		Main.alerta.mostrar("Ocurrio un error. Intentalo nuevamente.");
		resetear();
	}

	function resetear(){
		$(salir_btn).html('Salir');
		$(sincronizar_btn).css('display','block');
		$(div_sincronizando).css('display','none');
		sincronizando = false;
	}

	function onTouchstartSalirBtn(e){
		if(!sincronizando){
			abierto = false;
			$(holder).css('display','none');
		}else{
			if(req && req.readystate != 4){
	            req.abort();
	        }
		}

		resetear();
	}
	
}