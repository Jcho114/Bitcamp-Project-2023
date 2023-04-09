import { MongoClient } from 'mongodb';
import { createRequire } from 'module';
import cors from 'cors';

const require = createRequire(import.meta.url);

const connectionString = "mongodb+srv://jcho114:p9HjoUIOJRd7sD4F@joseph.rf512wj.mongodb.net/?retryWrites=true&w=majority";

const express = require("express");

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e);
}

const yeardb = conn.db("test");

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    let count = 0;
    let jsonList = [];
    let year = req.query.year;
    
    const zipcode = yeardb.collection('homevalues').findOne(
        {
            Year: 2011,
            Zipcode: 89061
        }
    );

    console.log(JSON.stringify(zipcode));

    res.json({ "Home Value": zipcode });
});

app.post('/signin', async (req, res) => {
    // Check if the user has provided a username and password
    if (!req.body.username || !req.body.password) {
    res.send(400, {
        message: 'Please provide a username and password'
    });
    return;
    }

    

    // Check if the username and password are valid
    //FIND THE USER IN THE DATABASE
    const user = yeardb.collection('logins').findOne({
        username: req.body.username
    });

    if (!user) {
    res.send(401, {
        message: 'Invalid username or password'
    });
    return;
    }

    // Check if the password is correct
    if (!(user.password === req.body.password)) {
    res.send(401, {
        message: 'Invalid username or password'
    });
    return;
    }

    // Sign the user in
    const token = jwt.sign({
    user: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: '10h'
    });

    // Send the token back to the client
    res.send(200, token);
});

//!THINGS TO INSTALL
//! fix express install, mongodb, jwt