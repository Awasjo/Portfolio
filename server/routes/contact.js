let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Contact model
let Contact = require('../models/contact');
let contactController = require('../controllers/contact');

/* Get route for Contact list - READ Operation */
router.get('/',contactController.displayContactList);
//get route for displaying add page -create operation
router.get('/add',contactController.displayAddPage);

//post route for processing the add page -create operation
router.post('/add',contactController.processAddPage);

//get route for displaying edit page -update operation
router.get('/edit/:id',contactController.displayEditPage);

//post route for processing the edit page -update operation
router.post('/edit/:id',contactController.processEditPage);

//get route for displaying delete page -delete operation
router.get('/delete/:id',contactController.performDelete);

module.exports = router;