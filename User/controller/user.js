const User = require('../model/user');
const {logger} = require('../../logger');

// Add User using promises
// exports.addUser = (req,res,next) =>{
//  const user = new User(req.body);                 //body-parser is required
//     user.save().then(data =>{
//            logger.info('User added Successfully');
//                res.status(201).json({
//                 message:"User added Successfully",
//                 data
//             });    
//         })
//         .catch(err =>{
//             logger.error(err.message);
//               return res.status(400).json({
//                 error:err.message             
//             })     
//         })
// }

//Add User using Async-Await
exports.addUser = async(req,res,next) =>{
    try{
        const user = new User(req.body);
        const createUser = await user.save();
        logger.info('User added Successfully');
        res.status(201).json({
                 message:"User added Successfully",
                 createUser
        })
    }catch(err){
        logger.error(err.message);
            return res.status(400).json({
                error:err.message             
            }) 
    }
}

///////////////////////////////////////

//To get all users
// exports.getAllUsers = (req,res,next) =>{
//     User.find()
//        .exec()
//        .then((users)=>{
//            if(users){
//             logger.info('Get all users successfully');
//            return res.status(200).json({users});
//            }else{
//             logger.error('Error occured while fetching users');
//             res.status(404).json({message:'Error occured while fetching users'});
//            }  
//        })
//        .catch((err)=>{
//             logger.error(err); 
//              res.status(400).json({
//                 error:err
//             })
//        })  
    
// }

//To get all users using Async-Await
exports.getAllUsers = async(req,res,next) =>{
    try{
       const allUsers = await User.find();
       if(allUsers){
            logger.info('Get all users successfully');
            res.status(200).json({allUsers});
       }else{
            logger.error('No users found');
            res.status(404).json({message:'No users found'}); 
       }
    }catch(err){
            logger.error(err); 
             res.status(400).json({
                error:err
            })
    }
}

///////////////////////////////////////

//get user by id using promises
exports.getUserById = (req,res,next) =>{
    const id = req.params.id;
    User.findById(id)
        .exec()
        .then((user)=>{
            if(user){
                logger.info('successfully get the user by ID');
               return res.status(200).json({user});
            }else{
                logger.error('User not Found with this ID');
                res.status(404).json({message:'No User Found with this ID'});
            }
        })
        .catch((err)=>{
            logger.error("Invalid ID "+err);  
            res.status(400).json({
                message:'Invalid ID',
                 error:err
            })
        })       
}

//get user by id using Async-Await
// exports.getUserById = async(req,res,next) =>{
//     try{
//         const id = req.params.id
//         const user = await User.findById(id);
//         if(user){
//             logger.info('successfully get the user by ID');
//             res.status(200).json({user});
//         }else{
//             logger.error('User not Found with this ID');
//             res.status(404).json({message:'No User Found with this ID'});
//         }
//     }catch(err){
//             logger.error("Invalid ID "+err);  
//             res.status(400).json({
//                 message:'Invalid ID',
//                 error:err
//             })
//     }
// }

/////////////////////////////////////////

// get user by name promises
exports.getUserByName = (req,res,next) =>{
    const name = req.params.name;
    User.find({name: new RegExp(name,"i")})
        .exec()
        .then(user =>{
            if(user.length > 0){
                logger.info('successfully get the user by name');
                res.status(200).json({user});
            }else{
                logger.error('User not found with this name');
                res.status(404).json({message:'No User found with this Name'});
            }
        })
        .catch(err =>{
            logger.error(err);   
            res.status(400).json({
                 error:err
            })
        })       
}

//get user by name using Async-await
// exports.getUserByName = async(req,res,next) =>{
//     try{
//         const name = req.params.name
//         const user = await User.find({name:new RegExp(name,"i")});
//         if(user.length > 0){
//             logger.info('successfully get the user by name');
//             res.status(200).json({user});
//         }else{            
//             logger.error('User not found with this name');
//             res.status(404).json({message:'No User found with this Name'});
//         }
//     }catch(err){
//         logger.error(err);   
//         res.status(400).json({
//               error:err
//         }) 
//     }
// }