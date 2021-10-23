import React, {useState, KeyboardEvent} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {
    fetchThunkWeatherTC,
    StateType,
} from "./State/data.reducer";


export type tempType = {

    feels_like: number;
    temp_min: number;
    name: string;
    Error:""
}

function App() {


    const [value, setValue] = useState('')
    const Data = useSelector<RootReducerType,StateType>((state)=>state.Data)
    const dispatch = useDispatch()
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            searchWeatherHandler(e.currentTarget.value)
            setValue('')
        }
    }

    const searchWeatherHandler = (title: string) => {
        dispatch(fetchThunkWeatherTC(title))
    }
    const temperature = Math.floor(Data.tempMin)
    const temperatureFilsLike = Math.floor(Data.feelsLike)
    return (
        <div className={`wrapper ${Data.tempMin <= 0 ? "cold" : "hot"}`}>
            <div className={"leftSide"}>
                <div className={"temp"}>
                    <div>temperature now
                        <span>{temperature}</span></div>
                    <div>temperature fills like <span>{temperatureFilsLike}</span></div>
                </div>
            </div>
            <div className={"rightSide"}>
                <div className={"search"}>
                    <div><img alt={"weather"} className={"img"} src={Data.img}/></div>
                    <div className={"fomSearch"}>
                        <input
                            value={value}
                            onKeyPress={onKeyPressHandler}
                            onChange={(e) => setValue(e.currentTarget.value)}/>
                        <button onClick={() => searchWeatherHandler(value)}>search</button>
                    </div>
                    <div className={"errors"}>
                        <div>{Data.Error}</div>
                        <span>{Data.name}</span></div>
                </div>
            </div>
        </div>
    );
}

export default App;
