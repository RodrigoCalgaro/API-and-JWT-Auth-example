const express = require('express');
const router = express.Router();
const passport = require('passport');
const productoController = require('./../controllers/productoController');

/* Get All */
router.get('/', passport.authenticate("jwt", { session: false }), productoController.getAll);

/* Add */
router.post('/', passport.authenticate("jwt", { session: false }), productoController.add)

/* Get by id */
router.get('/:id', passport.authenticate("jwt", { session: false }), productoController.get)

/* Update by id */
router.put('/:id', passport.authenticate("jwt", { session: false }), productoController.update)

/* Delete by id */
router.delete('/:id', passport.authenticate("jwt", { session: false }), productoController.delete)


module.exports = router;