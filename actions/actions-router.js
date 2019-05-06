const router = require('express').Router();

const Actions = require('./actions-model');

router.get('/', (req, res) => {
    Actions
        .get()
        .then(actions => {
            if (actions.length !== 0) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: "There are no actions." });
            }
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
            res.status(201).json({ action, message: "The action was succesfully added!" });
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem adding the action." });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const actionInfo = req.body;
    Actions
        .updAction(id, actionInfo)
        .then(updAction => {
            if (updAction) {
                res.status(200).json({ updAction, message: "The action was succesfully updated!" });
            } else {
                res.status(404).json({ message: "The action with the specified ID could not be found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem updating the action." });
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Actions
        .delAction(id)
        .then(delAction => {
            if (delAction) {
                res.status(200).json({ delAction, message: "The action was successfully deleted!" });
            } else {
                res.status(404).json({ message: "The action with the specified ID could not be found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err, message: "There was a problem deleting the action." });
        });
});

module.exports = router;