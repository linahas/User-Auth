const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const bcrypt =require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            // required: true,
        },
        prenom: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: true,
            max: 30,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        role: {
            admin: {
                type: Schema.Types.ObjectId,
                ref:'Admin'},
            customer: {
                type: Schema.Types.ObjectId, 
                ref:'Customer'  }
        }
    },   
)

//static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash })
  
    return user
  }

  //static login method 
  userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
  
    if (!user) {
      throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password,user.password)
    if(!match){
      throw Error("incorrect password")
    }
    return user
  }


module.exports = mongoose.model("User", userSchema)