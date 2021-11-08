const express = require('express');
const router = express.Router();
const security = require('../security/verifier');

const mysqlConnection = require('../configurations/db-conf');
const jwt = require('jsonwebtoken');

/*Estudiantes*/

router.get('/estudiantes', security,(req,res)=>{
    console.log('get lista estudiantes')
    mysqlConnection.query('select e.id, e.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.direccion, e.carnet, e.fecha_ingreso, e.status from estudiante e join persona p on e.id_persona = p.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.get('/estudiantes/:id', security,(req,res)=>{
    console.log('get estudiante')
    mysqlConnection.query('select e.id, e.id_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.direccion, e.carnet, e.fecha_ingreso, e.status from estudiante e join persona p on e.id_persona = p.id where e.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/estudiantes', security,(req,res)=>{
    console.log('Insert estudiantes')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into estudiante (id_persona, fecha_ingreso, carnet, status) values (?,?,?,?)',
    [emp.id_persona, emp.fecha_ingreso, emp.carnet, emp.status], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});


router.put('/estudiantes/:id', security,(req,res)=>{
    console.log('Update estudiantes')
    let emp=req.body;
    mysqlConnection.query('update estudiante set id_persona = ?, fecha_ingreso = ?, carnet = ?, status = ? where id = ?',
    [emp.id_persona, emp.fecha_ingreso, emp.carnet, emp.status, req.params.id], (err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.delete('/estudiantes/:id', security,(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from estudiante where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

router.get("/inicio", security,(req, res) => {
    console.log("get lista Persona");
    mysqlConnection.query('select p.nombre, p.apellido, e.carnet from estudiante e join persona p on e.id_persona = p.id', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
}); 

module.exports = router;