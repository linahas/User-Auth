const User = require("../Models/user");
const Product = require("../Models/product")
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    jwt.sign({_id}, process.env.SECRET)
}


   
module.exports.getAllUsers = async (req, res) => {

    let users = await User.find({ classe: "63778921db701c06b2d58c74" })
    return res.status(200).json({
        success: true,
        users
    })

}

module.exports.createUser = async (req, res) => {
    try {
        let {
            nom,
            prenom,
            email,
            role
        } = req.body
        let newUser = new User({
            nom: nom,
            prenom: prenom,
            email: email,
            role:role
        });
        let savedUser = await newUser.save();
        return res.status(200).json({
            success: true,
            user: savedUser
        })
        // let user = await User.role.findById();
        // if (user!=admin) {
        // return res.status(403).send( ‘you're not an admin');
        
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.editUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let { nom } = req.body;
        let updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
                nom: nom
            }
        },
            {
                new: true
            });
        return res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.deleteUser = async (req, res) => {
    try {
        let { userId } = req.params;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "delete successfully."
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}
module.exports.showUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let userDetail = await User.findById(userId);
        return res.status(200).json({
            success: true,
            user: userDetail
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}


// login user
const loginUser = async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
    
        // create a token
        const token = createToken(user._id)
        res.status(200).json({user})

      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.signup(email, password)
  
      // create a token
      const token = createToken(User._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    
  }

  module.exports = { signupUser, loginUser }