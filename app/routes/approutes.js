'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/mustering/vaksin/penerima/list')
    .get(todoList.getPenerimaVaksin);

  app.route('/mustering/tempattinggal/get')
    .get(todoList.getTempatTinggal);

  app.route('/mustering/getpresensi')
    .get(todoList.getPresensi);

  
};