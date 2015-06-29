
function RegistroInput(input,$palabra, $max_caracteres){
	var self = this;
	var palabra = $palabra || "";

	var max_caracteres = $max_caracteres || 200;

	input.value = palabra;

	input.maxLength = max_caracteres;

	$(input).bind("focusout", onFocusOut);
	$(input).bind("focusin", onFocusIn);
	$(input).bind("keyup", onKeyUp);

	var color_vacio = '#666';
	var color_lleno = '#333';

	var es_fecha = false;
	var es_fecha_compra = false;
	var next_input;
	var salta = false;
	var rellena_ceros = false;
	var rellena_ceros_back = false;
	

	this.esNumerico = function(){
		$(input).numeric();
	}

	this.esFecha = function(){
		$(input).mask('99/99/9999',{placeholder:'DD/MM/AAAA'});
		es_fecha = true;
	}

	this.esFechaCompra = function(){
		$(input).mask('99/99/9999',{placeholder:'DD/MM/AAAA'});
		es_fecha = true;
		es_fecha_compra = true;
	}

	this.esMonto = function(){
		$(input).autoNumeric('init',{aSign:'$',wEmpty:'sign',mDec: '0'});
	}

	this.saltaNext = function($next_input){
		next_input = $next_input;
		salta = true;
	}

	this.rellenaCeros = function(){
		rellena_ceros = true;
	}

	this.rellenaCerosBack = function(){
		rellena_ceros = true;
		rellena_ceros_back = true;
	}


	/******* BOOLEAN ******/

	this.esVacio = function(){
		if(input.value.toUpperCase() == palabra.toUpperCase()){
			return true;
		}else{
			return input.value.replace(/(^\s*)|(\s*$)|[ ]/g, "").length == 0;	
		}
	}
	
	this.esMailValido = function(){
		return  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
	}
	
	this.setValor = function(txt){
		$(input).val(txt);
		$(input).css('color',color_lleno);
	}

	this.bloquear = function(valor){
		input.disabled = valor;
	}
	
	this.getValor = function(){
		if(es_fecha){
			var arr_fecha = $(input).val().split('/');
			arr_fecha[0] = completarCero(arr_fecha[0]);
			arr_fecha[1] = completarCero(arr_fecha[1]);

			return arr_fecha[2]+'-'+arr_fecha[1]+'-'+arr_fecha[0];
			
		}else{
			return $(input).val();	
		}
	}

	this.getInput = function(){
		return input;
	}

	this.vaciar = function(){
		input.value = palabra;
		if(!es_fecha){
			$(input).css('color',color_vacio);	
		}
		
	}

	this.hayError=function(){
		$(input).addClass('registro_input_error');
	}

	this.estaBien=function(){
		$(input).removeClass('registro_input_error');
	}

	this.estaLleno = function(){
		return input.value.length == max_caracteres;
	}

	this.esFechaValida = function(){
		var arr_fecha = $(input).val().split('/');

		var date = new Date();

		if(arr_fecha.length != 3){
			return false;
		}else if(parseInt(arr_fecha[0],10) > 31){
			return false;			
		}else if(parseInt(arr_fecha[1],10) > 12){
			return false;			
		}else if(parseInt(arr_fecha[2],10) > date.getFullYear() || parseInt(arr_fecha[2],10) < 1900){
			return false;			
		}else{
			return true;
		}
	}

	this.esFechaCompraValida = function(){
		var arr_fecha = $(input).val().split('/');
		return arr_fecha[2]+'-'+completarCero(arr_fecha[1])+'-'+completarCero(arr_fecha[0]) >= '2015-06-05';
	}

	this.esDiaValido = function(){
		if(self.esVacio()){
			return false;
		}else{
			input.value = completarCero(input.value);	
			return parseInt(input.value,10) <= 31 && parseInt(input.value,10) > 0;
		}
	}

	this.esMesValido = function(){
		if(self.esVacio()){
			return false;
		}else{
			input.value = completarCero(input.value);	
			return parseInt(input.value,10) <= 12 && parseInt(input.value,10) > 0;
		}
	}

	this.esAnoValido = function(){
		if(self.esVacio()){
			return false;
		}else{
			date = new Date();
			return parseInt(input.value,10) <= date.getFullYear() && parseInt(input.value,10) > 1900;
		}
	}



		
	function onFocusOut(e){
		if(self.esVacio()){
			$(input).css('color',color_vacio);
			input.value = palabra;
		}else if(rellena_ceros){
			input.value = completarCero(input.value, rellena_ceros_back);
		}
	}
	
	function onFocusIn(e){
		if(input.value.toUpperCase() == palabra.toUpperCase()){
			$(input).css('color',color_lleno);
			input.value = "";
		}
	}

	function onKeyUp(e){
		if(salta && input.value.length == max_caracteres){
			$(next_input).focus();
		}
	}

	function completarCero(valor,$back){
		var back = $back || false;
		if(parseInt(valor,10) < 10 && valor.length == 1){
			if(back){
				return valor+'0';	
			}else{
				return '0'+valor;
			}
			
		}else{
			return valor;
		}
	}

}