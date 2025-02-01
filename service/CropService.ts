import {Crop} from "../model/Crop";
import {prisma} from "../database/prisma-data-store";

export async function AddCrop(crop:Crop){
    try {
        const cropSeason = Number(crop.season);
        const newCrop = await prisma.crop.create({
            data:{
                cropCode:crop.cropCode,
                cropName:crop.cropName,
                cropImage:(crop.cropImage),
                scientificName:crop.scientificName,
                category:crop.category,
                season:cropSeason
            }
        })
        console.log("Crop Added : " , newCrop);
    }catch (err){
        console.log("Error during crop adding : ", err)
    }
}

export async function UpdateCrop(cropCode: string, crop: Crop) {
    try {
        const existingCrop = await prisma.crop.findUnique({
            where: { cropCode: cropCode },
        });

        if (!existingCrop) {
            console.log(`Crop with cropCode: ${cropCode} not found.`);
            return null;
        }

        const cropSeason = Number(crop.season);
        const cropUpdate = await prisma.crop.update({
            where: { cropCode: cropCode },
            data: {
                cropName: crop.cropName,
                cropImage: crop.cropImage,
                scientificName: crop.scientificName,
                category: crop.category,
                season: cropSeason,
            },
        });

        console.log("Crop Updated ", cropUpdate);
        return cropUpdate;
    } catch (err) {
        console.error("Error during crop updating:", err);
    }
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