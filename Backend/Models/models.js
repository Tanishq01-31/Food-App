const mongoose = require('mongoose');

const scheema1 = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    options: {
        half: {
            type: Number,
            required: false
        },
        full: {
            type: Number,
            required: false
        }
    },
    description : {
        type: String,
        required: false
    }
},{ collection: "foodData" });

const foodDataModel = mongoose.model('foodData',scheema1);

const scheema2 = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model('userData',scheema2);

const scheema3 = new mongoose.Schema({
    CategoryName : {
        type: String,
        required: true
    }
},{ collection: "foodCategory" });

const foodCatagoryModel = mongoose.model('foodCategory',scheema3);

const scheema4 = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    order_data : {
        type: Array,
        required : true
    },
    order_date : {
        type: Date,
        required: true
    }
})
const orderModel = mongoose.model('OrderData', scheema4);

module.exports = {
    foodDataModel,
    userModel,
    foodCatagoryModel,
    orderModel
}