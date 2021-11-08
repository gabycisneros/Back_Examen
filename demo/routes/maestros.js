const express = require('express');
const router = express.Router();
const security = require('../security/verifier');

const mysqlConnection = require('../configurations/db-conf');
const jwt = require('jsonwebtoken');

/*Maestros*/

router.get('/maestros', security,(req,res)=>{
    console.log('get lista maestros')
    mysqlConnection.query('select d.id, d.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.direccion, d.fecha_ingreso from docente d join persona p on d.id_persona = p.id',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.get('/maestros/:id', security,(req,res)=>{
    console.log('get maestro')
    mysqlConnection.query('select d.id, d.id_persona ,p.nombre, p.apellido, p.fecha_nacimiento, p.direccion, d.fecha_ingreso from docente d join persona p on d.id_persona = p.id where d.id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/maestros', security,(req,res)=>{
    console.log('Insert maestros')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
    [emp.id_persona, emp.fecha_ingreso], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.put('/maestros/:id',security,(req,res)=>{
    console.log('Update maestros')
    let emp=req.body;
    mysqlConnection.query('update docente set id_persona = ?, fecha_ingreso = ? where id = ?',
    [emp.id_persona, emp.fecha_ingreso, req.params.id], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.delete('/maestros/:id', security,(req,res)=>{
    console.log('Delete maestro')
    mysqlConnection.query('delete from docente where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;