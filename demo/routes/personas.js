const express = require('express');
const security = require('../security/verifier');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*PERSONAS*/

router.get('/personas',security,(req,res)=>{
    console.log('get lista personas')
    mysqlConnection.query('Select * from persona',(err,rows,fields)=>{
        if(!err){
            res.status(200).send(rows);
        }else{
            console.log(err);
            res.status(200).send('Error');
        }
    })
});

router.get('/personas/:id', security,(req,res)=>{
    console.log('get persona')
    mysqlConnection.query('Select * from persona where id = ?', [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/personas', security,(req,res)=>{
    console.log('Insert personas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into persona (nombre, apellido, fecha_nacimiento, direccion) values (?,?,?,?)',
    [emp.nombre,emp.apellido,emp.fecha_nacimiento,emp.direccion],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/personas/:id', security,(req,res)=>{
    console.log('Update personas')
    let emp=req.body;
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ? where id = ?',
    [emp.nombre, emp.apellido, emp.fecha_nacimiento, emp.direccion, req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.delete('/personas/:id', security,(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from persona where id = ?',
    [req.params.id],(err,result)=>{
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