const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true
  },
  slika: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    required: true
  },
  polazak: {
    type: Date,
    required: true
  },
  povratak: {
    type: Date,
    required: true
  },
  ucesnici: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('travel', travelSchema);