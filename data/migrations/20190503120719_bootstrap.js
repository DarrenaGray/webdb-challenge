
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();

        tbl
            .string('name')
            .notNullable();

        tbl
            .text('description')
            .notNullable();

        tbl
            .boolean('completed').defaultTo(false);
    })
    .createTable('actions', tbl => {
        tbl.increments();

        tbl
            .string('description')
            .notNullable();
        
        tbl
            .text('notes')
            .notNullable();
        
        tbl
            .boolean('completed').defaultTo(false);

        tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');

    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};
