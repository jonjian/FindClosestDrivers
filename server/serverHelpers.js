const drivers = require("../data/drivers.json");
const knn = require("sphere-knn")
const fetch = require("isomorphic-fetch");
const shipments = require("../data/shipments.json");

//cache 
let driverShipmentLog = {};

async function renderWork() {
  const array = []
  const shipmentKeys = [];
  for (let key in shipments) {
    shipmentKeys.push(parseInt(key))
    array.push(findClosestDrivers(shipments[key]["coordinates"]["latitude"], shipments[key]["coordinates"]["longitude"]));
  }
  let completed = shipmentKeys.map(() => false);
  for (let k = 0; k < array.length; k += 1) {
    for (let i = 0; i < array[k].length; i += 3) {
      for (let j = 0; j < shipmentKeys.length; j += 1) {
        if (completed.every(value => value === true)) {
          console.log("ALL SHIPMENTS DISPATCHED");
          console.log("COMPLETED ARRAY", completed);
          console.log("SHIPMENT LOG", driverShipmentLog);
          return driverShipmentLog
        }
        console.log('checking...', shipmentKeys[j])
        if (completed[j]) {
          console.log('shipment already completed', shipmentKeys[j])
          continue;
        }
        let driver1 = array[k][i]
        let driver2 = array[k][i+1]
        let driver3 = array[k][i+2] || null
        let driverArray = [driver1, driver2, driver3]
        if (driver3 === null) {
          driverArray = [driver1, driver2]
        }
        let promiseArray = driverArray.map(driver => dispatchToDriver(driver.key, shipmentKeys[j]))
        let results = await Promise.all(promiseArray)
        for (let x = 0; x < results.length; x += 1) {
          if (results[x]) {
            console.log('JUST COMPLETED ', shipmentKeys[j])
            completed[j] = true
            break;
          }
        }
      }
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
}
  console.log("ALL SHIPMENTS DISPATCHED");
  console.log('COMPLETED ARRAY', completed)
  console.log('SHIPMENT LOG', driverShipmentLog)
  return driverShipmentLog
}

const dispatchToDriver = (driverId, shipmentId)=> {
  let url = `https://backend-programming-challenge.herokuapp.com/driver/${driverId}/dispatch`;
  let data = { "shipmentId": shipmentId };
  let dispatched;

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => {
      if(driverAcceptedDispatch(response)) {
        if (!Array.isArray(driverShipmentLog[response.driverId])) {
          driverShipmentLog[response.driverId] = []
        }
        driverShipmentLog[response.driverId].push(response.shipmentId);
        dispatched = true;
        return dispatched
      }
      dispatched = false;
      return dispatched
    });
}

const findClosestDrivers = (lat, long) => {
  let lookup = knn(parseDrivers())
  let closestDrivers = lookup(lat, long, 20);
  return closestDrivers
}

const driverAcceptedDispatch = (data) => {
  if (data.response === 'Accepted') {
    return true
  }
  return false
}

const parseDrivers = () => {
  let parsedDrivers = [];
  for (var key in drivers) {
    var obj = {
      'key': key,
      'longitude': drivers[key]['coordinates']['longitude'],
      'latitude': drivers[key]['coordinates']['latitude'],
  }
    parsedDrivers.push(obj)
  }
  return parsedDrivers
}


module.exports = { 
  renderWork
}