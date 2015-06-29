
function HeaderBtn(id,div){

	$(div).bind('click', onClickDiv);

	var selected = false;

	this.seleccionar = function(){
		selected = true;
		$(div).addClass('header_btn_selected');		
	}

	this.deseleccionar = function(){
		selected = false;
		$(div).removeClass('header_btn_selected');		
	}

	function onClickDiv(e){
		if(!selected){
			if(id == 1){
				Main.navegar(1,false);
			}else{
				Main.navegar(id);		
			}	
			
		}
	}

}