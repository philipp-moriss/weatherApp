import React, {KeyboardEvent, SetStateAction, Dispatch, useEffect, useLayoutEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {
    axsiosThunkWeatherGeolocationTC,
    axsiosThunkWeatherTC,
    StateType, updateErrorAC,
} from "./State/data.reducer";
import Weather from './components/Wether';
import ModalError from "./components/modalWindow/ModalError";


export type tempType = {

    feels_like: number;
    temp_min: number;
    name: string;
    Error: ""
}

function App() {
    useEffect(()=>{
        function success(pos:GeolocationPosition) {
            let crd = pos.coords;
            dispatch(axsiosThunkWeatherGeolocationTC(crd.latitude,crd.longitude))
        }
        function error(err:GeolocationPositionError) {
            dispatch(updateErrorAC(err.message))
        }
        window.navigator.geolocation.getCurrentPosition(success,error)
    },[])

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
        <>
        <Weather Data={Data} searchWeatherHandler={searchWeatherHandler} onKeyPressHandler={onKeyPressHandler}/>
        {Data.Error && <ModalError Error={Data.Error} />}
        </>
    );
}

export default App;
