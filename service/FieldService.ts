import {Field} from '../model/Field'
import {prisma} from "../database/prisma-data-store";

export async function AddField(field: Field) {
    try{
        const addedField = await prisma.field.create({
            data:{
                fieldCode:field.fieldCode,
                fieldName:field.fieldName,
                fieldImage:field.fieldImage,
                fieldLocation:field.fieldLocation
            }
        });
        console.log("Added Field : ", addedField);
        return addedField;
    }catch (err){
        console.log("Error during Field  : ",err)
    }
}

export async function UpdateField(fieldCode:string,field:Field){
    try{
        // const updateField = await prisma.field.update({
        //     where:{fieldCode:fieldCode},
        //     data:{
        //         fieldName:field.fieldName,
        //         fieldImage:field.fieldImage,
        //         fieldLocation:field.fieldLocation
        //     }
        // });
        // console.log("Updated Field :",updateField);
        // return updateField;
        const existingField = await prisma.field.findUnique({
            where:{fieldCode:fieldCode},
        });
        if (!existingField){
            console.log(`Field with fieldCode : ${fieldCode} not found`);
            return null;
        }

        const fieldUpdate = await prisma.field.update({
            where:{fieldCode:fieldCode},
            data:{
                fieldName:field.fieldName,
                fieldLocation:field.fieldLocation
            },
        });
        console.log("Field Updated ", fieldUpdate);
        return fieldUpdate;

    }catch (err){
        console.log("Error during Field  :", err);
    }
}

export async function DeleteField(fieldCode:string){
    try{
        await prisma.field.delete({
            where:{fieldCode:fieldCode}
        })
        console.log("Field Deleted")
    }catch (err){
        console.log("During deleting field : ",err);
    }
}

export async function GetAllFields(){
    try{
        const getAll = await prisma.field.findMany();
        return getAll;
    }catch (err){
        console.log("Error getting fields details");
    }
}