import axios from "axios";

type AXIOSConfigType = {
    apiUrl? : string;
    headers?: Record<string,string>;
}
const axiosInstance = ({ apiUrl = '' , headers }: AXIOSConfigType ) => {
    const url = apiUrl == "" ? import.meta.env.VITE_BACKEND_API_URL : apiUrl;

    const instance = axios.create({
        baseURL:url,
        headers: headers ? {...headers} :{}
    });
    instance.interceptors.request.use( 
        (request) => {
            return request
        },
        (error) => {
            console.warn(`Error found in ${error}`)
            return Promise.reject(error);
        }
    )
    
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.warn(`Error found in ${error}`);
            return Promise.reject(error)
        }
    )
    return instance;
}

export default axiosInstance