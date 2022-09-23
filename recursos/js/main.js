// Listas con productos y sus valores del INE

let id = ['']
let val = ['', 10.7, 39, 15.2, 25, 12.8, 30.3, 7.1, 10, 15.2, 9.8, 10.6, 17.6, 11.8, 8, 7.7, 9.7, 10.8, 9.3, 8.5, 11.5, 26, 26.3, 17.3, 14.6, 17.1, 22.4, 31.8, 13.2, 4.6, 15.3, 17.2, 10.7, 12.6, 4.9, 6.7, 10.5, 26.5, 11.1, 17.7, 9.7, 13.7, 13, 10.2, 9, 6.8, 9]
let items = ['', 'Arroz', 'Harinas y otros cereales', 'Pan', 'Otros productos de panadería', 'Pizza y quiche', 'Pastas alimenticias y cuscús', 'Cereales de desayuno', 'Otros productos a base de cereales',  'Carne de vacuno',  'Carne de porcino', 'Carne de ovino y caprino', 'Carne de ave',  'Otras carnes', 'Despojos comestibles', 'Carne seca, salada o ahumada', 'Pescado fresco o refrigerado', 'Pescado congelado', 'Marisco fresco o refrigerado', 'Marisco congelado', 'Pescado y marisco seco, ahumado o salado', 'Leche entera', 'Leche desnatada',  'Yogur', 'Queso', 'Otros productos lácteos', 'Huevos', 'Mantequilla', 'Aceite de oliva', 'Frutos secos y frutos de cáscara', 'Patatas', 'Patatas chips', 'Azúcar', 'Confituras, mermeladas y miel', 'Chocolate', 'Productos de confitería', 'Helados', 'Salsas y condimentos', 'Sal, especias y hierbas culinarias', 'Alimentos para bebé', 'Platos preparados', 'Café', 'Té', 'Cacao y chocolate en polvo', 'Agua mineral o de manantial', 'Refrescos', 'Zumos de frutas y vegetales']                                                                 
let sliders = [''];
let consultaPrecios = [''];

for (i = 1; i <= items.length; i++){
	id.push(i);
};

let cprimero = document.getElementById("cuantoIncremento");
let csegundo = document.getElementById("cuantoAntes");
let pprimero = document.getElementById("pestana-primero");
let psegundo = document.getElementById("pestana-segundo");



let primeroAbierta = function() {
	
  cprimero.style.display = 'flex';
  csegundo.style.display = 'none';
  
  pprimero.style.backgroundColor = '#cc0000';
  pprimero.style.color = 'white';
  
  psegundo.style.backgroundColor = '#cb9595';
  psegundo.style.color = 'white';
 

for (j = 0; j < items.length; j++){
	
	let item = items[j].toString();
	
		sliders.push(`
	<div class="producto" id="producto${id[j]}">
	<label for="sliderProducto">${item}</label>
	<br>
	<span>-100%</span><input type="range" min="-100" max="100" value="0" id="rangeslider${id[j]}" class="slider" step="0.1"><span>100%</span>
	<p id="respuesta">Respuesta: <span id="numrespuesta${id[j]}">0%</span></p>
	<div id="mensaje${id[j]}"><p style="color: #a3a3a3">Mueve la rueda para consultar si se ha incrementado o reducido.</p></div>
	</div>`)
}

cprimero.innerHTML = sliders.join('');

let removeFirst = document.getElementById("producto")
removeFirst.remove();

for (k = 1; k <= items.length; k++){
	let item = items[k].toString();
	let valINE = val[k];
	let rangeslider = document.getElementById(`rangeslider${k}`);
	let output = document.getElementById(`numrespuesta${k}`);
	let mensaje = document.getElementById(`mensaje${k}`);
	rangeslider.oninput = function() {
		output.innerHTML = this.value + '%'
		let num = output.innerHTML
		num = parseFloat(num)
		let diferenciaVal = num - valINE;
			if (num === valINE) {
				mensaje.innerHTML = `<p>Correcto.<br>El precio del ${item.toLowerCase()} se ha incrementado un ${num}%</p>`;
				mensaje.style.color = '#0b7703';
				mensaje.style.fontWeight = 'bold';
			} else if ((diferenciaVal < 20 && diferenciaVal >= 5) || (diferenciaVal > -20 && diferenciaVal <= -5)) {
				mensaje.innerHTML = `<p>El incremento introducido se acerca al correcto</p>`;
				mensaje.style.color = '#fd9d06';
				mensaje.style.fontWeight = 'bold';
			} else if (diferenciaVal < 5 && diferenciaVal > -5 ) {
				mensaje.innerHTML = `<p>El incremento introducido es casi correcto</p>`;
				mensaje.style.color = '#b2cc06';
				mensaje.style.fontWeight = 'bold';
			} else {
				mensaje.innerHTML = 'Incorrecto'
				mensaje.style.color = '#ca0000';
				mensaje.style.fontWeight = 'bold';
			}
	}
}
};

pprimero.addEventListener('click', primeroAbierta); 

let segundoAbierta = function() {
  cprimero.style.display = 'none';
  csegundo.style.display = 'flex';
  
  pprimero.style.backgroundColor = '#cb9595';
  pprimero.style.color = 'white';
  
  psegundo.style.backgroundColor = '#cc0000';
  psegundo.style.color = 'white';
  
  cprimero.innerHTML = '';
  csegundo.innerHTML = '';

for (l = 0; l < items.length; l++){
	let item2 = items[l].toString();
	let valINE2 = val[l];
	
		consultaPrecios.push(`
	<div class="producto" id="consultaProducto${id[l]}">
	<label for="introPrecio">${item2}</label>
	<p style="color: #a3a3a3">Su precio se ha incrementado un <span id="valINE${id[l]}">${valINE2}%</span> el ultimo año.<br></p>
	<div class="bloqueconsulta">
	<input type="number" value="0" step="0.1" id="introPrecio${id[l]}" name="introPrecio" class="inputText">
	<div id="consulta${id[l]}" class="consulta">Consultar</div>
	</div>
	<p id="mensajeCalculadora${id[l]}" class="mensajeCalculadora" style="line-height: 1.5rem">Sin aplicar la variación del IPC su precio sería <span id="incrementoDeshecho${id[l]}">0€</span></p>
	</div>`
	)
}
	
	csegundo.innerHTML = consultaPrecios.join('');
	let removeFirst2 = document.getElementById("consultaProducto")
	removeFirst2.remove();

for (m = 1; m <= items.length; m++){
	let valINE = val[m];
	let introPrecio = document.getElementById(`introPrecio${m}`);
	let incrementoDeshecho = document.getElementById(`incrementoDeshecho${m}`);
	
	let botonCalculadora = document.getElementById(`consulta${m}`)
	let mensajeCalculadora = document.getElementById(`mensajeCalculadora${m}`)
	let botonCalculadoraAbierto = function() {
		mensajeCalculadora.style.display = 'block';
	}
	
	botonCalculadora.addEventListener('click', botonCalculadoraAbierto);
	
	introPrecio.oninput = function(){
		let numero = this.value;
		let valorFinal = numero/((valINE/100)+1);
		valorFinal = parseFloat(valorFinal).toFixed(2)
		if (valorFinal){
			incrementoDeshecho.innerHTML = valorFinal + '€';
		} else {
			mensajeCalculadora.innerHTML = '';
		}
	}
}

}  

psegundo.addEventListener('click', segundoAbierta);







