'use strict';

const CONTROLLS = document.forms[0];
const THEMES = CONTROLLS.theme;
const DEVICES = CONTROLLS.device;
const CONTENT = document.querySelector('.content');

let state = {
  theme: 'wired',
  device: 'desktop'
}


THEMES.onchange = function() {
  console.log('Theme: ', this.value);
  addClass(CONTENT, `theme-${this.value}`);
}

let prev = null;
for(var i = 0; i < DEVICES.length; i++) {
  DEVICES[i].onclick = function() {
    if(this !== prev) {
        prev = this;
    }
    console.log('Device: ', this.value);
  };
}


// ----------------------------------------





// UTILS

function addEvent(elem, evType, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(evType, fn, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + evType, fn)
  }
  else {
    elem['on' + evType] = fn
  }
}

function addClass(el, c){
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  if (re.test(el.className)) return;
  el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(el, c){
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  el.className = el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}
