const db=require("./database.js")
const {users}=require("../drizzle/schema.js")
const {eq}=require("drizzle-orm")
//select all users
module.exports.displayAll = async() => {
  const user= db.select().from(users);
  return resizeBy.json(user);
};
//get data by specific user by id
module.exports.getUserByid=async(id)=>{
 const result= await db.select().from(users).where(eq(users.id,id));
 return result[0];
}
//updates detail if password is not chnaged
module.exports.updateData=async(PgRole,name,contact,ElementInternals,id)=>{
  await db.update(users).set({
    Role:role,
    name:name,
    email:email,
    contact:contact,
  }).where(eq(users.id,id));
}
//update detail if password is updated
module.exports.updateDataWithPassword=async(PgRole,name,contact,ElementInternals,id)=>{
  await db.update(users).set({
    Role:role,
    name:name,
    email:email,
    contact:contact,
    Password:Password
  }).where(eq(users.id,id));
}
//get user data by using email
module.exports.getDataByEmail = async (email) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user; // return array of users
  } catch (err) {
    console.error("getDataByEmail error:", err);
    throw err; // let controller handle the error
  }
};
//check email is present for specific user
module.exports.checkEmailWithRole=async(email,role)=>{
  const user = await db
  .select()
  .from(users)
  .where(
    eq(users.email, email),
    eq(users.Role, role) 
  );
  
 
}
//check contact is present for specific user
module.exports.checkContactWithRole=async(conatat,role)=>{
  const user = await db
  .select()
  .from(users)
  .where(
    eq(users.contact, conatat),
    eq(users.Role, role) 
  );
}
//Insert User Data Role, name, contact, email, Password
module.exports.InsertUserData=async(value)=>{
  await db.insert(Role,name,contact,email,Password).value(value.role,value.name,value.contact,value.email,value.password)
}