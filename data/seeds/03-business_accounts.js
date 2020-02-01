
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('business_accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('business_accounts').insert([
        {
          name:'Local Doughnuts',
          address:'1 Doughnut St.',
          user_id:2
        }
      ]);
    });
};
