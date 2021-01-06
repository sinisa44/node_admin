const express = require('express');
const clientController = require('../controllers/clientController');
const domainController = require('../controllers/domainController');

const router = express.Router();

//CLIENT
router
    .route('/client')
    .get(clientController.index)
    .post(clientController.create)
router
    .route('/client/:id')
    .get(clientController.show)
    .patch(clientController.update)
    .delete(clientController.delete)

//DOMAIN
router.route('/domain')
    .get(domainController.index)
    .post(domainController.create);

router.route('/domain/:id')
    .get(domainController.show)
    .patch(domainController.update)
    .delete(domainController.delete)

module.exports = router;