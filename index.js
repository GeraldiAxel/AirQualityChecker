import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_TOKEN = "fb53451ee89052f1ce893b7f8e408a0cdde9ff7b";

const BASE_URL = "https://api.waqi.info";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/map", (req, res) => {
    res.render("maps.ejs");
});

app.post("/", async (req, res) => {
    try{
        const response = await axios.get(BASE_URL + `/feed/${req.body.city}/?token=${API_TOKEN}`);
        console.log(response.data.data.forecast.daily.pm10);
        res.render("index.ejs", {
            cityName: response.data.data.city.name,
            airQuality: response.data.data.aqi,
        })
    }catch(error){
        res.render("index.ejs", {
            errorMessage: `The city "${req.body.city}" data is not available. Please try a different city.`,
        })
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});