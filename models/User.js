const mongoose = require('../db/conn.js'); 
const { Schema } = mongoose;

const User = mongoose.model(
    "User",
    new Schema({

        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phones: [{
            number: {
                type: String,
                required: true
            },
            ddd: {
                type: String,
                required: true
            }
        }]
    },
        { timestamps: true },
    ),
);

module.exports = User;