const express = require('express').Router();
const UsersController = require('../controller/users.controller');
const NoteController = require('../controller/note.controller');
const Auth = require('../middleware/auth');

const router = express;
const authorization = new Auth().authorization;

router.post('/api/post', new UsersController().create);

//middleware
router.use(authorization);
router.get('/api/get', new UsersController().get);
router.patch('/api/update/:username', new UsersController().update);
router.delete('/api/delete/:username', new UsersController().delete);

router.get('/api/notes/get', new NoteController().getNotes);
router.post('/api/notes/post', new NoteController().create);
router.get('/api/notes/get/:username', new NoteController().getNotesByUser);

module.exports = router;