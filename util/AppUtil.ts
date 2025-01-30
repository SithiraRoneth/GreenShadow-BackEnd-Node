import {Request} from "express";
import fileUpload, {UploadedFile} from "express-fileupload";
export function extractImages(req:Request){
    const image = req.files?.image as UploadedFile;
    return image?image.data:Buffer.alloc(0);
}