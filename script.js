console.log("starting the app!");

const closePopup = () => {
    var popup = document.querySelector("#onstart-popup");
    var outer = document.querySelector("#outer-popup");
    popup.style.display = "none";
    outer.style.display = "none";
}

//creating a canvas
const createCanvas = () =>{
        const canvasDiv = document.querySelector("#canvasDiv");
        const canvas = document.createElement('canvas');
        const undoBtn = document.getElementById('undo');
        const clearBtn=document.getElementById('clear');
        const saveBtn = document.getElementById('save');
        const blackBtn = document.querySelector('div[data-color="black"]');
        const greenBtn = document.querySelector('div[data-color="green"]');
        const blueBtn = document.querySelector('div[data-color="blue"]');
        const purpleBtn = document.querySelector('div[data-color="purple"]');
        const redBtn = document.querySelector('div[data-color="red"]');
        let canvasHeight = window.innerHeight-100;
        let canvasWidth  = window.innerWidth-100;
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;
        var color = '#000000';

        clearBtn.addEventListener('click', function(e){
                context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
                clickX=[];
                clickY=[];
                clickDrag=[];
                paint=false;
        });

        undoBtn.addEventListener('click', function(e) {
          clickX.pop();
          clickY.pop();
          clickDrag.pop();
          redrawAll();
          
        })

        canvas.setAttribute('id','canvas');
        canvas.setAttribute('width',canvasWidth);
        canvas.setAttribute('height',canvasHeight);
        canvas.setAttribute('class','border');
        canvas.setAttribute('background-color','#cb3594');
        canvasDiv.appendChild(canvas);

        if(typeof G_vmlCanvasManager != 'undefined') {
          canvas = G_vmlCanvasManager.initElement(canvas);
        }
        context = canvas.getContext("2d");
        context.fillStyle="#fff";
        context.fillRect(0,0,context.canvas.width, context.canvas.height);

                // changes the color state of the canvas based on box clicked in welcome modal
                function selectColor(newColor) {
                  switch(newColor) {
                    case 'green':
                      color = "#baff33";
                      closePopup();
                      break;
                    case 'red':
                      color = "#ff2b2b";
                      closePopup();
                      break;
                    case 'purple':
                      color = "#b700ff";
                      closePopup();
                      break;
                    case 'blue':
                      color = "#006eff";
                      closePopup();
                      break;
                    case 'black':
                    default:
                      color = "#000000";
                      closePopup();
                      break;
                  }
                }

                // add click listener for all color options in welcome modal
                blackBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
                blueBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
                greenBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
                purpleBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));
                redBtn.addEventListener('click', (event) => selectColor(event.target.dataset.color));

                function addClick(x, y, dragging)
                {
                  clickX.push(x);
                  clickY.push(y);
                  clickDrag.push(dragging);
                  console.log(clickX.length, clickY.length);
                }

                function draw() {
                  for(var i=0; i < clickX.length; i++) {		
                    context.beginPath();
                    if(clickDrag[i] && i){
                      context.moveTo(clickX[i-1], clickY[i-1]);
                    } else{
                      context.moveTo(clickX[i]-1, clickY[i]);
                    }
                    context.lineTo(clickX[i], clickY[i]);
                    context.closePath();
                    
                    context.strokeRect(clickX[0], clickY[0], clickX[i] - clickX[0], clickY[i] - clickY[0]);
                    
                     
                  }
                }

                function drawLine() {
                  
                }

                function redraw(){
                        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
                        context.fillStyle="#fff";
                        context.fillRect(0,0,context.canvas.width, context.canvas.height);
                        context.strokeStyle = color;
                        context.lineJoin = "round";
                        context.lineWidth = 5;
                                              
                        draw();
                      }

                function redrawAll() {
                  if(clickX.length==0){
                    return;
                  }

                  context.clearRect(0,0,canvas.width,canvas.height);
          
                  for(var i=0;i<clickX.length;i++){
                    if(clickDrag[i] || paint){
                        context.beginPath();
                        context.moveTo(clickX[i],clickY[i]);
                    }
                    context.lineTo(clickX[i], clickY[i]);
                    if(!clickDrag[i] || (i==clickX.length-1)){
                        context.strokeStyle = "#fff";
                        context.stroke();
                    }
                  }
                  context.stroke();
                }
                      
                saveBtn.addEventListener('click',()=>{
                      var dataURL = canvas.toDataURL('image/jpeg', 1.0);
                      let savedImg = document.getElementById('savedImg');
                      savedImg.setAttribute('src',dataURL);                   
                });


                  canvas.addEventListener('mousedown',function(e){
                    // var mouseX = e.pageX - this.offsetLeft;
                    // var mouseY = e.pageY - this.offsetTop;
                                  
                    paint = true;
                    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                    redraw();
                  });
    
                  canvas.addEventListener('mousemove',function(e){
                    if(paint){
                      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                      redraw();
                    }
                  });
            
                 canvas.addEventListener('mouseup',function(e){
                     paint = false;
                 });


}

createCanvas();