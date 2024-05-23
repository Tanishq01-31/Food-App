const express = require('express');
const router = express.Router();
const models = require('../Models/models');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'randomstringforjwttoken';
const user = models.userModel;

router.post('/createuser', 
[
    body('email').isEmail(),
    body('password').isLength({min: 5})
]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securedPass = await bcrypt.hash(req.body.password,salt);
    try{
        await user.create({
            name: req.body.name,
            password: securedPass,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
    }
    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

router.post('/fetchuser',async (req,res)=>{
    try{
        var fetchEmail = req.body.email;
        var fetchPassword = req.body.password;
        console.log(fetchEmail);
        const result = await user.findOne({email: fetchEmail});
        console.log(result);
        if (!result) {
            // If no user is found with the provided email
            return res.status(404).json({ success: false });
        }
        const passCompare = await bcrypt.compare(fetchPassword,result.password);
        console.log(passCompare);
        if (!passCompare) {
            // If the password matches
            return res.status(400).json({ success: false, user: result });
        }
        const data = {
            user:{
                id:result.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken});
    }
    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;