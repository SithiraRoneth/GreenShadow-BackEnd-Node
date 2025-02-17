import {Staff} from "../model/Staff";
import {prisma} from "../database/prisma-data-store";

export async function AddStaff(staff:Staff){
    try{
        const contact = Number(staff.contactNo);
        const addedStaff = await prisma.staff.create({
            data:{
                email:staff.email,
                firstName:staff.firstName,
                lastName:staff.lastName,
                gender:staff.gender,
                address:staff.address,
                contactNo:contact,
                jobrole:staff.jobrole
            }
        })
        console.log("Added Staff :",addedStaff);
        return addedStaff;
    }catch (err){
        console.log("Error during staff adding :  ",err)
    }
}

export async function UpdateStaff(staffId:string,staff:Staff){
    try{
        const updatedStaff = await prisma.staff.update({
            where: { email: staffId },
            data: {
                ...staff,
                contactNo: Number(staff.contactNo)
            }
        });
        console.log("Updated staff :",updatedStaff)
        return updatedStaff;
    }catch (err){
        console.log("Error during updating staff :" , err)
        throw err;
    }
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
        const allStaff = await prisma.staff.findMany();
        return allStaff;
    }catch (err){
        console.log("Error getting staff details");
    }
}