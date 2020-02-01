const hashedTestPassword = require('bcryptjs').hashSync('12345', 12);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username:'imhelping',
          password:hashedTestPassword,
          user_type: 'volunteer',
          contact_number: '+4-408-048-99-16'
        },
        {
          username:'fooddotcom',
          password:hashedTestPassword,
          user_type: 'business',
          contact_number: '+4-408-048-99-16'
        }
      ]);
    });
};
