const express = require("express");
const router = express.Router();
const user = require("../models/user");
const fetchUser = require("../middelware/fetchuser");
const isAdmin = require("../middelware/isAdmin");

router.get("/allusers",fetchUser,isAdmin,async(req , res)=>{
    try {
        const users = await user.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
});

module.exports= router;