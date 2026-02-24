import NavigationBar from "~/components/ui/NavigationBar"
import {
    getIpInfo
} from "services/api";
import "./home.css"
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
type UserInfoType = {
    ip:string;
    loc:string;

}
export default function HomePage(){
    
    const [userIpInfo , setUserIpInfo ] = useState<UserInfoType>();

    useEffect(  () => {
        const fetchData = async () => {
            const response: AxiosResponse<UserInfoType> = await getIpInfo();

            setUserIpInfo(response.data);
                        
        };

        fetchData()
    },[])
    
    return (
      <div className="container">
        <NavigationBar/>
        <main>
            <p></p>
            <h1>IP Address: {userIpInfo?.ip} </h1>
            <h3>Location : {userIpInfo?.loc}</h3>
        </main>
      </div>
    )
}