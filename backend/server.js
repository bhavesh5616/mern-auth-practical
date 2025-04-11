require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
