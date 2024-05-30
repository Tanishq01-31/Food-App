const express = require("express");
const mongoose = require("mongoose");

async function dataBaseConnect(){
await mongoose.connect('mongodb://127.0.0.1:27017/test_database')
console.log("Connected to MongoDB");

const db = mongoose.connection.db;

// const fetchData = await db.listCollections().toArray();
// console.log(fetchData);

const collections = await db.listCollections().toArray();
        // console.log("Available collections:", collections);

        const collectionNames = collections.map(col => col.name);
        if (!collectionNames.includes("foodData")) {
            console.error("Collection 'foodData' not found!");
            return;
        }

const fetchData = db.collection("foodData");
const foodData = await fetchData.find({}).toArray();
const foodCategory = db.collection("foodCategory");
const categoryData = await foodCategory.find({}).toArray();
global.foodItems = foodData;
global.foodCat = categoryData;
// console.log(categoryData);
// console.log(data);
// fetchData.find({}).toArray(function (err,data){
//     if(err){
//         console.log(err);
//     }
//     else{
//         global.food_items = data;
//         console.log(data);
//     }
// })
}

module.exports = dataBaseConnect;