const {mysqlTable,serial,varchar,timestamp} = require("drizzle-orm/mysql-core");

module.exports = {
  user: mysqlTable("users", {
    id: serial("id").primaryKey(),

    Role: varchar("Role", { length: 20 }).notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    contact: varchar("contact", { length: 20 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    Password: varchar("Password", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  }),
};