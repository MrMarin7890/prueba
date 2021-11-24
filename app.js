const express = require('express');
const mysql = require('mysql');

const bodyParser = require ('body-parser');

const PORT = process.env.PORT || 40089;

const app = express();

app.use(bodyParser.json());

//Mysql
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prueba_garzalimon',
});

//Rutas
app.get('/', (req,res)=>{
    res.send('Prueba de automatizacion de estacionamiento.');
})

//Bitacora de los vehiculos
app.get('/vehiculos',(req,res)=>{
    const sql = 'SELECT * FROM bitacora';
    connection.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length> 0){
            res.json(results);
        }else{
            res.send('No se encontro los datos.');
        }
    });
});

app.post('/agregar',(req,res)=>{
    const sql1= 'INSERT INTO bitacora SET ?';
    const sql2 = 'SELECT TIMESTAMPDIFF(Tiempo_inicio,Tiempo_salida) FROM bitacora';

    const bitacoraOBJ ={
        Fecha : req.body.Fecha,
        Tiempo_inicio : req.body.Tiempo_inicio,
        Tiempo_salida : req.body.Tiempo_salida,
        Duracion_tiempo : req.body.Duracion_tiempo,
        Tipo_privilegio : req.body.Tipo_privilegio,
        Cobro_pago : req.body.Cobro_pago,
    }

    connection.query(sql,(error, results)=>{
        if(error) throw error;
        res.send('Registro exitoso!')
    });
})


//Check conexion
connection.connect(error =>{
    if(error) throw error;
    console.log('Servidor de base de datos conectado.')
});

app.listen(PORT,() => {
console.log(`Server running on port ${PORT}`);
});
