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
    rain: { type: String, require: true },
    uv: { type: String, require: true },
    cloudCover: { type: String, require: true },
    hourly: { type: Array, require: true }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Weather', Weather);