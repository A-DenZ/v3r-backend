import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}).promise();




// async function getUser() {
//   const [rows] = await pool.query("SELECT * FROM `user`");

//   return rows;

// }

// const users =  await getUser();

// console.log(users);



export default pool;