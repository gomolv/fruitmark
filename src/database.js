const mongoose = require("mongoose");
const URI = process.env.status === "PROD" ? process.env.DBURI_PROD : process.env.DBURI_DEV;
const db = mongoose.connection;


function connect() {
    mongoose.connect(URI,
        {
            
        });

    db.on('open', () => {
        console.log("Database connected");
    });

    db.on('error', (error) => console.log("Error: ", error));

}

connect();