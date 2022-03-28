const express = require('express');
const app = express();
const port = 5001;
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const dayjs = require('dayjs');

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
                if (i >= index - 1 && i < index + 8) {
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

app.post('/create-new-forecast', (req, res) => {
    const { cityName } = req.body;
    const dateArr = [1, 2, 3, 4, 5, 6, 7];
    const status = ['Cloudy', 'Clear sky']

    const days = dateArr.map(item => {
        const date = new Date();
        date.setDate(date.getDate() + item - 1);
        return dayjs(date).format('DD/M/YYYY')
    });
    const allData = days.map(day => {
        return {
            temperature: Math.round(Math.random() * 70),
            humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
            windSpeed: (Math.random() * 30).toFixed(2),
            description: status[Math.round(Math.random() * 1)],
            date: day,
        }
    });

    function reverse(string) {
        return string.split("/").reverse().join("/");
    }

    // fake forecast
    const lastDay = new Date(dayjs(reverse(allData[allData.length - 1].date)));
    const fisrtDay = new Date(dayjs(reverse(allData[0].date)));
    lastDay.setDate(lastDay.getDate() + 1);
    fisrtDay.setDate(fisrtDay.getDate() - 1);
    const data = [...allData]

    data.push({
        temperature: '70',
        humidity: '43',
        windSpeed: '22',
        description: 'Clear sky',
        date: dayjs(lastDay).format('DD/M/YYYY'),
    })
    data.unshift({
        temperature: '70',
        humidity: '43',
        windSpeed: '22',
        description: 'Clear sky',
        date: dayjs(fisrtDay).format('DD/M/YYYY'),
    });

    Promise.all([
        Weather.find().sort({ cityId: 1 }),
        Weather.findOne({ cityName }),
    ])
        .then(([allForecast, currentForecast]) => {
            if (currentForecast) {
                return res.status(400).json({
                    success: false,
                    message: "City name exsisted"
                })
            }
            const idOfCity = allForecast.length > 0 ? Number(allForecast[allForecast.length - 1].cityId) : 0;

            data.forEach(item => {
                new Weather({
                    cityId: idOfCity + 1,
                    cityName: cityName,
                    ...item,
                    date: reverse(item.date)
                }).save();
            })
            res.json({
                success: true,
                cityId: idOfCity + 1
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

app.get('/get-all-city', (req, res) => {
    Weather.find().sort({ cityId: 1 })
        .then(allData => {
            const result = allData.map(data => {
                return {
                    id: Number(data.cityId),
                    name: data.cityName,
                }
            });
            res.json({
                success: true,
                data: [...new Set(result.map(JSON.stringify))].map(JSON.parse)
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
