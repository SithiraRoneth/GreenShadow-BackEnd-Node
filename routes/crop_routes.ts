import express from "express";
import {AddCrop} from "../database/service/CropService";
import {Crop} from "../model/Crop";

const router = express.Router();

router.post('/addCrop',async (req,res)=>{
    console.log("Received Crops : ", req.body);
    try{
        const addedCrop = await AddCrop(Crop);
        res.status(200).json(addedCrop);
    }catch(err){
        console.log("Error during crop adding : ", err)
        res.status(400).send("Error during crop");
    }
})

export default router;