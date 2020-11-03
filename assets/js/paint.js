let canvas = document.getElementById('draw');
context = canvas.getContext("2d");

 // додаємо обробники подій миші
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;

//розкоментуйте якщо використовуєте layout з практичною
//необхідно отримати додактовий offset
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;



// =================== переменная цвета кисти ===================
let paintColor = new String("#df4b26");
// =================== переменная толщины кисти ===================
let paintThickness = 5;

// =================== ползунок ширины кисти ===================
let rangePaintSize = document.getElementById('brushSizeSelector');


canvas.addEventListener('mousedown',function (e){
   /*mouseX = e.pageX - this.offsetLeft;
   mouseY = e.pageY - this.offsetTop;*/
   
/* версія для нашої розмітки */
   mouseX = e.pageX - this.offsetLeft - offsetLeft;
   mouseY = e.pageY - this.offsetTop - offsetTop;
   
   paint = true;
   addClick(mouseX, mouseY);
   redraw();
});
canvas.addEventListener('mousemove', function (e){
   if(paint){
       //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

/* версія для нашої розмітки*/
       addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);

       redraw();
	   
   }
});
canvas.addEventListener('mouseup',function (e){
   paint = false;
});
canvas.addEventListener('mouseleave',function (e){
   paint = false;
});

//Малювання:

function addClick(x, y, dragging)
{
   clickX.push(x);
   clickY.push(y);
   clickDrag.push(dragging);
}

function redraw(){
   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

   context.strokeStyle = paintColor; // устанавливаю цвет рисования
   context.lineJoin = "round";
   context.lineWidth = paintThickness;

   for (var i=0; i < clickX.length; i++) {
       context.beginPath();
       if(clickDrag[i] && i){
           context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
           context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
   }
}

// =================== функция очистки области ===================
function clearArea() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // очистка поля рисования
	clickX.splice(0, clickX.length);
	clickY.splice(0, clickY.length);
	clickDrag.splice(0, clickDrag.length);
}

// =================== изменение цвета линии ===================
function setColor(color) {
	paintColor = color;
	redraw();
}


// =================== настройка ширины кисти ===================
rangePaintSize.addEventListener('change', function () {
	paintThickness = this.value;
	redraw();
}, false);

rangePaintSize.addEventListener('input', function () {
    paintThickness = this.value;
	redraw();
}, false);