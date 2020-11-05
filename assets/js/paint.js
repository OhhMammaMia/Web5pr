let canvas = document.getElementById('draw');
context = canvas.getContext("2d");

 // додаємо обробники подій миші
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();


let colorArray = new Array(); // ========= массив с цветами ==========
let thicknessArray = new Array(); // ========== массив с толщиной кисти ========


let paint;
let mouseX;
let mouseY;

//розкоментуйте якщо використовуєте layout з практичною
//необхідно отримати додактовий offset
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;



// =================== переменная текущего цвета кисти ===================
let paintColor = new String("#df4b26");
// =================== переменная текущей толщины кисти ===================
let paintThickness = 5;

// =================== ползунок ширины кисти ===================
let rangePaintSize = document.getElementById('brushSizeSelector');


canvas.addEventListener('mousedown', function (e){
   /*mouseX = e.pageX - this.offsetLeft;
   mouseY = e.pageY - this.offsetTop;*/
   
/* версія для нашої розмітки */
   mouseX = e.pageX - this.offsetLeft - offsetLeft;
   mouseY = e.pageY - this.offsetTop - offsetTop;
   
   paint = true;
   addClick(mouseX, mouseY, paintColor, paintThickness);
   redraw();
});
canvas.addEventListener('mousemove', function (e){
   if(paint){
       //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

/* версія для нашої розмітки*/
       addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, paintColor, paintThickness, true);

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

function addClick(x, y, color, thickness, dragging)
{
   clickX.push(x);
   clickY.push(y);
   
   colorArray.push(color);
   thicknessArray.push(thickness);
   
   clickDrag.push(dragging);
}

function redraw(){
   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

   context.lineJoin = "round";

   for (var i=0; i < clickX.length; i++) {
		context.strokeStyle = colorArray[i]; // ========= устанавливаю цвет рисования ==========
		context.lineWidth = thicknessArray[i]; // ======== устанавливаю ширину кисти =========
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
	
	colorArray.splice(0, colorArray.length);
	thicknessArray.splice(0, thicknessArray.length);
}

// =================== изменение цвета линии ===================
function setColor(color) {
	paintColor = color;
	//redraw();
}


// =================== настройка ширины кисти ===================
rangePaintSize.addEventListener('change', function () {
	paintThickness = this.value;
	//redraw();
}, false);

rangePaintSize.addEventListener('input', function () {
    paintThickness = this.value;
	//redraw();
}, false);