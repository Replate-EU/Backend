
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('volunteer_accounts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('volunteer_accounts').insert([
        {
          name:'Sunny McGoodperson',
          user_id:1
        }
      ]);
    });
};
