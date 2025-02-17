import {Equipment} from "../model/Equipment";
import {prisma} from "../database/prisma-data-store";
import e from "express";

export async function AddEquip(e:Equipment){
    try {
        const newEquip = await prisma.equipment.create({
            data:{
                equipmentCode:e.equipmentCode,
                equipmentName:e.equipmentName,
                equipmentType:e.equipmentType
            }
        })
        console.log("Equipment Added : " , newEquip);
    }catch (err){
        console.log("Error during equipment adding :", err)
    }
}

export async function UpdateEquip(equipCode:string,equip:Equipment){
    try{
        const updatedEquip = await prisma.equipment.update({
            where:{equipmentCode:equipCode},
            data:{
                equipmentName:equip.equipmentName,
                equipmentType:equip.equipmentType
            }
        })
        console.log("Equipment were updated : ", updatedEquip);
        return updatedEquip;
    }catch (err){
        console.log("Error during updating equipment : ", err);
    }
}

export async function DeleteEquip(equipCode:string){
    try{
        await prisma.equipment.delete({
            where:{equipmentCode:equipCode}
        })
        console.log("Equipment Deleted")
    }catch (err){
        console.log("Error during equipment deleting : ", err);
    }
}

export async function GetAllEquip(){
    try {
        const getAll = await prisma.equipment.findMany();
        return getAll;
    }catch (err){
        console.log("Error getting equipment details : ", err);
    }
}