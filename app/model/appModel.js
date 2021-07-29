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

function getTempatTinggal(dataQuery, callback){
    
    let txt = "SELECT p.id, p.nama, p.nrp, p.tempat_tinggal_lat, p.tempat_tinggal_lon "
    txt += ", no_hp, no_wa, pk.nama as pangkat, p.jenis_pegawai, d.nama as dinas, p.satuan,"
    txt += " u.email, "
    txt += " FROM pegawai p"
    txt += " LEFT JOIN pangkat pk ON p.pangkat_id = pk.id "
    txt += " LEFT JOIN dinas d ON p.dinas_id = d.id "
    txt += " LEFT JOIN user u ON p.id = u.pegawai_id "
    txt += " WHERE p.created_at > 20210728000001 "
    txt += " ORDER BY p.nrp ASC, p.created_at DESC "
    
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

function getPresensi(dataQuery, callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT t.id, p.nama, p.nrp, t.lat, t.lng, p.tempat_tinggal_lat, p.tempat_tinggal_lon "
    txt += ", no_hp, no_wa, pk.nama as pangkat, p.jenis_pegawai, d.nama as dinas, p.satuan, t.kondisi_saat_ini as kondisi, "
    txt += " t.pegawai_id as pid "
    txt += ", u.email, t.lokasi_dirawat_lat, t.lokasi_dirawat_lon, t.lokasi_isoman_lat, t.lokasi_isoman_lon "
    txt += " FROM presensi t "
    
    txt += " LEFT JOIN pegawai p ON t.pegawai_id = p.id "
    txt += " LEFT JOIN pangkat pk ON p.pangkat_id = pk.id "
    txt += " LEFT JOIN dinas d ON p.dinas_id = d.id "
    txt += " LEFT JOIN user u ON t.pegawai_id = u.pegawai_id "
    txt += " WHERE (t.created_at BETWEEN ? AND ?) "
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
Mustering.getTempatTinggal = getTempatTinggal
module.exports= Mustering;