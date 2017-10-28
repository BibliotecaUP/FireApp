/*
var mongoose = require('mongoose'),
       Schema   = mongoose.Schema;

//Creo el modelo para la base de datos
var tempSchema = new Schema({
  sensor:   { type: String },
  fecha:    { type: Date, default: Date.now },
  temp:     { type: Number }
});

module.exports = mongoose.model('Temp', tempSchema);
*/


exports = module.exports = function(app, mongoose) {

	var tempSchema = new mongoose.Schema({
		sensor:   { type: String },
    fecha:    { type: Date, default: Date.now },
    temp:     { type: Number }
});

	mongoose.model('Temp', tempSchema);

};