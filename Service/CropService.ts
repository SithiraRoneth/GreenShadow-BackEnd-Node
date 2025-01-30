import {Crop} from "../model/Crop";
import {prisma} from "../database/prisma-data-store";

export async function AddCrop(crop:Crop){
    try {
        // const base64Image = Uint8Array.from(
        //     Buffer.from(crop.cropImage,'base64')
        // )
        const newCrop = await prisma.crop.create({
            data:{
                cropCode:crop.cropCode,
                cropName:crop.cropName,
                cropImage:crop.cropImage,
                scientificName:crop.scientificName,
                category:crop.category,
                season:crop.season
            }
        })
        console.log("Crop Added : " , newCrop);
    }catch (err){
        console.log("Error during crop adding : ", err)
    }
}

export async function UpdateCrop(cropCode:string, crop:Crop){

}

export async function DeleteCrop(cropCode:string){
    try {
        await prisma.crop.delete({
            where:{cropCode:cropCode}
        })
    }catch (err){
        console.log("Error during customer deleting : ", err)
    }
}

export async function GetAllCrops(){
    try{
        await prisma.crop.findMany();
    }catch (err){
        console.log("Error getting crops : ",err)
    }
}