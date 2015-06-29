
function Reglas(){
	var self = this;
	this.main = document.getElementById('reglas');

	var placa = document.getElementById('reglas_placa');

	var regresar_btn = document.getElementById('reglas_regresar_btn');

	$(this.main).css({'display':'block','top':-1000});

	$(document).ready(function(){
		var myScroll = new IScroll('#reglas_holder_texto', {  mouseWheel: true, scrollY: true, interactiveScrollbars: true, scrollbars: "custom", bounce:false });	
		$(self.main).css({'display':'none','top':0});
	});
	
	$(regresar_btn).bind(Main.touchstart, onClickRegresarBtn);

	this.animIn = function($desde_registro){
		var desde_registro = $desde_registro || false;

		if(desde_registro){
			$(regresar_btn).css('display','block');
		}else{
			$(regresar_btn).css('display','none');
		}

		$(self.main).css('display','block');

		//PRE
		$(placa).transition({y:50, opacity:0},0);

		//ANIM
		$(placa).transition({y:0, opacity:1},500,'easeOutBack');

	}

	this.animOut = function(){
		$(placa).transition({opacity:0},500, function(){
			$(self.main).css('display','none');
		});	
	}

	function onClickRegresarBtn(e){
		Main.navegar(1,null);
	}
}