import React, {Dispatch, KeyboardEvent, SetStateAction, useState} from "react";

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { StateType } from "../State/dataTool.reducer";


function Weather(props: WeatherPropsType) {
    const [value, setValue] = useState('')


    const Louder = props.Data.loading === "loading" && <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
            <LinearProgress color="secondary"/>
        </Stack>
    return (
        <div className={`wrapper ${props.Data.tempMin <= 0 && props.Data.feelsLike <= 0  ? "cold" : "hot" }`}>
            <div className={"leftSide"}>
                <div className={"temp"}>
                    <div>temperature now
                        <span>{props.Data.tempMin}</span></div>
                    <div>temperature fills like <span>{props.Data.feelsLike}</span></div>
                </div>
            </div>
            <div className={"rightSide"}>
                <div className={"search"}>
                    <div><img alt={"weather"} className={"img"} src={props.Data.img}/></div>
                    <div className={"fomSearch"}>
                        {Louder}
                        <input
                            value={value}
                            onKeyPress={(e) => {
                                props.onKeyPressHandler(e, setValue)
                            }}
                            placeholder={"Enter country"}
                            onChange={(e) => setValue(e.currentTarget.value)}
                            disabled={props.Data.loading === "loading"}
                        />
                        <button
                            onClick={() => {
                                props.searchWeatherHandler(value)
                            }}
                            disabled={props.Data.loading === "loading"}
                        >search</button>
                    </div>
                    <div className={"errors"}>
                        <span>{props.Data.name}</span></div>
                </div>
            </div>
        </div>
    )
}


type WeatherPropsType = {
    Data: StateType;
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string>>) => void;
    searchWeatherHandler: (value: string) => void;
}


export default Weather;