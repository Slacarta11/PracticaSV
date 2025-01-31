import axios from 'axios';
import { icon, td } from './documentUtil';

window.readPedidos = function () {
    axios.get('http://localhost:8080/pedidos')
        .then((response) => {
            const pedidosList = response.data; 
            const pedidosTable = document.getElementById('tableBody');


            pedidosList.forEach(pedido => {   
                const row = document.createElement('tr');  
                row.id = 'pedido-' + pedido.id; 
                row.innerHTML = td(pedido.fecha) +
                                td(pedido.hora) +
                                td(pedido.numero) +
                                td(pedido.precio) +
                                td(pedido.cantidad) +
                                '<a class="btn btn-warning" href="modify.html">' +
                                icon('edit') +
                                '</a>' +
                                '<a class= "btn btn-danger" href="javascript:removePedido(' + pedido.id + ')">' +
                                icon('delete') +
                                '</a>';
                                
                pedidosTable.appendChild(row);  
            });

            window.removePedido = function(id) {   
                    if (confirm('¿Estás seguro de que quieres eliminar el pedido?')){  
                     axios.delete('http://localhost:8080/pedidos/' + id)  
                        .then((response) => {
                            if (response.status == 204) {
                                notifySuccess('Pedido eliminado');
                                document.getElementById('pedido-' + id).remove(); 
                            }
                        });
                    }
            } 
        });
}
