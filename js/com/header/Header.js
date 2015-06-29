
function Header(){
	this.main = document.getElementById('header');

	var holder_btns = document.getElementById('header_holder_btns');
		
	var burger_btn = document.getElementById('header_burger_btn');
	var cerrar_btn = document.getElementById('header_cerrar_btn');

	var cant_btns = $(this.main).find('.header_btn').length;
	var arr_btns = new Array();

	for(var i=0; i < cant_btns; i++){
		arr_btns[i] = new HeaderBtn(i, $(this.main).find('.header_btn')[i]);
	}

	var actual = 0;
	arr_btns[actual].seleccionar();


	$(burger_btn).bind(Main.touchstart, onClickBurgerBtn);
	$(cerrar_btn).bind(Main.touchstart, onClickCerrarBtn);


	this.set = function(id){
		arr_btns[actual].deseleccionar();
		if(id < arr_btns.length){
			actual = id;	
			arr_btns[actual].seleccionar();
		}

		$(holder_btns).removeClass('header_holder_btns_abierto');	
	}


	function onClickBurgerBtn(e){
		$(holder_btns).addClass('header_holder_btns_abierto');
	}

	function onClickCerrarBtn(e){
		$(holder_btns).removeClass('header_holder_btns_abierto');	
	}
	

}