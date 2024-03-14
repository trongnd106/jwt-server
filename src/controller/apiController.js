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
                DT: ''
            })
        }
        if(req.body.password && req.body.password.length < 8){
            return res.status(200).json({
                EM: 'Your password must have more than 7 characters',  
                EC: '-1',
                DT: ''
            })
        }
        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            DT: ''
        })

    } catch (e){
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
    // console.log(">>> call me", req.body);
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body)
        if(data && data.DT && data.DT.access_token){
            // set cookie, httpOnly -> only create and use at server 
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60*60*1000 })   //1hour instead of session
        }
        return res.status(200).json({
            EM: data.EM,  
            EC: data.EC,    // error code
            DT: data.DT
        })
    } catch(error){
        // when exception
        return res.status(500).json({
            EM: 'error from sever',  
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin
}