import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import bluebird from 'bluebird'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10)

// Create the connection to database
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird
// });

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    let hashPass = hashUserPassword(password)
    try {
        await db.User.create({
          username: username,
          email: email,
          password: hashPass
        })
        // const [results, fields] = await connection.query(
        //   `INSERT INTO user (email, password, username)
        //    VALUES (?, ?, ?)`, [email, hashPass, username]
        // );
        // console.log(results); // results contains rows returned by server
      } catch (err) {
        console.log(err);
      }
     
}

const getUserList = async () => {
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"]},
    raw: true,
    nest: true
  });

  let roles = await db.Role.findAll({
    attributes: ["url", "description"],
    include: { model: db.Group, where: { id: 1 }, attributes: ["name"]},
    raw: true,
    nest: true
  });

  console.log(">>> check new user: ",newUser);
  console.log(">>> check group-role: ",roles);

  let users = []
  users = await db.User.findAll();
  return users
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    // try {
    //     const [results, fields] = await connection.execute(
    //       `SELECT * FROM user`
    //     );
    //     // console.log(results); 
    //     return results
    //   } catch (err) {
    //     console.log(err);
    //   }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
      where: { id: userId}
    })
  // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // try {
  //   const [results, fields] = await connection.execute(
  //     `DELETE FROM user WHERE id = ?`, [id]
  //   );
  //   return results
  // } catch (err) {
  //   console.log(err);
  // }
}

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {id: id}
  });
  return user.get({ plain: true});

  // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

  // try {
  //   const [results, fields] = await connection.execute(
  //     `SELECT * FROM user WHERE id = ?`, [id]
  //   );
  //   return results
  // } catch (err) {
  //   console.log(err);
  // }
}

const updateUserInfo = async (email,username,id) => {
  await db.User.update(
    {email: email, username: username},
    {
      where: {id: id}
    }
  );

  // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird});

  // try {
  //   const [results, fields] = await connection.execute(
  //     `UPDATE user
  //     SET email = ?, username = ?
  //     WHERE id = ?;`, [email, username, id]
  //   );
  //   return results
  // } catch (err) {
  //   console.log(err);
  // }
}


export {
    createNewUser, getUserList, deleteUser, 
    updateUserInfo, getUserById
}