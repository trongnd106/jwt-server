import loginRegisterService from '../service/loginRegisterService'

const testApi = (req,res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req,res) => {
    try {
        // validate from sever
        if(!req.body.email || !req.body.email || !req.body.email){
            return res.status(200).json({
                EM: 'Missing required parameters',  
                EC: '-1',
                data: ''
            })
        }
        if(req.body.password && req.body.password.length < 8){
            return res.status(200).json({
                EM: 'Your password must have more than 7 characters',  
                EC: '-1',
                data: ''
            })
        }
        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            data: ''
        })

    } catch (e){
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            data: ''
        })
    }
    // console.log(">>> call me", req.body);
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body)
        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            data: data.DT
        })
    } catch(error){
        // when exception
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            data: ''
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin
}