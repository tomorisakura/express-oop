const Connection = require('../config/config');
const Note = require('../model/note');
const privateProps = new WeakMap();

class NoteController extends Connection {

    constructor() {
        super();
        privateProps.set(this.databaseConnection());
    }

    create(req, res) {
        try {
            const username = req.body.username
            const title = req.body.title;
            const content = req.body.content;
            const response = new Note({
                username : username,
                title : title,
                content : content
            });
            response.save();
    
            return res.send({
                method : req.method,
                status : 'success',
                results : response
            });
        } catch (error) {
            throw error;
        }
    }

    async getNotes(req, res) {
        try {
            const response = await Note.find();
            return res.send({
                method : req.method,
                status : 'success',
                results : response
            });
        } catch (error) {
            throw error;
        }
    }

    async getNotesByUser(req, res) {
        try {
            const username = req.params.username;
            const response = await Note.find({
                username : username
            });

            return res.send({
                method : req.method,
                status : 'success',
                results : response
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NoteController;