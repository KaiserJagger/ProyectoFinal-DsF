                                        /   * Proyecto Final *     /
    
/* 
        Nombre: Nicolas Andreolli
*/
                                    
                             //$$$$$$$   Dinero Sin Fronteras    $$$$$$$$


//Logo


 const typed = new Typed('.typed', {
    strings: [
        '<i class="palabras">Dinero</i>', 
        '<i class="palabras">Sin</i>', 
        '<i class="palabras">Fronteras</i>'
],
// stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
loop: true, // Repetir el array de strings
loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
showCursor: true, // Mostrar cursor palpitanto
cursorChar: '$', // Caracter para el cursor
contentType: 'html', // 'html' o 'null' para texto sin formato

 });
                        

 // Variables de ingreso
 const headerIngreso = document.getElementById("ingreso");
 const formularioDeIngreso = document.getElementById("formulario-de-ingreso");
 
 const cuentas = obtenerCuentas();
 
 const inputNombre = document.getElementById("nombre");
 const inputEmail = document.getElementById("email");
 const inputClave = document.getElementById("clave");
 const salirSesion = document.getElementById("botonSalir");
 
   
                                //Funciones de ingreso de usuario 

function obtenerCuentas(){
    const cuentaLS = localStorage.getItem("cuentas");
    if(cuentaLS !== null){
        return JSON.parse(cuentaLS);
    }
    return [];
}

function usuarioExistente(email){
    return !cuentas.some((el) => {
        return el.email === email;
    });
}


                                /*      Evento de registro      */

 formularioDeIngreso.addEventListener("submit", (event) => {
 
         event.preventDefault();
     
     // Obtenemos los datos del input
     const nombre = inputNombre.value;
     const email = inputEmail.value;
     const clave = inputClave.value;
 
              
             //chequeo que el usuario no este registrado
         if(usuarioExistente(email)){
             
             //cargo los datos en el array
             cuentas.push({
                 nombre : nombre,
                 email: email,
                 clave: clave,
                 });
                      
          localStorage.setItem("cuentas", JSON.stringify(cuentas));
            
          alert("Ingreso correcto");
          mostrarUsuario(nombre);
 
         }else{
             alert("Usuario existente");
         } 
  
         //limpio los input
                 nombre.value = "";
                 email.value = "";
                 clave.value = "";    
            
 
     });

                                    //Evento de salir de sesion
                                    
      function mostrarUsuario(nombre){
        // Limpiar el header
        headerIngreso.innerText = "Bienvenido " + nombre;
       
        const salir = document.createElement("button");
        salir.id = "botonSalir";
        salir.innerText = "Salir";
        salir.type = "button";
      
        headerIngreso.append(salir);
        
        salir.addEventListener("click" ,(event) => {
        event.preventDefault();
        window.location.reload()
        
      });
    
    }
   

                                    //Variables De Conversion
//Arreglo de tipos de cambio
const Cambios = [
    "Pesos Argentinos", 
    "Dolares Estadounidenses",
];
//Descuento por servicios
const desc = 0.10; 

//Precio del dolar en relacion al peso argentino
const dolar = 162.13;

 //Arreglo donde voy almacenar las conversiones
 let historialConversiones = [];


