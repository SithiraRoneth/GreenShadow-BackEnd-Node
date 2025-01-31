import express from "express";
import {Vehicle} from "../model/Vehicle";
import {AddVehicle, deleteVehicle, getAllVehicle, updateVehicle} from "../service/VehicleService";

const router = express.Router();

router.post('/addVehicle', async (req, res) => {
    const vehicle: Vehicle = req.body;
    console.log("Received Vehicle : ", vehicle);
    try {
        const addedVehicle = await AddVehicle(vehicle);
        res.status(201).json(addedVehicle);
    } catch (err) {
        console.log("Error during vehicle :", err);
        res.status(400).send("Error during vehicle");
    }
});

router.put('/updateVehicle:licensePlateNo',async (req,res)=>{
    console.log("Received Update vehicle : ",req.body);
    const licensePlateNo:string = req.params.licensePlateNo;
    const vehicle:Vehicle = req.body;

    try {
        const updatedVehicle = await updateVehicle(licensePlateNo,vehicle);
        res.status(201).send("Vehicle Updated ");
        console.log("Updated : ", updatedVehicle);
    }catch (err){
        console.log("Error during updating vehicle : ", err);
        res.status(400).send("Error during vehicle")
    }
})

router.delete('/deleteVehicle:licensePlateNo',async (req,res)=>{
    console.log("Received Deleted vehicle :",req.params.licensePlateNo);
    const vehicleCode:string = req.params.licensePlateNo;
    try{
        await deleteVehicle(vehicleCode);
        res.status(201).send("Vehicle Deleted");
    }catch (err){
        console.log("Error during vehicle deleting : ", err);
        res.status(400).send("Error during vehicle");
    }
})

router.get('/getAllVehicle',async (req,res)=>{
    console.log("All vehicle details are retrieved");
    try{
        const vehicle = await getAllVehicle();
        res.json(vehicle);
    }catch (err){
        console.log("Error during getting vehicles")
    }
})
export default router;