let express = require("express");
let app = express();
app.listen(3000, () => console.log("Server running on port 3000!"))

app.use(express.json());

const url = "mongodb://localhost:27017";
const MongoClient = require('mongodb').MongoClient;
const dbName = 'label';



app.get('/:label', (req, res) => {

    // Use the connect method to create a connection w/ the database
    MongoClient.connect(url, (err, client) => {
        if (err) {
            throw err;
            return;
        }
        console.log('Database connection successful');
        // This objects holds the refrence to the db
        const db = client.db(dbName);
        const collection = db.collection('Labels');

        // Find the required document
        collection.find({
            text: req.params.label
        }).toArray((err, docs) => {
            if (err) {
                throw err;
            }
            console.log(docs)

            client.close();
        });
    });
});