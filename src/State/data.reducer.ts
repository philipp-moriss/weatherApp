import {Dispatch} from "redux";
import API from "../API";

export type StateType = {

    feelsLike: number;
    tempMin: number;
    name: string;
    Error: "" | string;
    img: string;
    loading: LoadingType;
}

type LoadingType = "loading" | "successes"

export type ActionType =
    UpdateDataACType
    | UpdateErrorACType
    | UpdateDataNameACType
    | UpdateImgACType
    | UpdateLoadingACType


const initialState: StateType = {
    tempMin: 0,
    feelsLike: 0,
    name: 'Enter citi',
    Error: '',
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA5FBMVEVPXXP////gmV5GUGK6gVEzQFVIUmXg4eRJWG9BUWo7TGY9TmdDU2tIV25GVW1NW3HmnF1CWXRJW3SLk6BZZnpTYXbV2Ny+wsn29/imrLbu7/FmcYRLV2uZoKtgbIDO0dZ2gJCAiZjd3+O1dj6xtr66iGSVnKjp6u2wtb66vsagp7HZll/MjFe4fEltd4k+SVx+b22XeWrJj2LPqYzDk2z06+XbwKzn1cirgWeNdWtxam+lf2jTlGDDjGNgY3FpZ3C0hmV0Z2iScV1ygJTWt6B3ZWFXV2HQrJBWV2KUb1accVDPy8kBivqQAAAOBUlEQVR4nNWdaXfbthKGSTOyCW6wREnUvtiKZMuy5KRbkmZrb2/v9v//z+WmxRJIDEAARN5POT21wyczwAyAwcAwpau36kaL/jicbYeTdsfotCfD7Swc9xdRd9WT/9cbMn/5oPu43HYCF3mB79sYYyNT/Cfb9wMPuUFnu3zsDmR+hCzCwXS9TdD8AxZZGPsJ6HY9lYUpg3AQhW2E/HK0M9CYsxNGMihFE/am44nj2Sx0R0rkTJZTwR8klrA3nXso4KE7oQxCsZACCRM8uwLdXjYK5gIhRRHeLQMheHtIe70S9GViCKOJ6wvDy+S720jItwkgHPQ9r8rYKxL2vL6AjKAy4SpEgQS8TAEKKztrRcLV3BHtnq/lO/OKjJUIV3NX3OxSJNutxliBcDB35POljM68QrLDTdgbK7DfgdEdc885vISPtrz5haTAflRKeDNBSvkSocmNOsKxKyP+0YTdsSLCqaHWQY8KDI58lZ0wdOowYCbshNIJ7zp1GTBT0LmTS9ivZQSeCrt9iYS9oVczXyJvyBQbWQi7troYXybb7soh7Nc4xbwWdh5kEM7UB/lioZlwwt5E7iqJVf4EOhiBhDeaDMGjbBuYxMEIp0iXIXgURrAEB0T46NSNQ5QDWm5ACBd6AsaICzGED7oCxoiAqEEn7Lt1c5QIkMJRCfv6WjCRQ0WkET7obMFELs1RKYSazqKncimb/+WEkf6AsaOWI5YSdn8EwBixdKlRRrjSYTUIESrbFC8h7Bn6pWpkYVyShpcQTnRLtotlD3kI5yzLJdxqtZqZWq0aTB/M2Qn78AVvzNZ+effh7Zf3n99/efvh4yfcVE6JCiN/ESF4Gm01jZfvn28TXSVK//T+90+tplrIwgm1gHAArPdptV7eXuVsp7q9ffrwqdmSTHUq7BecwBUQDkGzTNN4R8LbQ35+UclYNNuQCdeQSNhq/X5VhJdDxozqfBWt4YSgQdh8eSrnSxm/fG1KR9vLJQ5FIiEg1LfwWzpf6qvvlCHiDpQwpEfC5jeAAfdmpBRgipNPOpkiEE7pS8LmRyhfgvj0VdWE4xC23wiE9NLJ5jsGwETfFCFiDCFcUg8Im78zAl7dflKEGCzphHdUH2W2oEoruhcHqBeEbZqPMo3Bo76qmW5wm0b4SEu4W5+4AK8+KzIiOt8IPyekZmv4iQvw6va7orholxOOadNMExboSYgvaqwYrMsIB7RppvXCCxhLCWA82QxKCOc0J21y+mhqxA9q/NSeFxPeUE3IHAlfIX5TM586N4WEVBMaFfhifVFkxFkRId2EPLH+1IiKguKrsH9KSB+F1UyoLGK8MuIJ4Yq27q00kWaIitZRzopIGFJN+KUi4NXtRzUx8XQ6PRIOaHszuFPVhFe37xUlNicnGUfCPi2dafGl3Ac9PW02GyV88Wp/TCCkbq81v/MTPm3epHr+Q1UCfklIXVTw5zM5Xao/m+kF4ETZ5WBJhF50QTik/V34K5cJn458z8/392//sewvomjanUbRor+ctT3Xk3HGhYfnhNRozxcrNid0b3769ZfLc77e3WOIJVC6N2eES+oOIkdCszngPf/02y8XcEetHmeB4Bt+/n7HZk9Ir09vfWAkPPDd//xbCd3eltFW7C3N4DXhlH5a2HzLxPd0sN9f0ErQ1dgXaMh96WJOSF9VMGY0++jw5lcgXmbIB0NYJfI+r8kIe4Df23zPbEBGvlTiroyh3gnhFHCaxkC4ycffX8x8iUTdqvKmJ4QAJ2UgzA34c9nsWaaboRBXzd00I4Q4BnQc5h56z+6gRz0IqboOjoSAmTRJSxkAn9/wGjDTqi1gNKLugZC6S5oItguVDcH7nyrxJZpX99RgfCCcQHwCtHjaVPfQvaqX7uLJnnAA+l2tP+iEAgHjsVMZ0RnkhBGsBvGaSpiNwXtAjgZDrDrfpEuohJC6QZPJ+awWMA4bFRHtMCfswH6PS0u9RQOa5l216SY9TIwJB8Bf4/2znFDkGNyr4lhEg5QQkrIlGu1KtzE2EgDjNLXSXYEkcYsJ18DgOnLLtqLSQfhcPQ6ea1zFUf11SrgFDmdslcWL1Ee/CAc0zVmFDQ68TQnB/0hWyWya+Wi1VI2sXpV6epQQrsCefm0VzzWpj4oehJkANVqFclcxISjtTjWy3CIjbtLlkhRAUJ1dkdA0JnwAZ/HYKjSiNB9N1ONfZwQPMSEwo0lkWQ55kZiakG9FD1HEPZ/GWY1B3+w+amRZfxONmI5CaYCADfki4WFMCMzZ0v/fstw/CYgbedNMpi7vZIM7psE0GV8nfnqJmMZCiYDwmH0hr2fAg4WRGtGyLnI36SaMjcg7Et2VwfazsRGtv4kTqVRA4DYEQahrAJe/uRIj7s5nm8SE/5JMyDudepEBD4epEiPu/rhwUmmx8CDOqB88GNCVxV5WasVzJ5WRcr8WZ2ITrI0lY+o+ShH//Tn31M1GYkZ6Ks65xl8aDClNpsRPY8akzvRwwivfSWH78peyQ2PGPEmlhJbz8Vh+8Cw3GGZiNkUqPDM4YmmGuLP+87w/oBe5+1Qktkn/QLg1OFI+nCFa7t//TegU9MZPRK1fJn/r0Jjw/Fhuxcb2f2roUlHvSRA1Mdo8P5YG/saMrxklryCHnJdqGx2eH4vHYmOrlg9QeEcUJ59hB2KabbMIuq8rhNHbKppeTkUv2yLz8YxDh6tValXBDgHP1eaZSyntUqSJi3DCEQ9d4U9QAMUzDuN4yExYGyDLjtKRcMucl7q8Xaerq43YK27jvJQxofUur6Eq0+PDcj5BbI+gxGsLtvUhLmkEo0a9bn+I4KvheH3ItsZ3pT7NBNVq7UG/Ol7jL1gIPYber1LVWwPtGCyY9tourxHXp8EcFB69iGm/FNgxVJEiSC0K6rLseetkwkSrNn2WdFcs5xaopmytWPTmxl6P5ewpqGFBQRGtF1Jy9gQ/m7PZu/ZLV49in/T8EJzUeFrNM7lW5RNlegYMPrhw9HPSWItSxPQcH1qLkVTf6KhtmQ+mtRjQcOHXsrCnq3RzI62ngdZEedrFilxlu4yIpa4NsTy5oFIlRszr2kCV+qnBNVWxiYI1S30p0mLhRNJjIUBeXwqsEdZjaUhS8ZlNXiMMzNv09dLCM5u0CR+8Vt9VfU4BV9EV30OtPmwRrO1cGuc1BXPl4b4FbLtc23hYPFce7szAzh7PO0xppIJrGdmKPSWkX1U3zjv3aKUe2QmzC+vw+4fGrl6MEhUQZttK8DukRkPbcFEQEE/ukMLixQ7yqkstIo/DfE8iv8sNcdPr2nf0i0SeS9HpXW6Qm460dVNyDUPeNiInhLjpaFfjuVOpiBeH9htn8L4YBrYa9UGUakf63LO+GPSunrGsHePzkYrUbZC+dt/lc08IWQZfWzstt9uWJBsG+22lPSFkP2pk7eY1QZRqd0342MNiD94nKq1ma2i4wFg0CITHvc8DIWQJlZQH6+enljW6/FR02esLUq0ysqyddvvC651FcD9CvzZQ6V9sw4ZmQXHVsKzLD/WPSz2GvomZEa2GXiHj684iDMOTjUGW3peZEfVCDHekYXh6EMjSv9TI658b+qz217GPEpy0oH8pqMw4vW3RmKsmKVA/ASSYsKAHLaxENathH2mxzBgngAQTvtr4ZOwFfajT12EwzlJAignP+nlDthVHOWKn5kPvqbVLvoMwkZb084YV/OeIVmNYI+MqMyDJR8t6sgPvpewRd42vi3qSuLt5Y5d9AymdKeurD+xzskdMr80sVJ9n3K07ez5SRlr+NgJsJXy8+ZQw7hrXs+Ui6t4o0HQxnu0OeERA2vsWgHbCma4t65Ry11Cj+G86+XtJgNQ3SsD3p0ZW7SJ9adajrZQQfjPlmv4NMkVa2JNOOXneezr8e9XIeE12Nch7T6bJ8kxaTb5awAd8s4uxpw8eqbbkNWmCyQR8d4396jseja7VaDQqczDo23mg9w91FCbDkP7jD/Ie97kY3rA018J6TisUyzuk0LdktRLbW7Lg94D1EbYLljmV33TWRaxvOjO9y62DUOGNrJK31UV1f1chnrfVTXPy48w29sWKAkTYU/aOb1VhXLKZUkJo3vwoQxGV7d6WEQroqK1EhdMondCMfgRESgOEckLzUX9E2vV5CqH5UKkXswK5tKvJNEIBDfylyqGen1AJ9UakAwIIzYW+iA6gIBRAqO9040B6dEAIdQ0asD45IEKzK/hRNBHCwAsgMEJzhXVLw20MPGgHEpo9+tV3pfIn0JNLKKFpznTKwxH88gecUKfACAiDPITmNNBjMNoBSwEBC6E5EPMgWkWhIdNdTyZC01w7dYcN7DJW8jASmnedejeogs4d/SMrEZpmWKMZscPefYSd0JwadZkxMDhqlDgIxb0yySbscvWt4CI0byZCnmBk4kMTvtIkPsJ4uYHVumqAea8h8xLGgcNVF/9tl78smZ8w6ZimhtF25hX6OVQgjIfjTIEdbbdaz+lKhHECMJNsR9uZsYZ4sYTx2jhk6ETJKh+FlWs7KxPG43GNpMQOjNBYQD8VAYSxRL/8Hst3t2LaVIghjCed0PPEjUgb2WNR9x1EEcaKZkgIpI28ucAaeYGEptmL5gFbm99zYR8F4VRoebxQwkTT8cTxmFs2p3S250yWwm84CCeMNYjCNkJMNUfY91AnjGS0opJBmGgwXW89BwVUa2I/QI63XU9lNdqSRZhq0F2Ew47nIi/wfRsfajviP9m+H3jI9TrDcNGV2kVMKmGm3qobLfrjcLYdTtodo9OeDLezcNxfRN2Vgis3/wc6TUBgx1e5pgAAAABJRU5ErkJggg==',
    loading: "successes"
}


