const express = require ('express');
const cors = require ('cors');
const knex = require('knex');

const app = express ();
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'pedidos.db'
    },
    useNullAsDefault: true
})

app.get('/PracticaSV/:pedidoId', async (req,res) => {
    const pedido =await db ('pedidos').select('*').where({ id:req.params.pedidoId}).first();
    res.json(pedido);
});

app.get('/pedidos', async (req, res) => {
    const pedidos=await db ('pedidos').select('*');
    res.json(pedidos);
})

app.post('/pedidos', async (req, res) => {
    //registra info en la base de datos
    await db('pedidos').insert({
        fecha: req.body.fecha,
        hora: req.body.description,
        numero: req.body.year
    });
    res.status(201).json({});
});

app.put('/PracticaSV/:pedidoId', async (req, res) => {
    /* para modificar los datos de una peli*/
    await db('pedidos').update({
        fecha: req.body.fecha,
        hora: req.body.hora,
        numero: req.body.numero,
        precio:req.body.precio,
        cantidad: req.body.cantidad
    }) .where ({id: req.params.pedidoId});
    res.status(204).json({});
});

app.delete('/PracticaSV/:pedidoId', async (req, res) => {
    // para borrar los datos de una peli
    await db('pedidos').del().where({id: req.params.pedidoId});
    res.status(204).json({});
});

app.listen(8080, () => {
    console.log("El backend ha iniciado en el puerto 8080"); 
});