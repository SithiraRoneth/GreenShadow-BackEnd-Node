import express from "express";
import {Field} from "../model/Field";
import {extractImages} from "../util/AppUtil";
import {AddField, DeleteField, GetAllFields, UpdateField} from "../service/FieldService";
const routes = express.Router();

routes.post('/addField',async (req,res)=>{
    const field:Field = req.body;
    field.fieldImage = extractImages(req);

    try{
        const addedField = await AddField(field);
        res.status(201).json({message:"Field Added Successfully",field:addedField});
    }catch (err){
        console.log("Error during field : ", err);
    }
});

routes.put('/updateField:fieldCode',async (req,res)=>{
    const fieldCode:string = req.params.fieldCode;
    const field :Field = req.body;

    try{
        const updatedField = await UpdateField(fieldCode,field);
        res.status(201).json({message:"Field Updated", field:updatedField});
    }catch (err){
        console.log("Error during field : ", err);
    }
});

routes.delete('/deleteField:fieldCode', async (req,res)=>{
    const fieldCode:string = req.params.fieldCode;

    try{
        const deleteField = await DeleteField(fieldCode);
        res.status(201).json({message:"Field deleted", field:deleteField});
    }catch (err){
        console.log("Error during field deleting : ", err);
    }
});

routes.get('/getAllField',async (req,res)=>{
    try {
        const getAll = await GetAllFields();
        res.status(201).send(getAll);
    }catch (err){
        console.log("Error getting fields")
    }
});

export default routes;