export const DataReducer = (state = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "UPDATE-DATA": {
            return {...state, ...action}
        }
        case "UPDATE-ERROR":
        case "UPDATE-NAME":
        case "UPDATE-LOADING":
        case "UPDATE-IMG": {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}

export type UpdateDataACType = ReturnType<typeof updateDataAC>
export const updateDataAC = (tempMin: number, feelsLike: number, name: string,) => {
    return {
        type: "UPDATE-DATA",
        tempMin,
        feelsLike,
        name
    } as const
}

export type UpdateDataNameACType = ReturnType<typeof updateDataNameAC>
export const updateDataNameAC = (name: string) => {
    return {
        type: "UPDATE-NAME",
        payload: {name}
    } as const
}


export type UpdateErrorACType = ReturnType<typeof updateErrorAC>
export const updateErrorAC = (Error: string) => {
    return {
        type: "UPDATE-ERROR",
        payload: {Error},
    } as const
}


export type UpdateImgACType = ReturnType<typeof updateImgAC>
export const updateImgAC = (img: string) => {
    return {
        type: "UPDATE-IMG",
        payload: {img},
    } as const
}


export type UpdateLoadingACType = ReturnType<typeof updateLoadingAC>
export const updateLoadingAC = (loading: LoadingType) => {
    return {
        type: "UPDATE-LOADING",
        payload: {loading},
    } as const
}


export const axsiosThunkWeatherTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(updateLoadingAC("loading"))
    API.searchWeatherByCiti(title)
        .then(({data}) => {
            const {main, weather, name} = data
            let {temp_min, feels_like} = main
            temp_min = Math.floor(temp_min)
            feels_like = Math.floor(feels_like)
            dispatch(updateDataAC(temp_min, feels_like, name))
            dispatch(updateErrorAC(''))
            return weather
        })
        .then((resp) => {
            const {icon} = resp[0]
            switch (icon) {
                case '01d':{
                    dispatch(updateImgAC("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLtPVHNeIipOAc238W5jjjFM9IFPjVbTscQ&usqp=CAU"))
                    dispatch(updateLoadingAC("successes"))
                    break
                }
                case '04d': {
                    dispatch(updateImgAC("https://st4.depositphotos.com/38837296/39705/v/450/depositphotos_397057922-stock-illustration-weather-icon-vector-weather-concept.jpg"))
                    dispatch(updateLoadingAC("successes"))
                    break
                }
                case '03n': {
                    dispatch(updateImgAC("https://icon-library.com/images/partly-cloudy-weather-icon/partly-cloudy-weather-icon-24.jpg"))
                    dispatch(updateLoadingAC("successes"))
                    break
                }
                default: {
                    API.searchImgBYIcon(icon)
                        .then(resp => {
                            const img = resp.request.responseURL
                            dispatch(updateImgAC(img))
                            dispatch(updateLoadingAC("successes"))
                        })
                        .catch(rej => {
                            dispatch(updateDataNameAC(''))
                            dispatch(updateErrorAC(rej))
                            dispatch(updateLoadingAC("successes"))
                        })
                }
            }
        })
        .catch((rej) => {
            const {message} = rej
            dispatch(updateErrorAC(message))
            dispatch(updateLoadingAC("successes"))
        })

}

export const axsiosThunkWeatherGeolocationTC = (latitude: number,longitude : number) => (dispatch: Dispatch) =>{
    dispatch(updateLoadingAC("loading"))
    API.searchWeatherByGeolocation(latitude,longitude)
        .then(({data}) => {
            const {main,name} = data
            let {temp_min, feels_like} = main
            temp_min = Math.floor(temp_min)
            feels_like = Math.floor(feels_like)
            dispatch(updateDataAC(temp_min, feels_like, name))
            dispatch(updateErrorAC(''))
            dispatch(updateLoadingAC("successes"))
        })
        .catch((rej) => {
            const {message} = rej
            dispatch(updateErrorAC(message))
            dispatch(updateLoadingAC("successes"))
        })
}
