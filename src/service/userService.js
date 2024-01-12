import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import bluebird from 'bluebird';
const salt = bcrypt.genSaltSync(10)

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  });


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password)
    try {
        const [results, fields] = await connection.query(
          `INSERT INTO users (email, password, username)
           VALUES (?, ?, ?)`, [email, hashPass, username]
        );
        // console.log(results); // results contains rows returned by server
      } catch (err) {
        console.log(err);
      }
     
}

const getUserList = async () => {
    try {
        const [results, fields] = await connection.execute(
          `SELECT * FROM users`
        );
        // console.log(results); 
        return results
      } catch (err) {
        console.log(err);
      }
}

const deleteUser = async (id) => {
  try {
    const [results, fields] = await connection.execute(
      `DELETE FROM users WHERE id = ?`, [id]
    );
    return results
  } catch (err) {
    console.log(err);
  }
}

const getUserById = async (id) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`, [id]
    );
    return results
  } catch (err) {
    console.log(err);
  }
}

const updateUserInfo = async (email,username,id) => {
  try {
    const [results, fields] = await connection.execute(
      `UPDATE users
      SET email = ?, username = ?
      WHERE id = ?;`, [email, username, id]
    );
    return results
  } catch (err) {
    console.log(err);
  }
}


export {
    createNewUser, getUserList, deleteUser, 
    updateUserInfo, getUserById
}