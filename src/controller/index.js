const Connection = require('../config/config');
const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const privateProps = new WeakMap();

class Controller extends Connection{

    constructor() {
        super();
        privateProps.set(this.databaseConnection());
    }

    async get(req, res) {
        try {
            const response = await Users.find();
            return res.send({
                method : req.method,
                status : 'success',
                results : response
            });
        } catch (error) {
            throw error
        }
    }

    async create(req, res) {
        try {
            const name = req.body.name;
            const username = req.body.username;
            const password = req.body.password;
    
            const response = await new Users({
                name : name,
                username : username,
                password : password
            }).save();

            const token = jwt.sign({ data : username }, 'secret_key');

            return res.send({
                method : req.method,
                status : 'success',
                token : token,
                results : response
            });
        } catch (error) {
            throw error;
        }
    }

    async update(req, res) {
        try {
            const username = req.params.username;
            return await Users.updateOne(
                {username : username},
                {$set : req.body},
                (err) => {
                    if(err) {
                        res.send({
                            method : req.method,
                            status : 'failure',
                            message : 'failed update data',
                            response : err
                        });
                    } else {
                        res.send({
                            method : req.method,
                            status : 'success',
                            message : 'Success update data !'
                        });
                    }
                });
        } catch (error) {
            throw error;
        }
    }

    async delete(req, res) {
        try {
            const username = req.params.username;
            return await Users.deleteOne(
                {username : username},
                (err) => {
                    if(err) {
                        res.send({
                            method : req.method,
                            status : 'failure',
                            message : 'failed delete data',
                            response : err
                        });
                    } else {
                        res.send({
                            method : req.method,
                            status : 'success',
                            message : 'success delete data'
                        });
                    }
                });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Controller;