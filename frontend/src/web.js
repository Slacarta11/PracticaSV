import axios from 'axios';
import { el, icon, td } from './documentUtil.js';
import {notifySuccess} from './util.js';

window.readMovies = function () {
    axios.get('http://localhost:8080/PractivaSV')
        .then((response) => {
            const movieList = response.data; //lee las pelis
            const movieTable = el('tableBody'); //al cambiar el formato a tablas ya no se usa movies como abajo sino que va tableBody
            //const movieUl = el('movies');   //identifica la lista que tiene que llenar


            movieList.forEach(movie => {   
                const row = document.createElement('tr');  //ahora por cada peli vamos a crear una fila por cada peli
                row.id = 'movie-' + movie.id; //buscamos numerar las peliculas para una vez eliminemos la peli no haya que refrescar la pagina web
                row.innerHTML = td(movie.title) +
                                /*'<td>' + movie.description + '</td>' +*/ //en vez de simplificar el td se podrian haber puesto asi pero al crear la variable td cambia todo
                                td(movie.description) +
                                td(movie.year) +
                                '<a class="btn btn-warning" href="modify.html">' +
                                icon('edit') +
                                '</a>' +
                                '<a class= "btn btn-danger" href="javascript:removeMovie(' + movie.id + ')">' +
                                icon('delete') +
                                '</a>';
                                
                movieTable.appendChild(row);  //con esto añadimos la fila del row a la tabla (movieTable)
            });

            window.removeMovie = function(id) {    //nos va a permitir borrar la peli pasado un ID
                    if (confirm('¿Estás seguro de que quieres eliminar la película?')){  //buscamos sacar un letrero de confirmación de si quiere eliminar
                     axios.delete('http://localhost:8080/movies/' + id)  
                        .then((response) => {
                            if (response.status == 204) {
                                notifySuccess('Pelicula eliminada correctamente');
                                el('movie-' + id).remove(); //con esto borramos el elemento de la barra del frontend
                            }
                        });
                    }
            }; 
                
                /* const listItem = document.createElement('li');  //recorre las peliculas del backend y para cada pelicula le crea un elemento li
                listItem.className = 'list-group-item';
                listItem.appendChild(document.createTextNode(movie.title + ' (' + movie.year + ')' + movie.description));
                movieUl.appendChild(listItem);
                })*/
            
        });
}
