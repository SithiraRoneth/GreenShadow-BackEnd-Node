import express from "express";
import {AddEquip, DeleteEquip, GetAllEquip, UpdateEquip} from "../service/EquipmentService";

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
});

router.put('/updateEquip/:equipCode', async (req,res)=>{
    const equipCode = req.params.equipCode;
    const equip = req.body;

    try{
        const updatedEquip = await UpdateEquip(equipCode,equip);
        res.status(201).json({message : "Equipment Updated" , equip:equip})
    }catch (err){
        console.log("Error during equipment : ", err);
    }
});

router.delete('/deleteEquip/:equipmentCode', async (req,res)=>{
    const equipCode = req.params.equipmentCode;
    console.log(equipCode)
    try{
        const deletedEquip = await DeleteEquip(equipCode);
        res.status(201).json({message:"Equipment Deleted", deletedEquip});
    }catch (err){
        console.log("Error during equipment : ", err);
    }
});

router.get('/getEquips', async (req,res)=>{
    try {
        const getAllEquip = await GetAllEquip();
        res.status(201).json(getAllEquip);
    }catch (err){
        console.log("Error getting Equipments Details : ", err);
    }
})

export default router;