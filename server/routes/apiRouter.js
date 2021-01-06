const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router
    .route('/client')
    .get(clientController.index)
    .post(clientController.create)
router
    .route('/client/:id')
    .get(clientController.show)
    .patch(clientController.update)
    .delete(clientController.delete)

module.exports = router;