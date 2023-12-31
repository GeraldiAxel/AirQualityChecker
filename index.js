import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_TOKEN = "fb53451ee89052f1ce893b7f8e408a0cdde9ff7b";

const BASE_URL = "https://api.waqi.info";

async function fetchDefaultCityData() {
    try {
        const response = await axios.get(BASE_URL + `/feed/jakarta/?token=${API_TOKEN}`);
        return {
            cityName: response.data.data.city.name,
            airQuality: response.data.data.aqi,
            weekly: response.data.data.forecast.daily.pm10,
            location: response.data.data.city.geo,
            cityForMap: 'jakarta'
        };
    } catch (error) {
        return {
            errorMessage: `The city "Jakarta" data is not available. Please try a different city.`,
        };
    }
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req, res) => {
    const defaultCityData = await fetchDefaultCityData();
    const dataToRender = {
        cityName: defaultCityData.cityName,
        airQuality: defaultCityData.airQuality,
        weekly: defaultCityData.weekly,
        cityForMap: defaultCityData.cityForMap,
        location: defaultCityData.location,
    };

    res.render("index.ejs", dataToRender);
});


app.post("/", async (req, res) => {
    try{
        const response = await axios.get(BASE_URL + `/feed/${req.body.city}/?token=${API_TOKEN}`);
        // console.log(response.data.data);
        res.render("index.ejs", {
            cityName: response.data.data.city.name,
            airQuality: response.data.data.aqi,
            weekly: response.data.data.forecast.daily.pm10,
            location: response.data.data.city.geo,
            cityForMap: req.body.city,
        });
    }catch(error){
        // console.log(error);
        const defaultCityData = await fetchDefaultCityData();
        const dataToRender = {
            cityName: defaultCityData.cityName,
            airQuality: defaultCityData.airQuality,
            weekly: defaultCityData.weekly,
            cityForMap: defaultCityData.cityForMap,
            location: defaultCityData.location,
        };
        res.status(404).render("index.ejs", {
            errorMessage: `The city "${req.body.city}" is not available. Please try a different city.`,
            dataToRender,
        })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});