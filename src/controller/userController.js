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
            data: ''
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
            data: ''
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
            data: ''
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}