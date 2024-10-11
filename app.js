const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const Grid  = require('gridfs-stream');   

const { PORT, DB_URL } = require('./configurations/config');
const movieRouter = require('./routes/movieRouter')

const app = express();
mongoose.connect(DB_URL);
const conn = mongoose.connection;

let gfs;
let gridfsBucket;
conn.once('open', () => {

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });
    console.log("MongoDB connection established and GridFS initialized");
});

app.use('/api/v1/video', movieRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});