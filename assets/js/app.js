function cargarContenido() {
    // funcion que cargue las cotizaciones
    cargarCotizaciones(mostrarCotizacion);
    // funcion que cargue los elementos

    // funcion que cargue los textos

}

async function cargarCotizaciones(callback) {
    
    let promesa1 = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    callback(await promesa1.json());

    let promesa2 = await fetch('https://open.er-api.com/v6/latest/USD');
    let datos2 = await promesa2.json();
    document.getElementById('usdEur').append(datos2.rates.EUR);

    let datos3 = await crearPedido('https://open.er-api.com/v6/latest/ARS');
    document.getElementById('usdArs').append(datos3.rates.USD);
}

function mostrarCotizacion(datos){
    document.getElementById('btc').append(datos.bpi.USD.rate);
}

async function crearPedido(url){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function(){
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }else{
                reject(xhr.statusText);
            }
        }
        xhr.send();
    })
}