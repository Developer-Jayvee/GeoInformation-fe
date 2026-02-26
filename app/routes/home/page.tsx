import NavigationBar from "~/components/ui/NavigationBar"
import "./home.css"
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import MapContainer from "~/components/ui/MapContainer";
import {
    getIpInfo
} from "services/api";
import type {
    coordinatesTypes,
    UserInfoType
} from 'types/index'
type CoordinatesTypes = coordinatesTypes

export default function HomePage(){
    
    const [userIpInfo , setUserIpInfo ] = useState<UserInfoType>();
    const [coordinates , setCoordinates] = useState<CoordinatesTypes>({
        latitude:0,
        longitude:0
    });
    useEffect(  () => {
        const fetchData = async () => {
            const response: AxiosResponse<UserInfoType> = await getIpInfo();
            setUserIpInfo(response.data);
            let coord:string = response.data.loc;
            const currentCoordinates = coord.split(',');

            setCoordinates({
                longitude:parseFloat(currentCoordinates[0]),
                latitude:parseFloat(currentCoordinates[1])
            })
        };
        fetchData()
    },[])
    const handleCoordinates = (val : string , col : keyof CoordinatesTypes) => {
        setCoordinates( 
            (prev) => ({
                ...prev,
                [col]: val
            })
        )
    }
    return (
      <div className="container">
        <NavigationBar/>
        <main>
            <p></p>
            <h1>IP Address: {userIpInfo?.ip} </h1>
            <h2>Location : {userIpInfo?.country}</h2>
            <div className="input--group">
                <h4>Latitude :</h4>
                <input type="text" value={coordinates.latitude} onChange={ e => handleCoordinates(e.target.value , 'latitude')}/>
            </div>
            <div className="input--group">
                <h4>Longitude: </h4>
                <input type="text" value={coordinates.longitude} onChange={ e => handleCoordinates(e.target.value , 'longitude')}/>
            </div>
            <MapContainer latitude={coordinates.latitude} longitude={coordinates.longitude} handleCoordinates={ handleCoordinates}/>
        </main>
      </div>
    )
}