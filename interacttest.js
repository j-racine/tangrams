//const interact = require('interactjs');
function init(){

}

document.getElementById('Close').addEventListener('click',closeWindow);

function closeWindow(){
    window.close()
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

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
 