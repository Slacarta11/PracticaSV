import axios from 'axios';
import {notifyError, notifySuccess} from './alertas.js';
import { prependListener } from 'process';

window.addPedido = function () {
   
    const fecha = document.getElementById('fecha').value; 
    const hora = document.getElementById('hora').value;
    const numero = document.getElementById('numero').value;
    const cantidad = document.getElementById('cantidad').value;

    if (fecha == '') {  
        notifyError('La fecha es un campo obligatorio');   
        return;
    }

    axios.post('http://localhost:8080/pedidos', { 
            fecha: fecha, 
            hora: hora,
            numero: numero,
            precio:cantidad*20,
            cantidad: cantidad
        }); 
    
   
        notifySuccess('Pedido registrada');

   
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('cantidad').value = '';
};