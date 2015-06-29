function ToastMessage(){
	
	var self = this
	this.main  = document.createElement('div');
	this.main.id = 'ToastMessage'



	this.mostrar = function($msg){
		
		$(self.main).html($msg)
		$(self.main).show();
		$(self.main).animate({'opacity':1},500)
		
		setTimeout(function(){

			self.ocultar()
		}, 2500)
	}
	
	this.ocultar = function(){
		
		$(self.main).animate({'opacity':0},500,function(){
			$(self.main).hide()
		})
	}
}