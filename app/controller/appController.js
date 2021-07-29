'use strict';

var Mustering = require('../model/appModel.js');

var response = require('../../res.js');

exports.getTempatTinggal = function(req, res) {

  Mustering.getTempatTinggal(req.query, function(err, values) {    
    if (err)
      res.send(err);

    response.ok(values, res);
  });
};


exports.getPresensi = function(req, res) {

  Mustering.getPresensi(req.query, function(err, values) {    
    if (err)
      res.send(err);

    response.ok(values, res);
  });
};
