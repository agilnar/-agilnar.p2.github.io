// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivo = null;
let tiempoInicial = 30;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');

//Generación de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
//Esto es solo para comprobar el correcto funcionamiento del juego
console.log(numeros);

//Funciones
function contarTiempo(){
    //Hacemos que disminuya 1 segundo de manera regresiva
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        //Con esto hacemos que se detenga el contador en 0 y no nos de numeros negativos
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            //Ahora bloquearemos las tarjetas y mostraremos los resultados, puesto que ya ha perdido el jugador
            bloquearTarjetas();
            alert('💀💀💀💀💀💀CASI LO TIENES.......GAME OVER💀💀💀💀💀💀') 
        }
    },1000);
}

function bloquearTarjetas(){
    //Vamos hacer un recorrido por las 16 tarjetas y cuando se haga el recorrido bloqueamos cada una de ellas
    //y mostramos el numero que debió haberse destapado
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){
    
    if(temporizador == false){
        //Con esta funcion conseguimos que se ejecuta paralelamente mientras estamos jugando al juego
        contarTiempo();
        //Nunca mas la va a volver a llamar, solamente una vez como esta en falso, ejecuta la funcion contar tiempo
        //y el temporizador se vuelve activo es decir en true y de ahi nunca mas lo va a inicializar.
        temporizador = true;
    }

    tarjetasDestapadas++;
    //Esto es solo para comprobar el correcto funcionamiento del juego
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Se muestra el primer numero y asociamos los 16 botones con los 16 elementos del array desordenado
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        //Lo guardamos en una variable para luego comparar un primer resultado con un segundo resultado
        tarjeta1.innerHTML = primerResultado;
        //Deshabilitamos primer boton
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        //Se muestra el segundo numero y asociamos los 16 botones con los 16 elementos del array desordenado
        tarjeta2= document.getElementById(id);   
        segundoResultado = numeros[id];
        //Lo guardamos en una variable para luego comparar el segundo resultado con el primer resultado
        tarjeta2.innerHTML = segundoResultado;
        //Deshabilitamos segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos y lo hacemos aqui, porque cada movimiento se contabilizaria al destapar la segunda tarjeta
        movimientos++;
        //Escribimos los movimientos dentro del HTML
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Si son iguales, reseteamos tarjetas destapadas para poder destapar un par de tarjetas más
            tarjetasDestapadas = 0;

            //Aumentamos aciertos
            aciertos++;
            //Escribimos los aciertos dentro del HTML
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            
            //Si el jugador ha acertado las 8 pares de tarjetas, es decir si ha levantado correctamente las 16 tarjetas
            //Le vamos a mostrar un mensaje de admiración al jugador
            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😮`
                mostrarTiempo.innerHTML = `Genial!!👊 tardaste ${tiempoInicial - timer} segundos`
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} 👏👏😎`
            }

        }else{
            //Como no son iguales mostramos momentaneamente valores y lo volvemos a tapar
            setTimeout(()=>{
                //Hacemos el efecto que se quita el valor mostrado
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                //Como no son iguales ponemos el disabled del boton en falso para que ahora si se pueda clicar una segunda vez
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                //No son iguales, reseteamos tarjetas destapadas para poder destapar un par de tarjetas más
                tarjetasDestapadas = 0;
            },750);
        }
    }
}
