const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Abdullah:Abdullahahil.1@graphql-work.thqawcu.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
})

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))

const port = 4000;

app.listen(port,()=>{
    console.log(`listening on port:${port}`);
});



// const mongoose = require('mongoose');
// const uri = "mongodb+srv://Abdullah:<password>@graphql-work.thqawcu.mongodb.net/?retryWrites=true&w=majority";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
// mongodb+srv://Abdullah:<password>@graphql-work.thqawcu.mongodb.net/?retryWrites=true&w=majority