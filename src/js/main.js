'use strict';

const CONTROLLS = document.forms[0];
const THEMES = CONTROLLS.theme;
const DEVICES = CONTROLLS.device;
const DEVICE_VIEW = document.querySelector('.device-view');
const CONTENT = document.querySelector('.content');

let themesMap = {
  wired: {
    index: 0,
    selector: 'theme-wired'
  },
  techcrunch: {
    index: 1,
    selector: 'theme-techcrunch'
  },
  theverge: {
    index: 2,
    selector: 'theme-theverge'
  }
};

let deviceMap = {
  desktop: 'device-desktop',
  tablet: 'device-tablet',
  mobile: 'device-mobile'
}

let state = {
  theme: 'theverge',
  device: 'desktop'
}

//  INIT ----------------------------------

addClass(DEVICE_VIEW, deviceMap[state.device]);
THEMES.options[themesMap[state.theme].index].selected = true;
addClass(CONTENT, themesMap[state.theme].selector);

window.onresize = function(e){
  removeClass(DEVICE_VIEW, deviceMap[state.device]);
  addClass(DEVICE_VIEW, deviceMap['desktop']);
  DEVICES[0].checked = true;
}

// ----------------------------------------

THEMES.onchange = function() {
  removeClass(CONTENT, themesMap[state.theme].selector);
  state.theme = this.value;
  addClass(CONTENT, themesMap[state.theme].selector);
}

let prev = null;
for(var i = 0; i < DEVICES.length; i++) {
  DEVICES[i].onclick = function() {
    if(this !== prev) {
        prev = this;
    }
    removeClass(DEVICE_VIEW, deviceMap[state.device]);
    state.device = this.value;
    addClass(DEVICE_VIEW, deviceMap[state.device]);
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
