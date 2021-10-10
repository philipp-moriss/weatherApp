import axios from 'axios';

const configWether = {
    baseURL: 'https://api.openweathermap.org/data/2.5/',
};
const configIMG = {
    baseURL: "https://openweathermap.org/img/wn/",
};
const key:string = "31957e009d412dacba96adecca04b57c";
const axiosInstance = axios.create(configWether);
const axiosInstanceforIMG = axios.create(configIMG);

const API = {
    searchWeatherByCiti: (citi: string) => {
        return axiosInstance.get(`weather?q=${citi}&units=metric&appid=${key}`)
    },
    searchImgBYIcon:(icon:string)=>{
        return axiosInstanceforIMG.get(`${icon}@2x.png`)
    }
};


export default API;