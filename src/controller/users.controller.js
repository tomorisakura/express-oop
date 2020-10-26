const Connection = require('../config/config');
const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const privateProps = new WeakMap();

class UsersController extends Connection{

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

    create(req, res) {
        try {
            const name = req.body.name;
            const username = req.body.username;
            const password = req.body.password;

            const token = jwt.sign({ data : username }, 'secret_key');

            return Users.findOne({
                username : username
            }).then(result => {
                if(result !== null) {
                    res.send({
                        method : req.method,
                        status : 'failure',
                        message : 'username already exists'
                    })
                } else {
                    const response = new Users({
                        name : name,
                        username : username,
                        password : password
                    });

                    response.save();

                    res.send({
                        method : req.method,
                        status : 'success',
                        token : token,
                        results : response
                    });
                }
            }).catch(results => {
                throw results;
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

module.exports = UsersController;