import bcrypt from "bcrypt";

const saltRounds = 10;

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password); 