
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: '1', description: 'Action 1', notes: 'This is action 1.'},
        {project_id: '2', description: 'Action 2', notes: 'This is action 2.'},
        {project_id: '3', description: 'Action 3', notes: 'This is action 3.'}
      ]);
    });
};
