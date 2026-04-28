function cargarNoticias() {
    // Variables
    var objHttp = null;
    var datos = "";
    var objeto_json;
    var cadena = "";
    var i = 0;

    // Comprobación
    if (window.XMLHttpRequest) {
        objHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        objHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    objHttp.open("GET", "datos/noticias.json", true);

    // Definimos qué pasa cuando cambia el estado
    objHttp.onreadystatechange = function () {
        if (objHttp.readyState == 4) {
            // Recogemos el texto devuelto por el JSON
            datos = objHttp.responseText;

            objeto_json = eval("(" + datos + ")");

            // Recorremos el vector de noticias
            for (i = 0; i < objeto_json.noticias.length; i++) {
                cadena = cadena + "<h2>" + objeto_json.noticias[i].titulo + "</h2>";
                cadena = cadena + "<p>" + objeto_json.noticias[i].contenido + "</p><hr/>";
            }

            // Resultado
            document.getElementById('caja_noticias').innerHTML = cadena;
        }
    }

    // Enviamos la petición
    objHttp.send(null);
}

function cambiarImagen(rutaNueva) {
    // Seleccionamos la imagen principal con jQuery
    var $imagen = $('#imagen_grande');

    // Hacemos que desaparezca
    $imagen.fadeOut('fast', function () {
        $(this).attr('src', rutaNueva);
        $(this).fadeIn('fast');
    });
}

// --- FUNCIONES PARA EL PRESUPUESTO Y FORMULARIO ---

function calcularPresupuesto(formulario) {
    var precio = parseFloat(formulario.tipo_ayuda.value);
    var cantidad = parseInt(formulario.cantidad.value);
    var total = 0;

    // Controlamos que no sean NaN si el usuario borra la cantidad
    if (isNaN(precio)) { precio = 0; }
    if (isNaN(cantidad)) { cantidad = 0; }

    total = precio * cantidad;

    // Mostramos el resultado
    formulario.total.value = total + " €";
}

function validarFormulario(formulario) {
    var valido = "s";
    var mensaje = "";

    // Validación de campos vacíos
    if (formulario.nombre.value == "") {
        valido = "n";
        mensaje = mensaje + "- El campo nombre no puede estar vacío.\n";
    }

    // Validación de email
    var regex_email = /^(.+@.+\..+)$/;
    if (!regex_email.test(formulario.email.value)) {
        valido = "n";
        mensaje = mensaje + "- El email introducido no es válido.\n";
    }

    // Comprobación de que se ha seleccionado una opción válida
    if (formulario.tipo_ayuda.value == "0") {
        valido = "n";
        mensaje = mensaje + "- Debes seleccionar un tipo de ayuda.\n";
    }

    // Validación de la cantidad
    var cantidad = parseInt(formulario.cantidad.value);
    if (isNaN(cantidad) || cantidad <= 0) {
        valido = "n";
        mensaje = mensaje + "- La cantidad debe ser un número mayor que cero.\n";
    }

    // Validación del checkbox 
    if (formulario.terminos.checked == false) {
        valido = "n";
        mensaje = mensaje + "- Debes aceptar los términos de la donación.\n";
    }

    // Resolución final
    if (valido == "s") {
        alert("¡Presupuesto validado correctamente!\nTotal a aportar: " + formulario.total.value + "\nGracias por tu solidaridad.");
    } else {
        alert("Se han encontrado los siguientes errores:\n" + mensaje);
    }
}

// --- FUNCIONES PARA EL MAPA DINÁMICO DE CONTACTO ---

function cambiarMapa(sede) {
    var iframe = document.getElementById('mapa_dinamico');

    if (sede == 'ginebra') {
        // Coordenadas de la sede en Suiza
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.0841280807755!2d6.136582515570258!3d46.20840507911634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c6526ac434a9b%3A0x42b10a9a9526742!2sGinebra%2C%20Suiza!5e0!3m2!1ses!2ses!4v1680000000000!5m2!1ses!2ses";
    } else if (sede == 'madrid') {
        // Coordenadas de la sede en España
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194348.1398101484!2d-3.8196205562725515!3d40.437869800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid!5e0!3m2!1ses!2ses!4v1680000000000!5m2!1ses!2ses";
    }
}