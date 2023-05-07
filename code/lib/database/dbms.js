// file che contine la gestione delle iterazione del database

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://2LM:passwordditest@trentinofind.x1ubooa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Database connected");
    
    const database = client.db("TrentinoFind");
    const user = database.collection("User");

    const query = {firstname:"Marco"};

    const options = {
      sort: { "name": -1 },
      // Include only the `name` and `lastname` fields in the returned document
      projection: { _id: 0, name: 1, lastname: 1 },
    };

    const result= await user.findOne(query, options);
    console.log(result);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

exports.start = function(){
  run();
}

