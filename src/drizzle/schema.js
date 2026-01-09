const {mysqlTable,serial,varchar,timestamp} = require("drizzle-orm/mysql-core");

module.exports = {
  users: mysqlTable("user", {
    id: serial("id").primaryKey(),
    Role: varchar("Role", { length: 20 }),
    contact: varchar("contact", { length: 20 }),
    email: varchar("email", { length: 50 }),
    Password: varchar("Password", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }),
};
