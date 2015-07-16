
function Registro(){
	var self = this;
	this.main = document.getElementById('registro');

	var texto = document.getElementById('registro_texto');
	var factura_textos = document.getElementById('registro_factura_textos');
	var holder_inputs_usuario = document.getElementById('registro_holder_inputs_usuario');
	var holder_checkboxs = document.getElementById('registro_holder_checkboxs');

	var input_nombre = new RegistroInput($(this.main).find('.registro_input')[0],null,50);
	var input_apellido = new RegistroInput($(this.main).find('.registro_input')[1],null,50);
	
	var input_tel1 = new RegistroInput($(this.main).find('.registro_input')[2],null,3);
	input_tel1.esNumerico();
	input_tel1.saltaNext($(this.main).find('.registro_input')[3]);
	
	var input_tel2 = new RegistroInput($(this.main).find('.registro_input')[3],null,3);
	input_tel2.esNumerico();
	input_tel2.saltaNext($(this.main).find('.registro_input')[4]);
	
	var input_tel3 = new RegistroInput($(this.main).find('.registro_input')[4],null,4);
	input_tel3.esNumerico();
	
	var input_email = new RegistroInput($(this.main).find('.registro_input')[5],null,200);
	var input_pueblo = new RegistroInput($(this.main).find('.registro_input')[6],null,150);
	
	var input_dia = new RegistroInput($(this.main).find('.registro_input')[7],'Día',2);
	input_dia.esNumerico();
	input_dia.rellenaCeros();
	input_dia.saltaNext($(this.main).find('.registro_input')[8]);
	
	var input_mes = new RegistroInput($(this.main).find('.registro_input')[8],'Mes',2);
	input_mes.esNumerico();
	input_mes.rellenaCeros();
	input_mes.saltaNext($(this.main).find('.registro_input')[9]);
	
	var input_ano = new RegistroInput($(this.main).find('.registro_input')[9],'Año',4);
	input_ano.esNumerico();
	
	var input_cantidad_entero = new RegistroInput($(this.main).find('.registro_input')[10],'$00',50);
	input_cantidad_entero.esMonto();
	
	var input_cantidad_decimal = new RegistroInput($(this.main).find('.registro_input')[11],null,2);
	input_cantidad_decimal.esNumerico();
	input_cantidad_decimal.rellenaCerosBack();

	var input_lugar = new RegistroInput($(this.main).find('.registro_input')[12],null,200);
	
	var check_tyc = $(this.main).find('.registro_checbox')[0];
	var check_recibe_info = $(this.main).find('.registro_checbox')[1];
	
	var tyc_btn = document.getElementById('registro_tyc_btn');

	var continuar_btn = $(this.main).find('.registro_continuar_btn')[0];

	
	$(tyc_btn).bind(Main.touchstart, onClickTYCBtn);
	$(continuar_btn).bind(Main.touchstart, onClickContinuarBtn);

	this.animIn = function($existe_usuario){
		if($existe_usuario != null){
		
			resetInputs();
			
			$(self.main).removeClass('registro_existe_usuario');
			$(texto).css('display','block');
			$(factura_textos).css('display','none');
			$(holder_inputs_usuario).css('display','block');
			$(holder_checkboxs).css('display','block');
			$(continuar_btn).removeClass('registro_factura_continuar_btn');

			Main.usuario = new Usuario();
			Main.usuario.uid = 0;
						
		}	

		//PRE
		$(self.main).css({'display':'block','opacity':0});
		$(self.main).transition({y:50},0);

		//ANIM
		$(self.main).transition({opacity:1, y:0},500,'easeOutBack');
	}

	this.animOut = function(){
		$(self.main).transition({opacity:0},500, function(){
			$(self.main).css('display','none');	
		});
	}

	function onClickContinuarBtn(e){
		
		var todo_bien = true;
		
		
		if(input_nombre.esVacio()){
			todo_bien = false;
			input_nombre.hayError();
		}else{
			input_nombre.estaBien();
		}

		if(input_apellido.esVacio()){
			todo_bien = false;
			input_apellido.hayError();
		}else{
			input_apellido.estaBien();
		}

		if(input_tel1.esVacio() || !input_tel1.estaLleno() || input_tel2.esVacio() || !input_tel2.estaLleno() || input_tel3.esVacio() || !input_tel3.estaLleno()){
			todo_bien = false;
			input_tel1.hayError();
			input_tel2.hayError();
			input_tel3.hayError();
		}else{
			input_tel1.estaBien();
			input_tel2.estaBien();
			input_tel3.estaBien();
		}

		/*if(input_email.esVacio() || !input_email.esMailValido()){
			todo_bien = false;
			input_email.hayError();
		}else{
			input_email.estaBien();
		}*/

		if(input_pueblo.esVacio()){
			todo_bien = false;
			input_pueblo.hayError();
		}else{
			input_pueblo.estaBien();
		}

		

		var fecha = input_ano.getValor()+'-'+input_mes.getValor()+'-'+input_dia.getValor();
		if(!input_dia.esDiaValido() || !input_mes.esMesValido() || !input_ano.esAnoValido() || fecha < '2015-07-13' || fecha > '2015-09-20'){
			todo_bien = false;
			input_dia.hayError();
			input_mes.hayError();
			input_ano.hayError();
		}else{
			input_dia.estaBien()
			input_mes.estaBien()
			input_ano.estaBien()
		}

		if(input_cantidad_entero.esVacio() || input_cantidad_decimal.esVacio()){
			esta_bien = false;
			input_cantidad_entero.hayError();
			input_cantidad_decimal.hayError();
		}else{
			input_cantidad_entero.estaBien();
			input_cantidad_decimal.estaBien();
		}

		if(input_lugar.esVacio()){
			todo_bien = false;
			input_lugar.hayError();
		}else{
			input_lugar.estaBien();
		}

		if(!todo_bien){
			Main.alerta.mostrar('Hay campos con errores');
		}else if(!check_tyc.checked){
			Main.alerta.mostrar("Debes aceptar los términos y condiciones para continuar");
		}else{
			var data = new Object();

			
			Main.usuario.nombre = input_nombre.getValor();
			Main.usuario.apellido = input_apellido.getValor();
			Main.usuario.telefono = input_tel1.getValor()+input_tel2.getValor()+input_tel3.getValor();
			Main.usuario.email = input_email.getValor();
			Main.usuario.pueblo = input_pueblo.getValor();
			if(check_recibe_info.checked){
				Main.usuario.recibe_info = 1;
			}else{
				Main.usuario.recibe_info = 0;
			}
			

			data.usuario = Main.usuario;

			data.fecha_compra = fecha;
			data.total = input_cantidad_entero.getValor()+'.'+input_cantidad_decimal.getValor();
			data.lugar = input_lugar.getValor();
			
			Main.db.guardarParticipacion(data);

			Main.navegar(3);
		}
	}

	function onClickTYCBtn(e){
		Main.navegar(2, true);
	}

	function resetInputs(){
		input_nombre.vaciar();
		input_nombre.estaBien();
		input_apellido.vaciar();
		input_apellido.estaBien();
		input_tel1.vaciar();
		input_tel1.estaBien();
		input_tel2.vaciar();
		input_tel2.estaBien();
		input_tel3.vaciar();
		input_tel3.estaBien();
		input_email.vaciar();
		input_email.estaBien();
		input_pueblo.vaciar();
		input_pueblo.estaBien();
		
		input_dia.vaciar();
		input_dia.estaBien();
		input_mes.vaciar();
		input_mes.estaBien();
		input_ano.vaciar();
		input_ano.estaBien();
		input_cantidad_entero.vaciar();
		input_cantidad_entero.estaBien();
		input_cantidad_decimal.setValor('00');
		input_cantidad_decimal.estaBien();
		input_lugar.vaciar();
		input_lugar.estaBien();
		
		check_tyc.checked = false;
		check_recibe_info.checked = false;
	}

}