'use strict';

var mysql = require('mysql');
var config = require('../../config/dbconfig');

var connection = mysql.createConnection(config);

connection.connect();


module.exports = function (router) {


    router.get('/', function (req, res) {
        
        connection.query('SELECT * FROM casas', function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.post('/', function (req, res) {
        var casa = req.body;
        connection.query('INSERT INTO casas SET ?', casa, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.put('/', function (req, res) {
        var casa = req.body;
        connection.query('UPDATE casas SET ? WHERE id_user=?', [casa, casa.id_user], function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.delete('/', function (req, res) {
        var casa = req.body;

        connection.query('DELETE FROM casas WHERE id_user=?', casa, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

};
