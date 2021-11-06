import React, {KeyboardEvent, SetStateAction, Dispatch} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {
    axsiosThunkWeatherTC,
    StateType,
} from "./State/data.reducer";
import Weather from './components/Wether';


export type tempType = {

    feels_like: number;
    temp_min: number;
    name: string;
    Error: ""
}

function App() {

    const Data = useSelector<RootReducerType, StateType>((state) => state.Data)
    const dispatch = useDispatch()
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>,setValue: Dispatch<SetStateAction<string>>) => {
        if (e.code === "Enter") {
            searchWeatherHandler(e.currentTarget.value)
            setValue('')
        }
    }
    const searchWeatherHandler = (title: string) => {
        dispatch(axsiosThunkWeatherTC(title))
    }

    return (
        <Weather Data={Data} searchWeatherHandler={searchWeatherHandler} onKeyPressHandler={onKeyPressHandler}/>
    );
}

export default App;
