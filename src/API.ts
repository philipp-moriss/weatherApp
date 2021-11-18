import axios from 'axios';

const configWether = {
    baseURL: 'https://api.openweathermap.org/data/2.5/',
};
const configIMG = {
    baseURL: "https://openweathermap.org/img/wn/",
};
const key: string = "31957e009d412dacba96adecca04b57c";
const axiosInstance = axios.create(configWether);
const axiosInstanceforIMG = axios.create(configIMG);

type GetWeatherType = {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number, lat: number };
    dt: number;
    id: number;
    main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, sea_level: number };
    name: string;
    rain: any;
    sys: {
        type: number;
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    };
    timezone: number;
    weather: Array<weatherType>
    visibility: number;
    wind: { speed: number, deg: number, gust: number }
}

type weatherType = {
    id: number, main: string, description: string, icon: string
}

const API = {
    searchWeatherByCiti: (citi: string) => {
        return axiosInstance.get<GetWeatherType>(`weather?q=${citi}&units=metric&appid=${key}`)
    },
    searchImgBYIcon: (icon: string) => {
        return axiosInstanceforIMG.get<weatherType>(`${icon}@2x.png`)
    },
    searchWeatherByGeolocation: (latitude: number,longitude : number) => {
        return axiosInstance.get<GetWeatherType>(`weather?lat=${latitude}&units=metric&lon=${longitude}&appid=${key}`)
    },
};


export default API;