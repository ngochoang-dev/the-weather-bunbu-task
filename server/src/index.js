const express = require('express');
const app = express();
const port = 5000;
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');

const Weather = require('./models/Weather');

db.connect();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.get('/forecast', (req, res) => {
    const { today, cityId } = req.query;
    Weather.find({ cityId: cityId }).sort({ date: 1 })
        .then((allData) => {
            let data = [];
            let index = allData.findIndex(x => x.date === today);
            allData.forEach((item, i) => {
                if (i >= index - 1 && i < index + 5) {
                    data.push(item)
                }
            })
            return data;
        })
        .then(data => {
            const newData = data.map(item => {
                const {
                    cityId,
                    temperature,
                    humidity,
                    description,
                    date,
                } = item;
                return {
                    cityId,
                    temperature,
                    humidity,
                    description,
                    date,
                }
            })
            res.json({
                data: newData
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        })
});

app.get('/forecast-detail', (req, res) => {
    const { today, cityId } = req.query;
    Weather.findOne({
        cityId: cityId,
        date: today,
    })
        .then(data => {
            console.log(data);
            res.json({
                data: data
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        })

})

app.post('/create-forecast', (req, res) => {
    const newForecast = new Weather({
        ...req.body
    })
    newForecast.save()
        .then(() => {
            res.json({
                name: 'asdasdasd'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});