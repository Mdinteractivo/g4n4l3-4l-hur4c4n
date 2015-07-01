
function DataBase(){
	var db = window.openDatabase('ganale_huracan', '1.0','Esta es la base de datos',10*1024*1024);

	db.transaction(crearDB);

	
	this.guardarParticipacion = function(data){
		db.transaction(function(tx){
			tx.executeSql('INSERT INTO participaciones (nombre, apellido, telefono, email, pueblo, fecha_compra, total, lugar, recibe_info) VALUES (?,?,?,?,?,?,?,?,?)', [data.usuario.nombre,data.usuario.apellido,data.usuario.telefono,data.usuario.email,data.usuario.pueblo,data.fecha_compra,data.total,data.lugar,data.usuario.recibe_info], onSuccess, onError);
		});			
	}

	this.getParticipacionesSinSincronizar = function(callback){
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM participaciones WHERE sincronizado = "0"' , [],
				function (tx, resultado) {
						console.log(resultado);
						callback(resultado.rows);
    			}, onError);
		});
	}

	this.updateParticipacionesSincronizadas = function(){
		db.transaction(function (tx) {
			tx.executeSql('UPDATE participaciones SET sincronizado = 1', [], onSuccess, onError);
		});
	}
		
	function crearDB(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS "participaciones" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "nombre" VARCHAR,"apellido" VARCHAR,"telefono" VARCHAR,"email" VARCHAR,"pueblo" VARCHAR,"fecha_compra" VARCHAR, "total" VARCHAR,"lugar" VARCHAR,"recibe_info" INTEGER,"sincronizado" INTEGER DEFAULT(0))', [], onSuccess, onError);
	}

	function onSuccess(tx,resultado){
		console.log(resultado);
	}

	function onError(error){
		console.log(error);
	}

	this.rellenar = function(){
		db.transaction(function(tx){
			for(var i=0; i < 6; i++){
				tx.executeSql('INSERT INTO participaciones (nombre, apellido, telefono, email, pueblo, fecha_compra, total, lugar, recibe_info) VALUES (?,?,?,?,?,?,?,?,?)', ['Humberto'+Math.floor(Math.random()*3000),'Perez','1234567890','humberto@gmail.com','San Juan','2015-07-14','$'+i+'.99','Tienda de mou',1], onSuccess, onError);	
			}
			
		});	
	}

}

