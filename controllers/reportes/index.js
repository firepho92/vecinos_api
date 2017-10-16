'use strict';

var mysql = require('mysql');
var config = require('../../config/dbconfig');

var connection = mysql.createConnection(config);

connection.connect();


module.exports = function (router) {


    router.get('/', function (req, res) {
        
        connection.query('SELECT * FROM reportes', function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.post('/', function (req, res) {
        var reporte = req.body;
        connection.query('INSERT INTO reportes SET ?', reporte, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.put('/', function (req, res) {
        var reporte = req.body;
        connection.query('UPDATE reportes SET ? WHERE id_user=?', [reporte, reporte.id_user], function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.delete('/', function (req, res) {
        var reporte = req.body;

        connection.query('DELETE FROM reportes WHERE id_user=?', reporte, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

};
