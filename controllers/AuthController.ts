import express from "express";
import {AddUser, verifyUser} from "../service/AuthService";
import {Auth} from "../model/Auth";
import jwt,{Secret} from 'jsonwebtoken';
const router = express.Router();

router.post('/addUser',async (req,res)=>{
    const user = req.body;
    console.log("Received User :",user);

    try {
        const saveUser = await AddUser(user);
        res.status(201).send("User Created");
    }catch (err){
        console.log("Error during user saving :", err);
    }
});

router.post('/login',async (req,res)=>{
    console.log("Request body for /login :",req.body);
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    const role = req.body.role;

    const user:Auth = {userEmail,password,role};
    try {
        const isVerified =await verifyUser(user);
        if (isVerified){
            const access_token = jwt.sign({userEmail},process.env.ACCESS_TOKEN as Secret,{expiresIn:"1m"});
            const refreshToken = jwt.sign({userEmail},process.env.REFRESH_TOKEN as Secret,{expiresIn:"7d"})
            res.json({accessToken:access_token, refreshToken:refreshToken});
            console.log(access_token)
        }else {
            res.sendStatus(403).send('Invalid Credential')
        }
    }catch (err){
        console.log("User Credentials doesn't match");
    }
});

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.ACCESS_TOKEN as Secret, {expiresIn: "1m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
});

export function authenticationToken(req:express.Request,res:express.Response,next:express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token)
    if (!token) res.status(401).send("Token not provided");

    try{
        const payload = jwt.verify(token as string, process.env.ACCESS_TOKEN as Secret) as {username:string, iat:number};
        console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch (err){
        res.status(401).send(err);
    }
}

export default router;