//Funcion de control
function dsf(){

    // Creo el select paises
  const selectCountrys = document.getElementById("select_paises");

        function selectCountry(listCountrys){
            //  Creo las opciones
            for (const paises of listCountrys){        
                const option = document.createElement("option");
                option.innerText = paises.pais;
        
                //Agrego opciones al select
                selectCountrys.append(option);
            }
        }
        //Agrego evento de change
        selectCountrys.addEventListener("change",(event) =>{
            const target = event.target;
            const valor = target.value;
            // console.log(valor)
        });


        //Creo select de tipo de monedas
        const selectMoney = document.getElementById("select_moneda");
         //Creo las opciones
        for (const cambio of Cambios){
            const option = document.createElement("option");
            option.innerText = cambio;

            //Agrego las opciones al sleect
           selectMoney.append(option);
        }
        
        //Agregamos evento de change
        selectMoney.addEventListener("change", (event) => {
            const target = event.target;
            const valor = target.value;
         });

    
            
        // Creo formulario de conversion
        const contenedor = document.getElementById("contenedor");
        const formularioConversion = document.createElement("form");
        formularioConversion.id= "conversion";
        const input = document.createElement("input");
        input.id = "amount";
        input.placeholder = "Monto";
        input.type = "number"; 
        const boton = document.createElement("button");
        boton.id = "boton-de-conversion";
        boton.innerText = "Convertir";
        boton.type = "submit";

        //Obtengo el id de convertidor
        const convertidor = document.getElementById("convertidor");
        convertidor.append(formularioConversion);
        formularioConversion.append(input, boton);
        
        const salidaDeInfo = document.getElementById("salida_info")
        //agrego el div salidaDeInfo al contenedor
        contenedor.append(salidaDeInfo);

        //Informe de conversion
        const p = document.createElement("p");
        p.id = "informe";
        salidaDeInfo.append(p);


                            //Evento de conversion
        
            const conversion = document.getElementById("conversion");
            const enviarConversion = (event) => {
                event.preventDefault();
      
                //obtengo el monto a convertir
                const enterAmount = document.getElementById("amount");
                if (enterAmount.value.length === 0){
                    Toastify({
                        text: "Ingrese un monto a mandar",
                        duration: 1500
                    }).showToast();
                }
                
                //Capturo el monto y lo almaceno en la variable 
                let amount = enterAmount.value;
                
                //Hago la conversion y descuento el porcentaje
                let descTotal = amount * desc;
                
                //Le resto el desceunto que se le aplica por los servicios
                let res = amount - descTotal;

            
                  //Busco si pais existe
                 function buscarPais(pais){
                    return listaPaises.find((el) =>{
                    return el.pais === pais;
                    });
                }

                //Almaceno lo que me devuelve el find
                const paises = buscarPais(selectCountrys.value);
                const informe = document.getElementById("informe");        
                
                //Hago la condicion del tipo de moneda elegido
                if(selectMoney.value === Cambios[0]){
                    paises.convArg = (res * paises.convArg);
                    informe.innerHTML = `<strong> Destino:</strong> ${paises.pais} 
                    <br><strong>Monto $</strong> ${paises.convArg?.toFixed(2)}
                    <br><strong>Moneda:</strong> ${paises.moneda}`
                    //Agrego conversion al array y luego al localStorage
                    historialConversiones.push({
                        Pais : paises.pais,
                        Monto_en_pesos : parseInt(res) + " pesos Arg",
                        Monto_convertido : paises.convArg,
                        Moneda: paises.moneda,
                    });

                    localStorage.setItem("historial", JSON.stringify(historialConversiones));
                    
                    //Muestro por consola el descuento al monto ingresado
                    console.log("La ganancia es: $"+ descTotal + " pesos");


                }else if(selectMoney.value === Cambios[1]){
                    paises.convDolar = (res * paises.convDolar); 
                    informe.innerHTML = `<strong> Destino:</strong> ${paises.pais} 
                    <br><strong>Monto $</strong> ${paises.convDolar?.toFixed(2)}
                    <br><strong>Moneda:</strong> ${paises.moneda}`
                    //Agrego conversion al array y luego al localStorage
                    historialConversiones.push({
                        Pais : paises.pais,
                        Monto_en_pesos : parseInt(res) + " dolares",
                        Moneda: paises.moneda,
                        Monto_convertido : paises.convDolar,
                    });
                    
                    //Convierto dolares a pesos
                    let convAPesos = descTotal * dolar;
                    
                    //Muestro por consola el descuento al monto ingresado
                    console.log("La ganancia es: $"+ convAPesos + " pesos") ;

                    localStorage.setItem("historial", JSON.stringify(historialConversiones));
                    

                }else{

                    Toastify({
                        text: "Ingrese pais y/o tipo de moneda ",
                        duration: 1000
                    }).showToast();
                
                }

 
                //limpio las conversiones
                paises.convArg = 0;
                paises.convDolar = 0;
                renderizarTabla(historialConversiones);
    
        }
            conversion.addEventListener("submit", enviarConversion); 


 

            // --------------- Historial de Conversiones -----------------------

            //Verifico si tengo conversiones en el localStorage
            const conversionesStorage = localStorage.getItem("historial");

            if(conversionesStorage !== null){
               historialConversiones = JSON.parse(conversionesStorage);
            }

            
    //Renderizo la tabla
    function renderizarTabla(historialConversiones){
        const bodyTabla = document.getElementById("body_conversiones");
        bodyTabla.innerHTML = "";

        for(const el of historialConversiones){
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.innerText = el.Pais;

            const td2 = document.createElement("td");
            td2.innerText = el.Monto_en_pesos;

            const td3 = document.createElement("td");
            td3.innerText = el.Monto_convertido.toFixed(2);

            const td4 = document.createElement("td");
            td4.innerText = el.Moneda;

            //Agrego al tr
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);

            //Agregar tr al body
            bodyTabla.append(tr);
        }

        limpiarTabla(bodyTabla);
    }

        //renderizo conversiones por primera vez
        renderizarTabla(historialConversiones);


       //Funcion para limpiar la tabla
        function limpiarTabla(bodyTabla){
            const botonLimpiar = document.getElementById("limpiar");
            botonLimpiar.addEventListener("click", (event) => {
                event.preventDefault();
                swal({
                    title: "Esta seguro?",
                    text: "Una vez eliminado, No podra recuperar el historial de conversiones!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Tabla limpia con exito", {
                        icon: "success",
                        });
                        bodyTabla.innerHTML = "";
                        
                        //limpio resultado
                        informe.innerHTML="";
                        localStorage.removeItem('historial');

                    } 
                  });
                
            });
        }



           
        //Variable global de la consulta al json
        let listaPaises;

        //Consulta al JSON
            fetch("/paises.json")
            .then((response) => {
                return response.json();
            }).then((data) => {
                listaPaises = data;
                selectCountry(listaPaises);
                
                buscarPais(listaPaises)

            })
   
    }
   
dsf();
