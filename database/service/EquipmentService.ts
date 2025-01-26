import {prisma} from "../prisma-data-store";
import {Equipment} from "../../model/Equipment";

export async function AddEquip(e:Equipment){
    try {
        const newEquip = await prisma.equipment.create({
            data:{
                equipmentCode:e.equipmentCode,
                equipmentName:e.equipmentName,
                equipmentType:e.equipmentStatus
            }
        })
        console.log("Equipment Added : " , newEquip);
    }catch (err){
        console.log("Error during equipment adding :", err)
    }
}