import express from "express";
import {AddUser} from "../service/AuthService";

const router = express.Router();

router.post('/addUser',async (req,res)=>{
    const user = req.body;
    console.log("Received User :",user);

    try {
        const saveUser = await AddUser(user);
        res.status(201).send("User Created");
    }catch (err){
        console.log("Error during user saving :", err);
    }
});

export default router;