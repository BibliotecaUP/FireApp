const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require('mongoose');
var async = require("async"); //agregado
app.use(bodyParser.json());

// Conecto con la base de datos
mongoose.Promise = global.Promise;//agregado
//mongoose.connect('mongodb://fire-app-luchocardozo86618404.codeanyapp.com/temp', function(err, res) {
/*mongoose.createConnection('mongodb://localhost/temp', function(err, res) {
  if(err) {
    console.log('ERROR: conectando a la Base de datos. ' + err);
  }
    console.log('Conectado a la Base de datos');
});
*/
mongoose.connect('mongodb://localhost/temp', {useMongoClient: true});//agregado
mongoose.connection.on('error', function(err) {//agregado
    console.log('Error de conexión a Mongo: ' + err);//agregado
});
mongoose.connection.on('open', function(err) {//agregado
    console.log('Conectado a Mongo!');//agregado
});


// Con bodyParser permitimos que pueda parsear JSON
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
// EL methodOverride() nos permite implementar y personalizar métodos HTTP
//app.use(methodOverride());


// Importo Modelo y Controlador
//  var models   = require('./models/model')(app, mongoose);
//  var TempCtrl = require('./Controllers/CTemps');

var tempSchema = mongoose.Schema({
		sensor:   { type: String },
    fecha:    { type: String },//{ type: Date, default: Date.now },
    temp:     { type: Number }
},
{
    timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
    
});

var TempModel = mongoose.model('Temp', tempSchema);


// Para declarar las rutas con app.route(nombre_de_la_ruta) seguido de los verbos .get(), .post(), etc…
// Podemos crear una instancia para ellas con express.Router()
//var router = express.Router();
//router.get('/', function(req, res) {
app.get('/', function(req, res) {
   res.send("Bienvenido al servidor de Temperatura");
});
//app.use(router);

  
// API routes, defino los endpoits
//var rtemps = express.Router();

// Endpoint para todas las temperaturas
//rtemps.route('/temps')
/*
app.route('/temps')
  .get(TempCtrl.findAllTemp)
  .post(TempCtrl.addTemp);
*/
//////////       ENDPOINTS   /////////////
// GET /temps - Devuelve todas las temperaturas del modelo
app.get('/temps', function (req, res) {
    //res.send();
    TempModel.find(function(err, TempModel) {
    	if(err) res.send(500, err.message);
			res.status(200).jsonp(TempModel);
			console.log('GET /temps')
    });
});

// GET /ahora - Devuelve la temperatura mas reciente del modelo
app.get('/ahora', function (req, res) {
		TempModel.find({}).sort({created_at: -1}).limit(1).exec(function(err, TempModel){
				if(err) res.send(500, err.message);
    		res.status(200).jsonp(TempModel);
				console.log('GET /ahora')
		});
});

// POST /temps - Almacena una temperatura
app.post('/temps', function (req, res) {
//var u1 = new User({name: 'Diego'});
	
  var tempo = new TempModel({
		sensor: req.body.sensor,
		fecha: req.body.fecha,
		temp: req.body.temp
	})
	/*
  temp.sensor = req.body.sensor
  temp.fecha = req.body.fecha
  temp.temp = req.body.temp
	*/
/*
  temp.save((err,tempStored) =>{
    if (err) res.status(500).send({message: "Error al salvar la base de datos: ${err} "})
    
    res.status(200).send({tem: tempStored})
  });
 */          
  tempo.save(function(err) {
    res.send(req.body);
		console.log("POST");
  });
  
  //Temp.save(req.body);
    //res.send(req.body);
   // console.log("POST");
});
// Endpoint para una temperatura
//rtemps.route('/temps/:id')
/*
app.route('/temps/:id')
  .get(TempCtrl.findById)
  .delete(TempCtrl.deleteTemp);

app.use('/api', rtemps);
*/
// Inicio el server
app.listen(3000, function() {
  console.log("Node server corriendo en http://localhost:3000");
  console.log("o en https://fire-app-luchocardozo86618404.codeanyapp.com/");
});