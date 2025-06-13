function cargarContenido() {
    // funcion que cargue las cotizaciones
    cargarCotizaciones(mostrarCotizacion);
    // funcion que cargue los elementos
    cargarElementos();
    // funcion que cargue los textos
    cargarTextos();
}

async function cargarCotizaciones(callback) {
    
    await delay(2500);
    
    let promesa1 = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    callback(await promesa1.json());

    let promesa2 = await fetch('https://open.er-api.com/v6/latest/USD');
    let datos2 = await promesa2.json();
    document.getElementById('usdEur').append(datos2.rates.EUR);

    let datos3 = await crearPedido('https://open.er-api.com/v6/latest/ARS');
    document.getElementById('usdArs').append(datos3.rates.USD);

    document.getElementById('imgEspera').style.visibility = 'hidden';

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

function cargarElementos(){
    document.getElementById('imgLogo').setAttribute('src', 'assets/img/logo.png');
    document.getElementById('titulo').textContent = "Cotizaciones online";
    document.getElementById('imgEspera').setAttribute('src', 'assets/img/loading.gif');
    document.getElementById('imgEspera').style.visibility = 'visible';
}

function cargarTextos() {
    document.getElementById('usdEur').append("EUR a USD: ");
    document.getElementById('usdArs').append("ARG a USD: ");
    document.getElementById('btc').append("Bitcoin a USD: ");
}

function delay(ms){
    return new Promise(function(res){
        setTimeout(res, ms);
    })
}