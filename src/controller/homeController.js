import * as userService from '../service/userService.js'

const handleCheck = (req, res) => {
    res.render('home.ejs')
}

const handleUserPage = async (req, res) => {
    // Cookies that have not been signed
    // console.log('Cookies: ', req.cookies)
    // res.cookie(key, value, [options]) in express 
   
    let userList = await userService.getUserList()
    // console.log(">>>check userList: ", userList)
    res.render('user.ejs', {userList})
}

const handleCreateNewUser = async (req, res) => {
    let {email, password, username} = req.body

    userService.createNewUser(email, password, username)
    res.redirect('/user')
}

const handleDeleteUser = async (req,res) => {
    let id = req.params.id
    userService.deleteUser(id)
    res.redirect('/user')
}

const getUpdateUserPage = async (req,res) => {
  let id = req.params.id
  let user = await userService.getUserById(id)
  let userData = {}
  userData = user
  // if(user && user.length > 0) {
  //   userData = user[0]
  // }
  res.render('user-update.ejs', {userData})
}

const handleUpdateUser = async (req,res) => {
  let email = req.body.email
  let username = req.body.username
  let id = req.body.id
  await userService.updateUserInfo(email,username,id) 
  res.redirect('/user')
}

export {
    handleCheck, handleUserPage, handleCreateNewUser,
    handleDeleteUser, getUpdateUserPage, handleUpdateUser
}