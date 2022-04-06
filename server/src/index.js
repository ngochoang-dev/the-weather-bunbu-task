require('dotenv').config()
const express = require('express');
const app = express();
const port = 5001;
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const dayjs = require('dayjs');
const axios = require('axios');

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
    const ids = JSON.parse(cityId);

    Weather.find({
        "cityId": {
            $in: ids
        }
    })
        .sort({ date: 1 })
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


app.get('/forecast-monthly', (req, res) => {
    const { cityId } = req.query;
    const ids = JSON.parse(cityId);
    const month_year = dayjs().format('YYYY/M');
    const weekday =
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(`${month_year}/1`).getDay()];
    const dummyArr = [
        {
            name: 'Sun',
            number: 0,
        },
        {
            name: 'Mon',
            number: 1,
        },
        {
            name: 'Tue',
            number: 2,
        },
        {
            name: 'Wed',
            number: 3,
        },
        {
            name: 'Thu',
            number: 4,
        },
        {
            name: 'Fri',
            number: 5,
        },
        {
            name: 'Sat',
            number: 6,
        }
    ]
    const number = dummyArr.find(item => item.name === weekday).number;

    Weather.find({
        "cityId": {
            $in: ids
        }
    })
        .sort({ date: 1 })
        .then((allData) => {
            let data = [];
            const result = allData.sort((a, b) => {
                return Number(a.cityId) - Number(b.cityId)
            })
            ids.forEach(id => {
                let cityName;
                let index = result.findIndex(x => {
                    return x.date === `${month_year}/01` && Number(x.cityId) === id
                });
                let arr = [];
                result.forEach((item, i) => {
                    if (id === Number(item.cityId)) {
                        if (i >= index - number && i < (35 + index - number) && id === Number(item.cityId)) {
                            cityName = item.cityName
                            arr.push(item);
                        }
                    }
                })
                data.push({
                    cityId: id,
                    cityName: cityName,
                    data: arr
                })
            });
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


const handleGetTemplate = async (lat, long) => {
    const response =
        await axios.get(`${process.env.API_WEATHER}?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}&units=imperial`);
    return response.data.main
}

app.get('/forecast-detail', async (req, res) => {
    const { today, cityId } = req.query;
    const ids = JSON.parse(cityId);

    const latlong = [
        {
            lat: 21.030653,
            long: 105.847130
        },
        {
            lat: 16.047079,
            long: 108.206230
        },
        {
            lat: 10.762622,
            long: 106.660172
        }
    ]

    await ids.forEach(async (id, index) => {
        const { lat, long } = latlong[index];
        const { temp } = await handleGetTemplate(lat, long)
        Weather.findOneAndUpdate({
            cityId: id,
            date: today
        }, {
            temperature: Math.round(temp),
        })
            .then(result => console.log("result"))
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: 'Có lỗi xảy ra'
                })
            })
    })

    Weather.find({
        "cityId": {
            $in: ids
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
    const uvArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const status = ['Cloudy', 'Clear sky'];
    const restHour = 25 - dayjs().hour();
    const totalDays = dayjs().daysInMonth();
    const days = [];

    for (let i = 1; i < totalDays; i++) {
        let day = i;
        if (i < 10) {
            day = `0${i}`
        }
        const date = `${day}/${dayjs().format('M/YYYY')}`
        days.push(date)
    }

    const allData = days.map(day => {
        const dataHourly = [];
        for (let i = 0; i < restHour; i++) {
            const currentHour = Number(dayjs().format('H'));
            const hour = dayjs().hour(currentHour + i).format('h a');;
            const houryForecast = {
                temperature: Math.round(Math.random() * 70),
                humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
                windSpeed: (Math.random() * 30).toFixed(2),
                description: status[Math.round(Math.random() * 1)],
                date: day,
                hour: hour,
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
            uv: uvArr[Math.round(Math.random() * 10)],
            rain: Math.round(Math.random() * 70),
            cloudCover: Math.floor(Math.random() * (100 - 20 + 1) + 20),
            hourly: dataHourly
        }
    });

    function reverse(string) {
        return string.split("/").reverse().join("/");
    }

    // fake forecast
    const lastDay = new Date(dayjs(reverse(allData[allData.length - 1].date)));
    const fisrtDay = new Date(dayjs(reverse(allData[0].date)));
    const data = [...allData];

    for (let i = 1; i <= 10; i++) {
        const dataHourly = [];
        for (let i = 0; i < restHour; i++) {
            const currentHour = Number(dayjs().format('H'));
            const hour = dayjs().hour(currentHour + i).format('h a');;
            const houryForecast = {
                temperature: Math.round(Math.random() * 70),
                humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
                windSpeed: (Math.random() * 30).toFixed(2),
                description: status[Math.round(Math.random() * 1)],
                hour: hour,
                uv: uvArr[Math.round(Math.random() * 10)],
                cloudCover: Math.floor(Math.random() * (100 - 20 + 1) + 20),
            }
            dataHourly.push(houryForecast)
        }
        lastDay.setDate(lastDay.getDate() + 1);
        fisrtDay.setDate(fisrtDay.getDate() - 1);
        data.push({
            temperature: Math.round(Math.random() * 70),
            humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
            windSpeed: (Math.random() * 30).toFixed(2),
            description: status[Math.round(Math.random() * 1)],
            uv: uvArr[Math.round(Math.random() * 10)],
            rain: Math.round(Math.random() * 70),
            cloudCover: Math.floor(Math.random() * (100 - 20 + 1) + 20),
            date: dayjs(lastDay).format('DD/M/YYYY'),
            hourly: dataHourly
        })
        data.unshift({
            temperature: Math.round(Math.random() * 70),
            humidity: Math.floor(Math.random() * (45 - 20 + 1) + 20),
            windSpeed: (Math.random() * 30).toFixed(2),
            description: status[Math.round(Math.random() * 1)],
            uv: uvArr[Math.round(Math.random() * 10)],
            rain: Math.round(Math.random() * 70),
            cloudCover: Math.floor(Math.random() * (100 - 20 + 1) + 20),
            date: dayjs(fisrtDay).format('DD/M/YYYY'),
            hourly: dataHourly
        });
    }

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

console.log('gg');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

