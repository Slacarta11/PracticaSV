import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const notifyError = function (message) {   //función notify que tiene cómo parámetro mensaje (este notify lo usaremos cuando haya un error)
    Toastify({
        text: message,
        duration: 2000, //tiempo que dura el toast en mseg
        gravity: 'bottom',
        position: "center",
        style: {
            background: "red",
        },
    }).showToast();
};

const notifySuccess = function (message) {
    Toastify({
        text: message,
        duration: 2000,
        position: "center",
        gravity: 'top',
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
};

module.exports = {
    notifyError,
    notifySuccess
};