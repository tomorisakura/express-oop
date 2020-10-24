const express = require('express').Router();
const Controller = require('../controller/index');
const Auth = require('../middleware/auth');

const router = express;
const authorization = new Auth().authorization;

router.post('/api/post', new Controller().create);

//middleware
router.use(authorization);
router.get('/api/get', new Controller().get);
router.patch('/api/update/:username', new Controller().update);
router.delete('/api/delete/:username', new Controller().delete);

module.exports = router;