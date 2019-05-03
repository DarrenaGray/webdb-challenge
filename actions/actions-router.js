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

module.exports = router;