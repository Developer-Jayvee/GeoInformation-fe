
export type coordinatesTypes = {
    latitude: number;
    longitude: number;
};
export type MapTypes = {
    latitude: number;
    longitude: number;
    handleCoordinates: (val: string, col: keyof coordinatesTypes) => void;
}
export type MapServiceTypes = {
    mapContainer: HTMLDivElement;
    coordinates: coordinatesTypes;
}

export type UserInfoType = {
    ip:string;
    loc:string;
    country: string;
}
export type FormTypes = {
    email:string;
    password:string;
}