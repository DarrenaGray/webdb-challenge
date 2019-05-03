const db = require('../data/dbConfig');
const mappers = require('../mappers/mappers');

module.exports = {
    getProjects,
    getProject,
    getProjectActions,
    addProject,
}

function getProjects() {
    return db('projects');
}

function getProject(id) {
    let query = db('projects as p');
  
    if (id) {
      query.where('p.id', id).first();
  
      const promises = [query, this.getProjectActions(id)];
  
      return Promise.all(promises).then(function(results) {
        let [project, actions] = results;
  
        if (project) {
          project.actions = actions;
  
          return mappers.projectToBody(project);
        } else {
          return null;
        }
      });
    }
  
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }

  function getProjectActions(projectId) {
    return db('actions')
      .where('project_id', projectId)
      .then(actions => actions.map(action => mappers.actionToBody(action)));
  }

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(([id]) => {
            return this.get(id)
        });
}