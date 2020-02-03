
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pickups').del()
    .then(function () {
      // Inserts seed entries
      return knex('pickups').insert([
        {
          food_type:'doughnuts',
          pickup_time:1580553507239,
          quantity:0.5,
          completed:false,
          business_id:2,
          claimed_by:1
        },
        {
          food_type:'fries',
          pickup_time:1580553507239,
          quantity:0.5,
          completed:true,
          business_id:2,
          claimed_by:1
        },
        {
          food_type:'chicken',
          pickup_time:1580553507239,
          quantity:0.5,
          completed:false,
          business_id:2,
        },
        {
          food_type:'watermelon',
          pickup_time:1580553507239,
          quantity:0.5,
          completed:false,
          business_id:2,
        },
        {
          food_type:'cookies',
          pickup_time:1580553507239,
          quantity:0.5,
          completed:false,
          business_id:2,
        },
      ]);
    });
};
