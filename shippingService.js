const config = require('./config');

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getNearestWarehouse(customerLat, customerLong) {
    let nearestWarehouse = null;
    let minDistance = Infinity;
    
    config.warehouses.forEach(warehouse => {
        const distance = calculateDistance(
            customerLat, customerLong,
            warehouse.lat, warehouse.long
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestWarehouse = warehouse;
        }
    });
    
    return { warehouse: nearestWarehouse, distance: minDistance };
}

function determineTransportMode(distance) {
    if (distance >= config.distanceLimits.aeroplane) {
        return 'aeroplane';
    } else if (distance >= config.distanceLimits.truck) {
        return 'truck';
    }
    return 'miniVan';
}

function calculateShippingCharge(customerLat, customerLong, products, deliveryType) {
    const { warehouse, distance } = getNearestWarehouse(customerLat, customerLong);
    const transportMode = determineTransportMode(distance);
    const transportRate = config.transportRates[transportMode];
    const deliveryConfig = config.deliveryTypes[deliveryType];
    
    let totalWeight = 0;
    products.forEach(product => {
        totalWeight += product.weight;
    });
    
    let shippingCharge = distance * totalWeight * transportRate;
    let finalCharge = shippingCharge + deliveryConfig.baseCharge;
    
    if (deliveryType === 'express') {
        finalCharge += totalWeight * deliveryConfig.expressChargePerKg;
    }
    
    return finalCharge;
}

module.exports = { calculateShippingCharge };
