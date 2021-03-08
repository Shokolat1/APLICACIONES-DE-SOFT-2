document.querySelectorAll('section').forEach(element=>{
    element.style.display='none';
})

estado=prompt("¡Hola!, ¿cómo estás?");

alert("Así que "+estado+ " eh? Bueno, eso no importa por ahora. Hoy haremos algo divertido.");

var result = 0;

num1=prompt("Dame un número porfas");
num1=parseInt(num1);
num2=prompt("Dame otro número");
num2=parseInt(num2);

result = num1+num2
result/=2;

alert("Felicidades, tu promedio de los números es: "+result);

do{
    sino=prompt("¿Te pareció divertido esto? Dime que sí. >:( ");

    switch(sino){
        case "si":
        alert("Qué bueno, bienvenido a la página.");
        break;

        case "no":
        alert("A ver, intentemos esto de nuevo.");
        break;
        
        default:
        alert("No manshe, ¡responda bien!");
        break;
    }
}while(sino!= "si");


// ejecucion de funciones
/* function uno(){
    console.log("funcion uno");
}
function dos(){
    console.log("funcion dos");
}

uno();
dos(); */


//simulando funcion asincrona
/* function uno(){
    setTimeout(function(){console.log("funcion uno")},1000);
}
function dos(){
    console.log("funcion dos");
}

uno();
dos(); */

//usando callback
/* function uno(fn){
    setTimeout(function(){
                            console.log("funcion uno");
                            fn();
                        },1000);
}
function dos(){
    console.log("funcion dos");
}

uno(dos); */


// function uno(fn){
//     setTimeout(function(){
//                             console.log("funcion uno");
//                             fn();
//                         },1000);
// }
// function dos(){
//     setTimeout(function(){
//         console.log("funcion dos");
//     },1000);
// }

// uno(dos);


let _definicion = document.getElementById('_definicion')
let _funcion = document.getElementById('_funcion')
let _asincronia = document.getElementById('_asincronia')
let _callback = document.getElementById('_callback')
let _nota = document.getElementById('_nota')

document.querySelectorAll('.opt').forEach(element=>{
    element.addEventListener('click', function(e){
        document.querySelectorAll('section').forEach(element=>{
            element.style.display='none';
        })
        console.log(e.target);
        /*  */
        switch(e.target.id){
            case "definicion":
                _definicion.style.display='block';
                break;
            case "funcion":
                _funcion.style.display='block';
                break;
            case "asincronia":
                _asincronia.style.display='block';
                break;
            case "callback":
                _callback.style.display='block';
                break;
            case "nota":
                _nota.style.display='block';
                break;
        }
    })
})
