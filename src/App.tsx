import React, {Dispatch, KeyboardEvent, SetStateAction, useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";

import Weather from './components/Wether';
import ModalError from "./components/modalWindow/ModalError";
import {axsiosThunkWeatherGeolocationTC, axsiosThunkWeatherTC, ErrorAc, StateType} from './State/dataTool.reducer';
import {RootState} from "./store/storeTool";


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
            dispatch(axsiosThunkWeatherGeolocationTC({longitude:crd.longitude, latitude: crd.latitude}))
        }
        function error(err:GeolocationPositionError) {
            dispatch(ErrorAc({Error: err.message}))
        }
        window.navigator.geolocation.getCurrentPosition(success,error)
    },[])

    const Data = useSelector<RootState, StateType>((state) => state.Data)
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
