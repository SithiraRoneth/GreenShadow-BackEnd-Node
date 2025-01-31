import {Staff} from "../model/Staff";
import {prisma} from "../database/prisma-data-store";

export async function AddStaff(staff:Staff){
    try{
        const addedStaff = await prisma.staff.create({
            data:{
                ...staff
            }
        })
        console.log("Added Staff :",addedStaff);
    }catch (err){
        console.log("Error during staff adding :  ",err)
    }
}

export async function UpdateStaff(staffId:string,staff:Staff){

}

export async function DeleteStaff(staffId:string){
    try {
        await prisma.staff.delete({
            where:{email:staffId}
        })
        console.log("Deleted")
    }catch (err){
        console.log("Error during staff")
    }
}

export async function GetAllStaff(){
    try{
        await prisma.staff.findMany();
    }catch (err){
        console.log("Error getting staff details");
    }
}