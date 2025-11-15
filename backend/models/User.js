import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    given_name:{type:String, required:true},
    family_name:{type:String, required:true},
    sub:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
}, {timestamps:true});
export default mongoose.model("User", userSchema);