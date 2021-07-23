'user strict';
var sql = require('../../db.js');

// var unique = require("array-unique").immutable;
var moment = require('moment-timezone');
// var async = require('async');
// var await = require('await');
var Promise = require('promise');

//Task object constructor
var Mustering = function(task){
    
};


function getPresensi(dataQuery, callback){
    let params = [dataQuery.sd, dataQuery.ed, dataQuery.jenis]

    let txt = "SELECT t.id, t.kondisi_saat_ini, p.nama, p.nrp, t.tempat_tinggal_lat, t.tempat_tinggal_lon "
    txt += ", no_hp, no_wa, pk.nama as pangkat, p.jenis_pegawai, d.nama as dinas, p.satuan, t.kondisi_saat_ini as kondisi "
    txt += " FROM presensi t "
    txt += " LEFT JOIN pegawai p ON t.pegawai_id = p.id "
    txt += " LEFT JOIN pangkat pk ON p.pangkat_id = pk.id "
    txt += " LEFT JOIN dinas d ON p.dinas_id = d.id "
    txt += " WHERE (t.created_at BETWEEN ? AND ?) AND p.jenis_pegawai = ? "
    txt += " ORDER BY t.pegawai_id, t.created_at DESC limit 50 "
    
    sql.query(txt,params,function(err, res){
        if(err)
        {
            console.log(err)
            callback(err,null)
        }

        else
            callback(null,res)
    })
}

Mustering.getPresensi = getPresensi
module.exports= Mustering;