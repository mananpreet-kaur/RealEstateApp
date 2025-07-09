import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email : {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
       
    },
    avatar:{
        type: String,
        default: "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg" ,
    },
},{timestamps: true});

const User = mongoose.model('User',userSchema);
export default User;