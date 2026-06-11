import generateToken from "../config/token.js"
import User from "../models/userModel.js"
import  bcrypt from "bcryptjs"
import uploadImage from "../config/cloudinary.js"

export const signUp= async(req,res)=>{
    try{
        const {firstName,lastName,email,password,userName}=req.body
        console.log(req.body);
        

        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message:"Send all details"})
        }

      console.log(req.file);
      

        let existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hassedPassword=await bcrypt.hash(password,10)

        let profileImage = null;
if (req.file) {
  try {
    const imageUrl = await uploadImage(req.file.path); 
    profileImage = imageUrl; 
  } catch (error) {
    console.log("Cloudinary upload failed:", error);
    return res.status(500).json({ message: "Image upload failed" });
  }
}

    

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hassedPassword,
            userName,
            profileImage
        })
        
        let token;
        try{
        token = generateToken(user._id)
        } catch (error) {
            console.log(error)
        }

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT =="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json({user:{
            firstName,
            lastName,
            email,
            userName,
            profileImage
            
        }})

    }catch(error) {
        return res.status(500).json(error)
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body
        let existUser= await User.findOne({email})
        if(!existUser) {
            return res.status(400).json({message:"user does not exist"})
        }

        let match= await bcrypt.compare(password,existUser.password)
        if(!match){
            return res.status(400).json({message:"Incorrect Password"})
        }

        let token;
        try{
        token = generateToken(existUser._id)
        } catch (error) {
            console.log(error);
        }

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT =="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({user:{
            firstName:existUser.firstName,
            lastName:existUser.lastName,
            email:existUser.email,
            userName:existUser.userName,
            profileImage:existUser.profileImage
        }})
    } catch (error) {
        return res.status(500).json(error)
    }

}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch(error) {
        return res.status(500).json(error)

    }
    
}

export const getUserData=async(req,res)=>{
    try{
        let userId=req.userId
        if(!userId){
            return res.status(400).json({message:"user id is not found"})
        }
        let user=await User.findById(userId)
        if(!user) {
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"error"})

    }
    
}