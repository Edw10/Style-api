'use strict';

const router = require('express').Router();

const { UserController } = require('../controllers');
const { AuthMiddleware } = require('../middleware');

router.get('/user', AuthMiddleware, UserController.getUsers); // cambiar autentificacion (ningun usuario cliente puede acceder a esta ruta)
router.get('/user/id/:uid', AuthMiddleware, UserController.getUser);
router.get('/login/user', UserController.loginUser);
router.post('/user', UserController.signupUser);
router.put('/user/id/:uid', AuthMiddleware, UserController.updateUser);
router.delete('/user/id/:uid', AuthMiddleware, UserController.deleteUser);

module.exports = router;