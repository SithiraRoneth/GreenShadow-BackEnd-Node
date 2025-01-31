import {Vehicle} from "../model/Vehicle";
import {prisma} from "../database/prisma-data-store";

export async function AddVehicle(vehicle:Vehicle){
    try {
        const newVehicle = await prisma.vehicle.create({
            data:{
                licensePlateNo:vehicle.licensePlateNo,
                fuelType:vehicle.fuelType,
                color:vehicle.color,
                vehicleCategory:vehicle.vehicleCategory,
                // staffEmail:vehicle.staffEmail
            }
        })
        console.log("Vehicle Added : ",newVehicle)
    }catch (err){
        console.log("Error during vehicle adding : ",err)
    }
}

export async function updateVehicle(vehicleId:string,v:Vehicle){

}

export async function deleteVehicle(vehicleId:string){
    try{
        await prisma.vehicle.delete({
            where:{licensePlateNo:vehicleId}
        })
    }catch (err){
        console.log("Error during vehicle deleting :",err);
    }
}

export async function getAllVehicle(){
    try{
        await prisma.vehicle.findMany();
    }catch (err){
        console.log("Error getting vehicle : ",err);
    }
}