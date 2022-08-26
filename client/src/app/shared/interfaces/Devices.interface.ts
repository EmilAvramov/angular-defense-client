export interface Device {
    deviceId: number,
    deviceImage: string,
    deviceKey: string,
    deviceName: string,
    deviceType: string,
    fkBrand: string,
    Brand: {
        brandId: number,
        brandKey: string,
        brandName: string
    }
}