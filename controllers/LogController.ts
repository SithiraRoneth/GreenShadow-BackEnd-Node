import express from "express";

const routes = express.Router();

routes.post('/addLog', async (req,res)=>{
    try{

    }catch (err){
        console.log("Error during Monitoring Logs : ", err);
    }
});

export default routes;