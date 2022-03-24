const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Weather = new Schema({
    cityId: { type: String, require: true },
    cityName: { type: String, require: true },
    temperature: { type: String, require: true },
    humidity: { type: Number, require: true },
    windSpeed: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: String, require: true },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Weather', Weather);