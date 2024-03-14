import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
    try {
        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page,+limit);
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    // error code
                DT: data.DT
            })
        } else {
            let data = await userApiService.getAllUsers();
            return res.status(200).json({
                EM: data.EM,  
                EC: data.EC,    // error code
                DT: data.DT
            })
        }       

    } catch(error){
        console.log(error);
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            DT: data.DT
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
}

// edit... edit...
const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            DT: data.DT
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            DT: data.DT
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
}

const getUserAccount = async (req, res) => {
    // return res.status(200).json({
    //     EM: 'ok',  
    //     EC: 0,    // error code
    //     DT: {
    //         // return for user'use in next login
    //         access_token: req.token,
    //         groupWithRoles: req.user.groupWithRoles,
    //         email: req.user.email,
    //         username: req.user.username
    //     }
    // })
    console.log(">>> check req: ", req.user)
}


module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}