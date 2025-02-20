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
            }
        })
        console.log("Vehicle Added : ",newVehicle)
        return newVehicle;
    }catch (err){
        console.log("Error during vehicle adding : ",err)
    }
}

export async function updateVehicle(vehicleId:string,vehicle:Vehicle){
    try {
        const updatedVehicle = await prisma.vehicle.update({
            where:{licensePlateNo:vehicleId},
            data:{
                fuelType:vehicle.fuelType,
                color:vehicle.color,
                vehicleCategory:vehicle.vehicleCategory,
            }
        });
        console.log("Vehicle Updated : ",updatedVehicle)
        return updatedVehicle;
    }catch (err){
        console.log("Error during vehicle :",err)
    }
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
        const getAll = await prisma.vehicle.findMany();
        return getAll;
    }catch (err){
        console.log("Error getting vehicle : ",err);
    }
}