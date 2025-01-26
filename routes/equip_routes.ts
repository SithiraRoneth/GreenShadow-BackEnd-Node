import express from "express";
import {AddEquip} from "../database/service/EquipmentService";

const router = express.Router();

router.post('/addEquip',async (req,res)=>{
    const equip = req.body;
    console.log("Received Equipment :",equip);

    try{
        const addedEquip = await AddEquip(equip);
        res.status(200).send(addedEquip);
    }catch (err){
        console.log("Error during equipment adding :", err)
    }
})

export default router;