import express from "express";
import {Staff} from "../model/Staff";
import {AddStaff, DeleteStaff, GetAllStaff, UpdateStaff} from "../service/StaffService";

const router = express.Router();

router.post('/addStaff',async (req,res)=>{
    const staff:Staff = req.body;
    try{
        const addedStaff = await AddStaff(staff);
        console.log("Added staff :",addedStaff);
        res.status(201).send("Staff Added successfully");
    }catch (err){
        console.log("Error during staff adding :",err);
        res.status(400).send("Error during staff");
    }
})

router.put('/updateStaff:email',async (req,res)=>{
    console.log("Received Update staff :",req.body);
    const staffEmail:string = req.params.email;
    const staff:Staff = req.body;

    try{
        await UpdateStaff(staffEmail,staff);
        res.status(201).send("Staff Updated");
    }catch (err){
        console.log("Error during staff updating : ",err);
        res.status(400).send("Error during staff")
    }
})

router.delete('/deleteStaff:email',async (req,res)=>{
    const staff_email = req.params.email;
    try{
        await DeleteStaff(staff_email);
        res.status(201).send("Staff Deleted");
    }catch (err){
        console.log("Error during Staff deleting :",err);
        res.status(400).send("Error during staff");
    }
})

router.get('/getAllStaff',async (req,res)=>{
    console.log("All staff details are retrieved");
    try{
        const staff = await GetAllStaff();
        res.json(staff);
    }catch (err){
        console.log("Error during getting staff");
    }
})

export default router;