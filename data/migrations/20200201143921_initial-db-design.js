exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .text("username")
        .unique()
        .notNullable();
      users.text("password").notNullable();
      users.text("user_type").notNullable();
      users.text("contact_number").notNullable();
    })
    .createTable("business_accounts", business => {
      business.increments();
      business.text("name").notNullable();
      business.text("address").notNullable();
      business
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("volunteer_accounts", volunteer => {
      volunteer.increments();
      volunteer.text("name").notNullable();
      volunteer
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("pickups", pickups => {
      pickups.increments();
      pickups.text("food_type").notNullable();
      pickups.integer("pickup_time").unsigned().notNullable();
      pickups.decimal("quantity").notNullable();
      pickups.boolean("completed").defaultTo(false);
      pickups
        .integer("business_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      pickups
        .integer("claimed_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("pickups")
    .dropTableIfExists("volunteer_accounts")
    .dropTableIfExists("business_accounts")
    .dropTableIfExists("users");
};
