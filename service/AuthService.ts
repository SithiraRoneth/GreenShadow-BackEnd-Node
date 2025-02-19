import {Auth} from "../model/Auth";
import {prisma} from "../database/prisma-data-store";
import bcrypt from 'bcrypt';

export async function AddUser(auth: Auth) {
    const hashPassword = await bcrypt.hash(auth.password,10);
    try {
        const newUser = await prisma.user.create({
            data: {
                userEmail:auth.userEmail,
                password:hashPassword,
                role:auth.role
            }
        })
        console.log("User saved : ", newUser)
    }catch (err){
        console.log("Error during user save : ", err);
    }
}

export async function verifyUser(verify:Auth){
    const user : Auth | null = await prisma.user.findUnique({
        where:{userEmail: verify.userEmail},
    });
    if (!user){
        return false;
    }
    return await bcrypt.compare(verify.password,user.password);
}