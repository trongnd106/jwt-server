import db from '../models/index'

const getAllUsers = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: ''
    }
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"]}
        });
        if(users){
            // let data = users.get({ plain: true });
            return {
                EM: 'get data success', 
                EC: 0, 
                DT: users
            }
        } else {
            return {
                EM: 'get data success', 
                EC: 0, 
                DT: []
            }
        }
    } catch(err){
        console.log(err)
        return {
            EM: 'something wrongs with services', 
            EC: 1, 
            DT: data
        }
    }
}

const getUserWithPagination = async (page,limit) => {
    try {
        let offset = (page - 1)*limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"]}
        })
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'fetch oke', 
            EC: 0, 
            DT: data
        }
    } catch(err){
        console.log(err)
        return {
            EM: 'something wrongs with services', 
            EC: 1, 
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try{
        let user = db.User.findOne({
            where: { id: data.id }
        })
        if(user){
            // update
            user.save({

            })
        }else {
            // not found user
        }
    } catch(err){
        console.log(err)

    }
}

const createNewUser = async () => {
    try{
        await db.User.create({

        })
    } catch(err){
        console.log(err)

    }
}

const deleteUser = async (id) => {
    try{
        let user = await db.User.findOne({
            where: { id: id }
        })
        if(user){
            await user.destroy();
            return {
                EM: 'Delete user succeed', 
                EC: 0, 
                DT: user.dataValues
            }
        } else {
            return {
                EM: 'User not exist', 
                EC: 2, 
                DT: []
            }
        }
    } catch(err){
        console.log(err)
        return {
            EM: 'Error from service', 
            EC: 1, 
            DT: []
        }
    }
}

module.exports = {
    getAllUsers, updateUser, createNewUser, deleteUser, getUserWithPagination
}