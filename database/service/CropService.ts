import {Crop} from "../../model/Crop";
import {prisma} from "../prisma-data-store";

export async function AddCrop(crop:Crop){
    try {
        const newCrop = await prisma.customer.create({
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
        await prisma.customer.delete({
            where:{cropCode:cropCode}
        })
    }catch (err){
        console.log("Error during customer deleting : ", err)
    }
}