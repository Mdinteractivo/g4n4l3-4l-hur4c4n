
function Home(){
	var self = this;
	this.main = document.getElementById('home');

	var tornado = document.getElementById('home_tornado');
	var circulo = document.getElementById('home_circulo');
	var generador = document.getElementById('home_generador');
	var participa = document.getElementById('home_participa');
	var texto1 = document.getElementById('home_texto1');
	var texto2 = document.getElementById('home_texto2');

	var aqui_btn = document.getElementById('home_aqui_btn');

	$(aqui_btn).bind(Main.touchstart, onClickAquiBtn);
		
	this.animIn = function(){
		$(self.main).css('display','block');

		//PRE
		$(tornado).transition({scale:0.1,opacity:1},0);
		$(circulo).transition({scale:0.1, opacity:0},0);
		$(generador).transition({x:-30, y:-15, opacity:0},0);
		$(participa).transition({opacity:0, x:50},0);
		$(texto1).transition({opacity:0, x:50},0);
		$(texto2).transition({opacity:0, x:50},0);


		//ANIM
		$(tornado).transition({scale:1,rotate:'360deg'},500,function(){
			$(tornado).addClass('rotar_loop');
		});

		$(circulo).delay(400).transition({scale:1, opacity:1},300,'easeOutBack');
		$(generador).delay(700).transition({x:0, y:0, opacity:1},300);

		$(participa).delay(800).transition({opacity:1, x:0},300);
		$(texto1).delay(800).transition({opacity:1, x:0},300);
		$(texto2).delay(800).transition({opacity:1, x:0},300);


	}

	this.animOut = function(){
		$(tornado).removeClass('rotar_loop');
		$(tornado).transition({scale:2,opacity:0,rotate:'360deg'},500);
		$(circulo).transition({scale:0, opacity:0},500);
		$(generador).transition({opacity:0},500);
		$(participa).transition({opacity:0},500);
		$(texto1).transition({opacity:0},500);
		$(texto2).transition({opacity:0},500, function(){
			$(self.main).css('display','none');
		});
	}

	function onClickAquiBtn(e){
		Main.navegar(1,false);
	}
}