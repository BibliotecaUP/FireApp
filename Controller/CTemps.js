var mongoose = require('mongoose');
// var models   = require('./models/model')(app, mongoose);
var Temp  = mongoose.model('Temp');

//GET - Devuelve todas las temperaturas en la BD
exports.findAllTemp = function(req, res) {
	Temp.find(function(err, temperaturas) {
    if(err) res.send(500, err.message);

    console.log('GET /temperaturas')
		res.status(200).jsonp(temperaturas);
	});
};

//GET - Devuelve una temperatura especifca con un ID
exports.findById = function(req, res) {
	Temp.findById(req.params.id, function(err, temperatura) {
    if(err) return res.send(500, err.message);

    console.log('GET /temperatura/' + req.params.id);
		res.status(200).jsonp(temperatura);
	});
};


//POST - Inserta una nueva Temperatura en la BD
exports.addTemp = function(req, res) {
	console.log('POST');
	console.log(req.body);

  //Creo un nuevo objeto temperatura siguiendo el patrón del modelo, tomando los valores del cuerpo de la petición
	var temperatura = new Temp({
    sensor:   req.body.sensor,
    fecha:    req.body.fecha,
    temp:     req.body.temp
	});

  //Guardo en la BD y envio la respuesta
	/*
	temperatura.save(function(err, temperatura) {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(temperatura);
	});
	*/
	
	 temperatura.save(function (err) { //agregado
   		if (err) return handleError(err);
		 res.status(200).jsonp(temperatura);
		});
};


//DELETE - Eliminar una Temperatura con un ID especifico
exports.deleteTemp = function(req, res) {
	Temp.findById(req.params.id, function(err, temperatura) {
		Temp.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};



