const config = {
    warehouses: [
        { name: "BLR_Warehouse", lat: 12.99999, long: 37.923273 },
        { name: "MUMB_Warehouse", lat: 11.99999, long: 27.923273 }
    ],
    transportRates: {
        aeroplane: 1,
        truck: 2,
        miniVan: 3
    },
    distanceLimits: {
        aeroplane: 500,
        truck: 100
    },
    deliveryTypes: {
        standard: { baseCharge: 10, expressChargePerKg: 0 },
        express: { baseCharge: 10, expressChargePerKg: 1.2 }
    }
};

module.exports = config;