'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/mustering/getpresensi')
    .get(todoList.getPresensi);

  
};