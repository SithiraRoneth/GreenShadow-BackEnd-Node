import express from 'express';
import fileupload from 'express-fileupload';
import CropController from "./controllers/CropController";
import EquipmentController from "./controllers/EquipmentController";

const app = express();

app.use(express.json());
app.use(fileupload());

app.use('/',(req,res, next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers',"Origin,X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/crop',CropController);
app.use('/equip',EquipmentController);

app.listen(3000,(err)=>{
    console.log("Server Running on port 3000");
})
app.use('/',(req,res)=>{
    res.status(404).send("Not Found")
})
