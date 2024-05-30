const express = require('express');
const router = express.Router();

router.post("/dispdata",(req,res)=>{
    try {
        res.send([global.foodItems, global.foodCat]);
    } catch (error) {
        console.error(error);
        res.send("Server Error");
    }
})

module.exports = router;