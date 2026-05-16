const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
     password: {
         type: String,
         required: true
    },
      role: {
        type: String,
        enum: ["owner", "tenant"],
        default: "tenant"
    },
      ProfilePicture: {
        type: String,
        default: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
    }
},{ timestamps: true });
module.exports = mongoose.model("User", userSchema);