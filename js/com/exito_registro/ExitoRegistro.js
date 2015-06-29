
function ExitoRegistro(){
	var self = this;
	this.main = document.getElementById('exito_registro');

	var tornado = document.getElementById('exito_registro_tornado');
	var logo = document.getElementById('exito_registro_logo');
	var texto1 = document.getElementById('exito_registro_texto1');
	var texto2 = document.getElementById('exito_registro_texto2');
	var inicio_btn = document.getElementById('exito_registro_inicio_btn');
	

	$(inicio_btn).bind(Main.touchstart, onClickInicioBtn);
		
	this.animIn = function(){
		$(self.main).css('display','block');

		//PRE
		$(tornado).transition({scale:0.1, opacity:1},0);
		$(logo).transition({scale:0.1, opacity:0},0);
		$(texto1).css('opacity',0);
		$(texto2).css('opacity',0);
		$(inicio_btn).transition({scale:0, opacity:0},0);
		

		//ANIM
		$(tornado).transition({scale:1,rotate:'360deg'},500,function(){
			$(tornado).addClass('rotar_loop');
		});
		$(logo).delay(400).transition({scale:1, opacity:1},300,'easeOutBack');
		$(texto1).delay(700).transition({'opacity':1},400);
		$(texto2).delay(700).transition({'opacity':1},400);

			
		$(inicio_btn).delay(800).transition({scale:1, opacity:1},300,'easeOutBack');
	
	}

	this.animOut = function(){
		$(tornado).removeClass('rotar_loop');
		$(tornado).transition({scale:2,opacity:0,rotate:'360deg'},500);
		
		$(logo).transition({scale:0, opacity:0},500);
		$(texto1).transition({'opacity':0},500);
		$(texto2).transition({'opacity':0},500);

		$(inicio_btn).transition({opacity:0},500,function(){
			$(self.main).css('display','none');
		});
	}


	function onClickInicioBtn(e){
		Main.navegar(0);
	}


}