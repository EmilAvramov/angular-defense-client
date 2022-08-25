import database from '../config/database';
import { DataType } from 'sequelize-typescript';
import { DeviceDetails } from '../interfaces/DeviceDetails.interface';

export const PhoneAdModel = database.sequelize.define<DeviceDetails>('Device', {
    id: { // db
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    },
    key: { // root
        type: DataType.TEXT,
        allowNull: false
    },
    deviceName: { // root
        type: DataType.TEXT,
        allowNull: false
    },
    deviceImage: { // root
        type: DataType.TEXT,
        allowNull: false
    },
    connectivity: { // more/network/technology
        type: DataType.TEXT,
        allowNull: false
    },
    launchDate: { // more/launch/status
        type: DataType.TEXT,
        allowNull: false
    },
    dimensions: { // more/body/dimensions
        type: DataType.TEXT,
        allowNull: false
    },
    weight: { // more/body/weight
        type: DataType.TEXT,
        allowNull: false
    },
    build: { // more/body/build
        type: DataType.TEXT,
        allowNull: false
    },
    sim: { // more/body/sim
        type: DataType.TEXT,
        allowNull: false
    },
    display: { // more/display/type
        type: DataType.TEXT,
        allowNull: false
    },
    size: { // more/display/size
        type: DataType.TEXT,
        allowNull: false
    },
    resolution: { // more/display/resolution
        type: DataType.TEXT,
        allowNull: false
    },
    protection: { // more/display/protection
        type: DataType.TEXT,
        allowNull: false
    },
    os: { // more/platform/os
        type: DataType.TEXT,
        allowNull: false
    },
    chipset: { // more/platform/chipset
        type: DataType.TEXT,
        allowNull: false
    },
    cpu: { // more/platform/cpu
        type: DataType.TEXT,
        allowNull: false
    },
    gpu: { // more/platform/cpu
        type: DataType.TEXT,
        allowNull: false
    },
    cardSlot: { // more/memory/slot
        type: DataType.TEXT,
        allowNull: false
    },
    internalStorage: { // more/memory/internal
        type: DataType.TEXT,
        allowNull: false
    },
    cameraMain: { // more/main camera/quad
        type: DataType.TEXT,
        allowNull: false
    },
    videoMain: { // more/main camera/video
        type: DataType.TEXT,
        allowNull: false
    },
    cameraSelfie: { // more/selfie/dual
        type: DataType.TEXT,
        allowNull: false
    },
    videoSelfie: { // more/selfie/video
        type: DataType.TEXT,
        allowNull: false
    },
    speakers: { // more/sounds/speakers
        type: DataType.TEXT,
        allowNull: false
    },
    jack: { // more/sounds/jack
        type: DataType.TEXT,
        allowNull: false
    },
    features: { // more/features/sensons
        type: DataType.TEXT,
        allowNull: false
    },
    batteryType: { // more/battery/type
        type: DataType.TEXT,
        allowNull: false
    },
    batteryCharge: { // more/battery/charging
        type: DataType.TEXT,
        allowNull: false
    },
    price: { // more/misc/price
        type: DataType.TEXT,
        allowNull: false
    },
});

(async () => await database.sequelize.sync())()