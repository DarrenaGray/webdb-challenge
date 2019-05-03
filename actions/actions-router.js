const router = require('express').Router();

const Actions = require('./actions-model');

router.get('/', (req, res) => {
    Actions
        .getActions()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem retrieving the actions" });
        });
});

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    Actions
        .addAction({ project_id, description, notes })
        .then(action => {
            res.status(201).json({ action, message: "The actions was succesfully added!" });
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem adding the action." });
        });
});

module.exports = router;