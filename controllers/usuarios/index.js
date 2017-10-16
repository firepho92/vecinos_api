'use strict';

var mysql = require('mysql');
var config = require('../../config/dbconfig');

var connection = mysql.createConnection(config);

connection.connect();


module.exports = function (router) {


    router.get('/', function (req, res) {
        
        connection.query('SELECT * FROM usuarios', function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.post('/', function (req, res) {
        var usuario = req.body;
        connection.query('INSERT INTO usuarios SET ?', usuario, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.put('/', function (req, res) {
        var usuario = req.body;
        connection.query('UPDATE usuarios SET ? WHERE id_user=?', [usuario, usuario.id_user], function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.delete('/', function (req, res) {
        var usuario = req.body;

        connection.query('DELETE FROM usuarios WHERE id_user=?', usuario, function (error, results, fields) {
            if(error) throw error;
            res.send(results);
        });
        
    });

    router.post('/login', function (req, res) {
        var usuario = req.body;

        connection.query('SELECT * FROM usuarios WHERE usuario=?', usuario.usuario, function (error, results, fields) {
            if(error) throw error;
            if(results.length === 0){
                res.send("Error usuario o contraseña inválidos");
            }else{
                if(usuario.contraseña != results[0].contraseña){
                    res.send("Error usuario o contraseña inválidos");
                }else{
                    res.send(results);
                }
            }
        });
    });

};
