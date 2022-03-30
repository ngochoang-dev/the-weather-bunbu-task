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
    const { today, cityId, day } = req.query;
    const ids = JSON.parse(cityId)
    Weather.find({
        "cityId": {
            $in: ids
        }
    }).sort({ date: 1 })
        .then((allData) => {
            let data = [];
            const result = allData.sort((a, b) => {
                return Number(a.cityId) - Number(b.cityId)
            })
            ids.forEach(id => {
                let index = result.findIndex(x => {
                    return x.date === today && Number(x.cityId) === id
                });
                let arr = [];
                result.forEach((item, i) => {
                    if (id === Number(item.cityId)) {
                        if (i >= index - 1 && i < index + (Number(day) + 1) && id === Number(item.cityId)) {
                            arr.push(item);
                        }
                    }
                })
                data.push({
                    cityId: id,
                    data: arr
                })
            })
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
});

app.get('/forecast-detail', (req, res) => {
    const { today, cityId } = req.query;
    Weather.find({
        "cityId": {
            $in: JSON.parse(cityId)
        },
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

app.post('/create-new-forecast', (req, res) => {
    const { cityName } = req.body;
    const dateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const uvArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const status = ['Cloudy', 'Clear sky'];
    const restHour = 25 - dayjs().hour();

    const days = dateArr.map(item => {
        const date = new Date();
        date.setDate(date.getDate() + item - 1);
        return dayjs(date).format('DD/M/YYYY')
    });
    const allData = days.map(day => {
        const dataHourly = [];
        for (let i = 0; i < restHour; i++) {
            const currentHour = Number(dayjs().format('h'));
            const p = dayjs().format('a')
            const houryForecast = {
                temperature: Math.round(Math.random() * 70),
                humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
                windSpeed: (Math.random() * 30).toFixed(2),
                description: status[Math.round(Math.random() * 1)],
                date: day,
                hour: `${currentHour + i} ${p}`,
                uv: uvArr[Math.round(Math.random() * 10)],
                cloudCover: Math.floor(Math.random() * (100 - 20 + 1) + 20),
            }
            dataHourly.push(houryForecast)
        }
        return {
            temperature: Math.round(Math.random() * 70),
            humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
            windSpeed: (Math.random() * 30).toFixed(2),
            description: status[Math.round(Math.random() * 1)],
            date: day,
            hourly: dataHourly
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
        Weather.find(),
        Weather.findOne({ cityName }),
    ])
        .then(([allForecast, currentForecast]) => {
            if (currentForecast) {
                return res.status(400).json({
                    success: false,
                    message: "City name exsisted"
                })
            }
            const response = allForecast.sort((a, b) => {
                return Number(a.cityId) - Number(b.cityId)
            })
            const idOfCity = response.length > 0 ? Number(response[response.length - 1].cityId) : 0;

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

app.delete('/delete-city', (req, res) => {
    const { id } = req.query;
    Weather.deleteMany({ cityId: id })
        .then(() => res.status(200).json({
            success: true,
            message: 'deleted'
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra'
            })
        })
})

app.get('/today/hourly', (req, res) => {
    const { cityId, date } = req.query;
    const ids = JSON.parse(cityId)
    Weather.find({
        "cityId": {
            $in: ids
        },
        date
    })
        .then(data => {
            const newData = data.map(item => {
                let index = item.hourly.findIndex(x => x.hour === dayjs().format('h a'));
                return {
                    cityId: item.cityId,
                    cityName: item.cityName,
                    data: item.hourly.slice(index)
                }
            });
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
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
