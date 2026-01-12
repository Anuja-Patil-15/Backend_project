const db=require("./database.js")
const {user}=require("../drizzle/schema.js")
const {eq,and}=require("drizzle-orm")
const drizzleHelper={};
//select all users
drizzleHelper.displayAll = async() => {
  const users=await db.select().from(user);
  return users;
};
//get data by specific user by id
drizzleHelper.getUserByid=async(id)=>{
 const result= await db.select().from(user).where(eq(user.id,id));
 return result[0];
}
//updates detail if password is not chnaged
drizzleHelper.updateData=async(role,name,contact,email,id)=>{
  await db.update(user).set({
    Role:role,
    name:name,
    email:email,
    contact:contact,
  }).where(eq(user.id,id));
}
//update detail if password is updated
drizzleHelper.updateDataWithPassword=async(role,name,contact,email,id,password)=>{
  await db.update(user).set({
    Role:role,
    name:name,
    email:email,
    contact:contact,
    Password:password
  }).where(eq(user.id,id));
}
//get user data by using email
drizzleHelper.getDataByEmail = async (email) => {
  return await db
    .select()
    .from(user)
    .where(eq(user.email, email));
};
//check email is present for specific user
drizzleHelper.checkEmailWithRole=async(email,role)=>{
  const users = await db
  .select()
  .from(user)
  .where(
  and(
    eq(user.email, email),
    eq(user.Role, role)
  )
);
return users;
  
 
}
//check contact is present for specific user
drizzleHelper.checkContactWithRole=async(contact,role)=>{
  const users = await db
  .select()
  .from(user)
  .where(
  and(
    eq(user.contact, contact),
    eq(user.Role, role)
  )
);
  return users;
}
//Insert User Data Role, name, contact, email, Password
drizzleHelper.InsertUserData = async (value) => {
  return await db.insert(user).values({
    Role: value.role,
    name: value.name,
    contact: value.contact,
    email: value.email,
    Password: value.password,
  });
};
//Reset the password
drizzleHelper.resetPassword=async(password,id)=>{
  await db.update(user).set({Password:password}).where(eq(id,user.id));
}
module.exports=drizzleHelper;