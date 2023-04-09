/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

const axios = require('axios');
const queue = [];

fastify.get('/add', (req, res) => {
  const n = req.query.lane;
  
  if(notInLogic(n)){
    queue.push(n);
  }
  console.log('Ambulance added to the queue');
  sendToFireBase();
  res.send("success");
});

fastify.get('/remove', (req, res) => {
  const j = queue.shift();
  console.log("Data removed from firebase " + j);
  sendToFireBase();
  res.send("removed success");

});


function notInLogic(n){
  for(var i=0;i<queue.length;i++){
    if(n===queue[i]){
      return false;
    }
  }return true;
}

async function sendToFireBase() {
  try 
  {
    var n;
    if(queue.length === 0){
      n = 5; // set the default value of n
    } else {
      n = queue[0];
    }
    const response = await axios.put('https://demo1-f4fb2-default-rtdb.firebaseio.com/users.json', {
      "value": parseInt(n, 10)
    });
    console.log(response.data);
    console.log(queue);
  } catch (error) {
    console.error(error);
  }
}

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
