const contendor1 = document.getElementById("contendor-info1");
const contendor2 = document.getElementById("contendor-info2");
const areaEncrip = document.getElementById("texto_encriptado");
const areaTextos = document.getElementById("casilla_texto");

var vocales = ['e', 'i', 'a', 'o', 'u'];
var encriptacion =["enter", "imes", "ai", "ober", "ufat"];
let vocal = 'aeiou';
let letrasNoPermitidas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let vocalAcentuada = 'áéíóú';


contendor2.style.display = "none";

function Encriptar(){
    var texto = areaTextos.value;
    var resultado = "";
    sinTexto(texto);
    if(verficarTexto(texto)){
        colocarTexto(resultado = "", areaEncrip);
        return
    }

    for(let letra of texto){
        if(letra != " "){
            
            if(vocal.indexOf(letra) !== -1){
                for(var i=0; i < vocales.length; i++){
                    if(vocales[i] == letra){
                        letra = encriptacion[i];
                    }
                }
            }

        }
        resultado +=  letra;
    }
    colocarTexto(resultado, areaEncrip);
}

function Desencriptar(){
    var texto = areaTextos.value;
    var resultado = "";

    sinTexto(texto);
    if(verficarTexto(texto)){
        colocarTexto(resultado = "", areaEncrip);
        return
    }

    var itr;

    for(itr=0; itr < texto.length; itr++){
        if(texto[itr] != " "){

            if(vocal.indexOf(texto[itr]) !== -1){
                for(var i=0; i < vocales.length; i++){
                    if(vocales[i] == texto[itr]){
                        resultado +=  texto[itr];
                        itr += encriptacion[i].length - 1;
                    }
                }
            }else{
                resultado +=  texto[itr];
            }

        }else{
            resultado +=  texto[itr];
        }
        
    }
    colocarTexto(resultado, areaEncrip);
}

function esMayuscula(letra)
{
    return letra == letra.toUpperCase();
}

function verficarTexto(texto){
        for(let letra of texto){
            if(letra != " "){
                if(letrasNoPermitidas.indexOf(letra) !== -1){
                    alert("El texto contiene letras mayusculas: - "+letra+" - \nEl programa solo permite letras minúsculas.");
                    return true;
                }
        
                if(vocalAcentuada.indexOf(letra) !== -1){
                    alert("Las vocales deben de estar sin acentos")
                    return true;
                }
            }
        }
    return false;
}

function sinTexto(texto){
    if(texto == ""){
        alert("Debe ingresar texto para realizar la operacion");
        return
    }
}

function colocarTexto(texto, area){
    area.value = texto;
    alternarContenedores(area.value);
}


function alternarContenedores(texto){
    if(texto != ""){
        contendor1.style.display = 'none';
        contendor2.style.display = 'block';
    }else{
        contendor2.style.display = 'none';
        contendor1.style.display = 'block';
    }
}

function copiarPegarTexto(){
    var texto = areaEncrip.value;
    areaEncrip.value = "";
    colocarTexto(texto, areaTextos);
}

function copiarTextoPortaPapeles(){
    var texto = areaEncrip.value;
    navigator.clipboard.writeText(texto)
        .then(() => {
        alert("Texto copiado!");
        areaTextos.value = "";
    })
        .catch(err => {
        alert("Que raro!? ocurrio un error...");
    })
}

function DesencriptarV2(){
    var texto = areaTextos.value;
    var resultado = "";

    sinTexto(texto);
    if(verficarTexto(texto)){
        colocarTexto(resultado = "", areaEncrip);
        return
    }

    var itr;

    for(itr=0; itr < texto.length; itr++){
        if(texto[itr] != " "){

            if(vocal.indexOf(texto[itr]) !== -1){
                for(var i=0; i < vocales.length; i++){
                    if(vocales[i] == texto[itr]){
                        resultado +=  texto[itr];
                        itr += buscarPatronEncriptado(texto, itr, i);
                    }
                }
            }else{
                resultado +=  texto[itr];
            }

        }else{
            resultado +=  texto[itr];
        }
        
    }
    console.log(resultado);
    colocarTexto(resultado, areaEncrip);
}


function buscarPatronEncriptado(texto, itr, i){
    for(var x=1; x < encriptacion[i].length; x++){
        if(texto[itr + x] !== encriptacion[i].charAt(x)){
            return 0;
        }
    }
    return encriptacion[i].length - 1;
}