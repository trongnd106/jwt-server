require('dotenv').config()
import db from '../models/index'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)
import { Op } from 'sequelize'
import { getGroupWithRoles } from '../service/JWTService'
import { createJWT } from '../middleware/JWTAction'

const checkEmailExist = async (userEmail) => {
    let user  = await db.User.findOne({
        where: { email: userEmail}
    })
    if(user){
        return true
    } 
    return false
}

const checkPhoneExist = async (userPhone) => {
    let user  = await db.User.findOne({
        where: { phone: userPhone}
    })
    if(user){
        return true
    } 
    return false
}

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const registerNewUser = async (rawUserData) => {
    // sever may be error while checking finished
    try{
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if(isEmailExist === true){
            return{
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if(isPhoneExist === true){
            return{
                EM: 'The phone is already exist',
                EC: 1
            }
        }
        // hash userpassword
        let hashPassword = hashUserPassword(rawUserData.password)

        // create new user
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            password: hashPassword,
            username: rawUserData.username,
            groupId: 4
        })
        return{
            EM: 'A user is created successfully',
            EC: 0
        }
    } 
    catch(e){
        console.log(e)
        return{
            EM: 'Something wrongs in service ...',
            EC: 1
        }
    }
    
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or] : [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        // console.log(">>> check user js object: ", user.get({ plain: true }))
        // console.log(">>> check user sequelize object: ", user)
        if(user){
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if(isCorrectPassword === true){
                let groupWithRoles = await getGroupWithRoles();
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN // time limit exist of token
                }
                let token = createJWT(payload);     //encoded 
                // test postman: htts://localhost:8080/api/v1/login
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: {
                        // return for user'use in next login
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        } 
        console.log("Not found user with email/phone: ", rawData.valueLogin, " password: ", rawData.password)
        return {
            EM: 'Your email/phone number or password is incorrect',
            EC: 1,
            DT: ''
        }     

    } catch(error) {
        console.log(error)
        return{
            EM: 'Something wrongs in service ...',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}