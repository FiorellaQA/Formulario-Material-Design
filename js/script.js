// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
(function() {
  //var formulario = document.getElementById("form1")
  var formulario = document.formulario_registro, //accede a todo el documento que tenga el name="formulario_registro"
    elementos = formulario.elements;

  // Funcion que se ejecuta cuando el evento click es activado

  var validarInputs = function() {
    for (var i = 0; i < elementos.length; i++) {
      // Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
      if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
        // Si es tipo texto, email o password vamos a comprobar que esten completados los input
        if (elementos[i].value.length == 0) {
          console.log('El campo ' + elementos[i].name + ' esta incompleto');
          elementos[i].className = elementos[i].className + " error"; //sumamos a la clase que tenga + clase error
          return false;
        } else { //Si escribio contenido le quitamos la clase error
          elementos[i].className = elementos[i].className.replace(" error", "");
        }
      }
    }

    // Comprobando que las contraseñas coincidan
    if (elementos.pass.value !== elementos.pass2.value) {
      elementos.pass.value = ""; //Reseteamos
      elementos.pass2.value = ""; //reseteamos
      elementos.pass.className = elementos.pass.className + " error";
      elementos.pass2.className = elementos.pass2.className + " error";
    } else {
      elementos.pass.className = elementos.pass.className.replace(" error", ""); //si encuentra la clase error, la quita!
      elementos.pass2.className = elementos.pass2.className.replace(" error", "");
    }

    return true;
  };

  var validarRadios = function() {
    var opciones = document.getElementsByName('sexo'),//ambos input tiene el name=sexo y a sí accedemos a ambos
      resultado = false;

    for (var i = 0; i < elementos.length; i++) {
      if (elementos[i].type == "radio" && elementos[i].name == "sexo") {
        // Recorremos los radio button
        for (var o = 0; o < opciones.length; o++) {
          if (opciones[o].checked) {
            resultado = true;
            break;
          }
        }

        if (resultado == false) {
          elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
          console.log('El campo sexo esta incompleto');
          return false;
        } else {
          // Eliminamos la clase Error del radio button
          elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
          return true; //para que en la función principal ENVIAR sea true y pase al siguiente If()
        }
      }
    }
  };

  var validarCheckbox = function() {
    var opciones = document.getElementsByName('terminos'),
      resultado = false;

    for (var i = 0; i < elementos.length; i++) {
      if (elementos[i].type == "checkbox") {
        for (var o = 0; o < opciones.length; o++) {
          if (opciones[o].checked) {
            resultado = true;
            break;
          }
        }

        if (resultado == false) {
          elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
          console.log('El campo checkbox esta incompleto');
          return false;
        } else {
          // Eliminamos la clase Error del checkbox
          elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
          return true;
        }
      }
    }
  };

  var enviar = function(e) {
    if (!validarInputs()) { //si validarInputs es falso..
      console.log('Falto validar los Input');
      e.preventDefault(); //prevenir el comportamiento del boton, para que los datos no se envien
    } else if (!validarRadios()) {
      console.log('Falto validar los Radio Button');
      e.preventDefault();
    } else if (!validarCheckbox()) {
      console.log('Falto validar Checkbox');
      e.preventDefault();
    } else {
      console.log('Envia');
      //comentar linea cuando tengamos el formulario listo!!!!! Para que el formulario se envie
      e.preventDefault();
    }
  };
//FUNCIONES BLUR Y FOCUS
  var focusInput = function() {//cuando da click en el input:
    //parentElement(elemento padre) en nuestro caso es el "div -- input-group"
    this.parentElement.children[1].className = "label active"; //AGREGANDO LA CLASE="LABEL ACTIVE"
    //Reemplazamos la clase error por vacio // quitamos la clase error
    this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
  };

  var blurInput = function() { //cuando da click fuera del input------
    if (this.value <= 0) { //SI EL INPUT ESTA VACIO
      this.parentElement.children[1].className = "label"; //Agregamos la clase ="label" y ---quitamos "active"
      this.parentElement.children[0].className = this.parentElement.children[0].className + " error"; //concatenamos la clase:error
    }
  };

  // --- Eventos ---
  formulario.addEventListener("submit", enviar);
  //Recorre todos los elementos del formulario.
  for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
      elementos[i].addEventListener("focus", focusInput);
      elementos[i].addEventListener("blur", blurInput);
    }
  }

}())