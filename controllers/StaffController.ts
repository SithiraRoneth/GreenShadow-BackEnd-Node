import express from "express";
import {Staff} from "../model/Staff";
import {AddStaff, DeleteStaff, GetAllStaff, UpdateStaff} from "../service/StaffService";

const router = express.Router();

router.post('/addStaff',async (req,res)=>{
    const staff:Staff = req.body;
    try{
        const addedStaff = await AddStaff(staff);
        console.log("Added staff :",addedStaff);
        res.status(201).json({ message: "Staff added successfully", staff: addedStaff });    }catch (err){
        console.log("Error during staff adding :",err);
        res.status(400).send("Error during staff");
    }
})

router.put('/updateStaff:email',async (req,res)=>{
    console.log("Received Update staff :",req.body);
    const staffEmail:string = req.params.email;
    const staff:Staff = req.body;

    try{
        const updatedStaff = await UpdateStaff(staffEmail,staff);
        res.status(200).json({ message: "Staff updated successfully", staff: updatedStaff });
    }catch (err){
        console.log("Error during staff updating : ",err);
        res.status(400).send("Error during staff")
    }
})

router.delete('/deleteStaff:email',async (req,res)=>{
    const staff_email = req.params.email;
    try{
        await DeleteStaff(staff_email);
        res.status(200).json({ message: "Staff deleted successfully" });
    }catch (err){
        console.log("Error during Staff deleting :",err);
        res.status(400).send("Error during staff");
    }
})

router.get('/getAllStaff',async (req,res)=>{
    console.log("All staff details are retrieved");
    try{
        const staff = await GetAllStaff();
        res.status(201).json(staff);
    }catch (err){
        console.log("Error during getting staff");
    }
})

export default router;