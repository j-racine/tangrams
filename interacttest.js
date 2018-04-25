//const interact = require('interactjs');
function init(){
    /*
    console.log(Math.cos(1.5707963268).toPrecision(6));
    console.log(Math.sin(1.5707963268).toPrecision(6));
    console.log(Math.cos(2.3561944902).toPrecision(6));
    console.log(Math.sin(2.3561944902).toPrecision(6));
    console.log(Math.cos(3.1415926536).toPrecision(6));
    console.log(Math.sin(3.1415926536).toPrecision(6));
    console.log(Math.cos(3.926990817).toPrecision(6));
    console.log(Math.sin(3.926990817).toPrecision(6));
    console.log(Math.cos(4.7123889804).toPrecision(6));
    console.log(Math.sin(4.7123889804).toPrecision(6));
    console.log(Math.cos(5.4977871438).toPrecision(6));
    console.log(Math.sin(5.4977871438).toPrecision(6));
    */
}

document.getElementById('Close').addEventListener('click',closeWindow);

function closeWindow(){
    window.close()
}

document.getElementById('Reset').addEventListener('click',resetImages);

function resetImages(){
    var images = document.getElementsByClassName("dragandrotate");
    console.log(images);
    for (var i = 0; i < images.length; i++) {
        images[i].style.webkitTransform =
        images[i].style.transform =
            "";
    }
}


// target elements with the "draggable" class


interact('.dragandrotate')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      //restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  })
  .on('doubletap', function (event) {
    changeImage();
  });


  function changeImage() {
    var target = event.target;
    var current_transform = window.getComputedStyle(target).transform;
    var degrees = (parseFloat(target.getAttribute('rotate')) || 0) + 45;
    if (degrees == 360){
        degrees = 0;
    }
    var rotMat = getRotationMatrix(degrees);
    var matrix = "";
    if (current_transform != "none"){
        var temp = current_transform.match(/[\d\.\-]+/g);    
        matrix = "matrix("+ rotMat[0]+","+rotMat[1]+","+rotMat[2]+","+rotMat[3]+","+temp[4]+","+temp[5]+")";
    }else{
        matrix = "matrix("+rotMat[0]+","+rotMat[1]+","+rotMat[2]+","+rotMat[3]+",0,0)";    
    }
    //[\d\.\-]+
    target.style['transform'] = matrix;
    target.style['-webkit-transform'] = matrix;
    target.setAttribute('rotate', degrees);
  }

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    var current_transform = window.getComputedStyle(target).transform;
    var matrix = "";
    if (current_transform != "none"){
        console.log(current_transform);
        var temp = current_transform.match(/[\d\.\-]+/g);
        console.log(temp);
        matrix ="matrix("+temp[0]+","+temp[1]+","+temp[2]+","+temp[3]+","+x+","+y+")";
    }else{
        matrix ="matrix(1,0,0,1,"+x+","+y+")";  
    }
    
    target.style.webkitTransform =
    target.style.transform =
      //'translate(' + x + 'px, ' + y + 'px)';
      matrix;

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

function getRotationMatrix(degrees){
    var rotMat = []
    switch(degrees) {
        case 0:
            rotMat = [1,0,0,1];
            break;
        case 45:
            rotMat = [0.707107,-0.707107,0.707107,0.707107];
            break;
        case 90:
            rotMat = [0,-1,1,0];
            break;
        case 135:
            rotMat = [-0.707107,-0.707107,0.707107,-0.707107];
            break;
        case 180:
            rotMat = [-1,0,0,-1];
            break;
        case 225:
            rotMat = [-0.707107,0.707107,-0.707107,-0.707107];
            break;
        case 270:
            rotMat = [0,1,-1,0];
            break;
        case 315:
            rotMat = [0.707107,0.707107,-0.707107,0.707107];
            break;
    }
    return rotMat;
} 
//https://www.khanacademy.org/math/linear-algebra/matrix-transformations/lin-trans-examples/v/linear-transformation-examples-rotations-in-r2
//Rot (theta) (X->) = [cos (theta) -sin(theta)]
                    //[sign (theta) cos(theta)]
                    //for 45 they eval to sqrt(2)/2, -sqrt(2)/2, 
                    //                    sqrt(2)/2   sqrt(2)/2 
/*
  function oldChangeImage() {
    var target = event.target;
    var str = event.target.src;
    var rotate = 0;
    console.log(str);
    var res = str.match(/(\d)/g);
    if (parseInt(res[0]) == 8){
        rotate = 1;
    }else{
        rotate = parseInt(res[0]) + 1;
    }
    str = str.replace(/(\d)/g, rotate) 
    target.src = str;
  }

  function getRadians(degrees){
    //should have worked, too much overflow
    var theta = +((degrees * (Math.PI / 180)).toPrecision(6));
  }



http://interactjs.io/docs/restriction/
https://swizec.com/blog/web-page-segmentation/swizec/4364  
*/
