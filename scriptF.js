// Inicialización de variables
let tarjetasDescubiertas = 0;
let tar1 = null;
let tar2 = null;
let primerNumero = null;
let segundoNumero = null;
let jugadas = 0;
let aciertos = 0;
let contador = false;
let segundos = 30;
let tiempoAtras = null;
let tiempoInicial = segundos;

//Apuntando a documento HTML
let mostrarJugadas = document.getElementById('jugadas');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTime= document.getElementById('time');

//Generación de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4];
let nuevaP;
let aux;
for (let i = 0; i < numeros.length; i++) {
  nuevaP = Math.floor(Math.random() * parseInt(numeros.length));
  aux = numeros[i];
  numeros[i] = numeros[nuevaP];
  numeros[nuevaP] = aux;
}

//Esto es solo para comprobar el correcto funcionamiento del juego
console.log(numeros);

//Funciones
function contadorTiempo(){
    //Hacemos que disminuya 1 segundo de manera regresiva
    tiempoAtras = setInterval(()=>{
        segundos--;
        mostrarTime.innerHTML = `Tiempo: ${segundos} segundos`;
        //Con esto hacemos que se detenga el contador en 0 y no nos de numeros negativos
        if(segundos == 0){
            document.body.style.background = "black";
            gameOver();
        }
    },1000);
}

function gameOver() {
    clearInterval(tiempoAtras);
    //Ahora bloquearemos las tarjetas y mostraremos los resultados, puesto que ya ha perdido el jugador
    tarjetasBloqueadas();
    alert('💀💀💀💀💀💀CASI LO TIENES.......GAME OVER💀💀💀💀💀💀') 
}

function tarjetasBloqueadas(){
    //Vamos hacer un recorrido por las 8 tarjetas y cuando se haga el recorrido bloqueamos cada una de ellas
    //y mostramos el numero que debió haberse destapado
    for (let i = 0; i <= 7; i++){
        let tarBloqueada = document.getElementById(i);
        tarBloqueada.innerHTML = numeros[i];
        tarBloqueada.disabled = true;
    }
}

//Funcion principal
function descubrir(id){
    
    if(contador == false){
        //Con esta funcion conseguimos que se ejecuta paralelamente mientras estamos jugando al juego
        contadorTiempo();
        //Nunca mas la va a volver a llamar, solamente una vez como esta en falso, ejecuta la funcion contar tiempo
        //y el contador se vuelve activo es decir en true y de ahi nunca mas lo va a inicializar.
        contador= true;
    }

    tarjetasDescubiertas++;
    //Esto es solo para comprobar el correcto funcionamiento del juego
    console.log(tarjetasDescubiertas);

    if(tarjetasDescubiertas == 1){
        //Se muestra el primer numero y asociamos los 8 botones con los 8 elementos del array desordenado
        tar1 = document.getElementById(id);
        primerNumero = numeros[id]
        //Lo guardamos en una variable para luego comparar un primer numero con un segundo numero
        tar1.innerHTML = primerNumero;
        //Deshabilitamos primera tarjeta
        tar1.disabled = true;

    }else if(tarjetasDescubiertas == 2){
        //Se muestra el segundo numero y asociamos los 8 botones con los 8 elementos del array desordenado
        tar2= document.getElementById(id);   
        segundoNumero = numeros[id];
        //Lo guardamos en una variable para luego comparar el segundo numero con el primer numero
        tar2.innerHTML = segundoNumero;
        //Deshabilitamos segunda tarjeta
        tar2.disabled = true;

        //Incrementar jugadas y lo hacemos aqui, porque cada jugada se contabilizaria al descubrir la segunda tarjeta
        jugadas++;
        //Escribimos las jugadas dentro del HTML
        mostrarJugadas.innerHTML = `Jugadas: ${jugadas}`;

        if(primerNumero == segundoNumero){
            //Si son iguales, reseteamos tarjetas descubiertas para poder descubrir un par de tarjetas más
            tarjetasDescubiertas = 0;

            //Aumentamos aciertos
            aciertos++;
            //Escribimos los aciertos dentro del HTML
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            
            //Si el jugador ha acertado las 8 pares de tarjetas, es decir si ha levantado correctamente las 16 tarjetas
            //Le vamos a mostrar un mensaje de admiración al jugador
            if(aciertos == 4){
                clearInterval(tiempoAtras);
                document.body.style.backgroundImage = "url('ganador.jpg')";
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😮`
                mostrarTime.innerHTML = `Genial!!👊 tardaste ${tiempoInicial - segundos} segundos`
                mostrarJugadas.innerHTML=`Jugadas: ${jugadas} 👏👏😎`
            }

        }else{
            //Como no son iguales mostramos momentaneamente valores y lo volvemos a tapar
            setTimeout(()=>{
                //Hacemos el efecto que se quita el valor mostrado
                tar1.innerHTML = ' ';
                tar2.innerHTML = ' ';
                //Como no son iguales ponemos el disabled del boton en falso para que ahora si se pueda clicar una segunda vez
                tar1.disabled = false;
                tar2.disabled = false;
                //No son iguales, reseteamos tarjetas destapadas para poder destapar un par de tarjetas más
                tarjetasDescubiertas = 0;
            },750);
        }
    }
}
