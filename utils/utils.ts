export const isLatitude = (lat: number) => {
    return lat && isFinite(lat) && Math.abs(lat) <= 90;
}

export const isLongitude = (lng: number) => {
    return lng && isFinite(lng) && Math.abs(lng) <= 180;
}