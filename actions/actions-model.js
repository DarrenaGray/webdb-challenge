const db = require('../data/dbConfig');

module.exports = {
    getActions,
    addAction,
}

function getActions() {
    return db('actions');
}

function addAction(action) {
    return db('actions')
        .insert(action)
        .then(ids => {
            return({ id: ids[0] })
        });
}