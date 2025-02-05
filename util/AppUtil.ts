import {Request} from "express";
import {UploadedFile} from "express-fileupload";

export function extractImages(req: Request) {
    const image = req.files?.image as UploadedFile;
    return image ? image.data : Buffer.alloc(0);
}