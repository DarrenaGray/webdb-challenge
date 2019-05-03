const router = require('express').Router();

const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects
        .getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem retrieving the projects." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects
        .getProject(id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "The project with the specified ID could not be found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "The project could not be retrieved." });
        });
});

router.post('/', (req, res) => {
    const projectInfo = req.body;
    Projects
        .addProject(projectInfo)
        .then(project => {
            res.status(200).json({ project, message: "The project was successfully added!" });
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem adding this project." });
        });
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Projects
        .getProjectActions(id)
        .then(project => {
            if (project.length !== 0) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: "The project with the specified ID could not be found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem getting the actions for this project." });
        });
});

module.exports = router;