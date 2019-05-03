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

module.exports = router;