var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){
    var query = "SELECT * FROM serveur ORDER BY Nom_serveur ";
    database.query(query, function(error, data){
        if(error) {
            throw error; 
        } else {
            response.render('sample_data', {title:'Moniteur de Processus Métier', action:'list', sampleData:data});
        }
    });
});

router.get("/add", function(request, response, next){
    response.render("sample_data", {title:'Moniteur de Processus Métier', action:'add'});
});

router.get("/addservice", function(request, response, next){
    var query = "SELECT * FROM serveur";
    database.query(query, function(error, serveurs){
        if(error) {
            throw error; 
        } else {
            response.render('add_service', {title:'Moniteur de Processus Métier', serveurs: serveurs});
        }
    });
});

router.post("/add", function(request, response, next){
    var id = request.body.id;
    var nom = request.body.nom;
    var adresse_ip = request.body.adresse_ip;
    var etat = request.body.etat;

    var query = `
        INSERT INTO serveur 
        (Nom_serveur,Adresse_ip,Password, Etat) 
        VALUES ("${id}", "${nom}", "${adresse_ip}", "${etat}")
    `;

    database.query(query, function(error, data){
        if(error) {
            throw error;
        } else {
            response.redirect("/sample_data");
        }
    });
});

router.post("/addservice", function(request, response, next){
    var serveurId = request.body.serveur;
    var serviceNom = request.body.service;

    var query = `
        INSERT INTO service (nom, serveurIp)
        SELECT "${serviceNom}", Adresse_ip
        FROM serveur
        WHERE id = ${serveurId}
    `;

    database.query(query, function(error, data){
        if(error) {
            throw error;
        } else {
            response.redirect("/sample_data");
        }
    });
});

module.exports = router;
