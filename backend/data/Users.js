import bcrypt from "bcryptjs";
const users = [
  {
    name: "Aniket Habib",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Guest",
    email: "guest@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Yash",
    email: "yash@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Kiran",
    email: "kiran@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Somu",
    email: "somu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
