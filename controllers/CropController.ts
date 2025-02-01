import express from "express";
import {Crop} from "../model/Crop";
import {extractImages} from "../util/AppUtil";
import {AddCrop, DeleteCrop, GetAllCrops, UpdateCrop} from "../service/CropService";

const router = express.Router();

router.post('/addCrop', async (req, res) => {
    const crop: Crop = req.body;
    crop.cropImage = extractImages(req)
    console.log("Received Crops : ", crop);
    try {
        const addedCrop = await AddCrop(crop);
        res.status(200).json(addedCrop);
    } catch (err) {
        console.log("Error during crop adding : ", err)
        res.status(400).send("Error during crop");
    }
});

router.put('/updateCrop/:cropCode', async (req, res) => {
    console.log("Received Update Crop : ", req.body);
    const cropCode: string = req.params.cropCode;
    const crop: Crop = req.body;

    try {
        await UpdateCrop(cropCode, crop);
        res.status(200).send("Crop Updated");
    } catch (err) {
        console.log("Error during crop updating : ", err);
        res.status(400).send("Error during Crop");
    }
})

router.delete('/deleteCrop/:cropCode', async (req, res) => {
    console.log("Received Deleted crop code");
    const cropCode: string = String(req.params.cropCode);
    try {
        await DeleteCrop(cropCode);
        res.status(200).send("Crop Deleted")
    } catch (err) {
        console.log("Error during deleting crop :", err);
        res.status(400).send("Error during crop");
    }
})

router.get('/viewAllCrop', async (req, res) => {
    console.log("All crop details are retrieved");
    try {
        const crops = await GetAllCrops();
        res.json(crops)
    } catch (err) {
        console.log("error during getting crops")
    }
})
export default router;