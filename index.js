const express = require('express');

const app = express();
const map = new Map();

const junctionLat = 11.931581;
const junctionLng = 79.807646;


app.get('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  map.delete(id);
  console.log(Object.fromEntries(map));
  console.log("Data Removed Successfully");
});


app.get('/api/fetch', (req, res) => {  
  map.forEach((value, key) => {
    const distance = getDistance(value.lt,value.ln,junctionLat,junctionLng).toFixed(2);
    console.log(`Key: ${key}, Value: ${distance}`);
    if(distance<200){
      console.log("Ambulance Coming .......");
    }
  });
  res.send(Object.fromEntries(map));
});

app.get('/api/updateRead/:id', (req, res) => {
  const lt = req.query.lt;
  const ln = req.query.ln;

  const LatLng = new  Map();
  LatLng.set("lt",lt);
  LatLng.set("ln",ln);
  if(lt!=undefined && ln!=undefined){
  map.set(req.params.id, Object.fromEntries(LatLng));
  }
  console.log(Object.fromEntries(map));

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}




