
function AlphaBtnRef(div){
	var self = this;
	this.main = div;
	$(this.main).css({'cursor':'pointer'});
		
	$(this.main).bind("mouseenter", onMouseEnterThis);
	$(this.main).bind("mouseleave", onMouseLeaveThis);
	
	var boton_mode = true;

	var rollover = true;


	function onMouseEnterThis(e){
		if(boton_mode && rollover){
			$(self.main).stop();
			$(self.main).clearQueue();
			$(self.main).animate({'opacity':0.8},200);	
		}
	}
	
	function onMouseLeaveThis(e){
		if(boton_mode  && rollover){
			$(self.main).stop();
			$(self.main).clearQueue();
			$(self.main).animate({'opacity':1},200);
		}
	}
	
	this.botonMode = function(valor){
		boton_mode = valor;
		if(boton_mode){
			$(self.main).css('display','block');
		}else{
			$(self.main).css('display','none');
		}
	}

	this.setRollOver = function(valor){
		rollover = valor;
		$(self.main).css('opacity',1);
	}

}