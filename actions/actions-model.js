const db = require('../data/dbConfig');
const mappers = require('../mappers/mappers');

module.exports = {
    get: function(id) {
      let query = db('actions');
  
      if (id) {
        return query
          .where('id', id)
          .first()
          .then(action => mappers.actionToBody(action));
      }
  
      return query.then(actions => {
        return actions.map(action => mappers.actionToBody(action));
      });
    },
    addAction: function(action) {
      return db('actions')
        .insert(action)
        .then(([id]) => this.get(id));
    },
}