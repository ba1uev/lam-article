'use strict';

var CONTROLLS = document.forms[0];
var THEMES = CONTROLLS.theme;
var DEVICES = CONTROLLS.device;
var CONTENT = document.querySelector('.content');

var themesMap = {
  wired: {
    index: 0,
    theme: 'theme-wired'
  },
  techcrunch: {
    index: 1,
    theme: 'theme-techcrunch'
  },
  theverge: {
    index: 2,
    theme: 'theme-theverge'
  }
};

var state = {
  theme: 'theverge',
  device: 'desktop'
};

//  INIT ----------------------------------
console.log(THEMES.options[themesMap[state.theme].index]);
THEMES.options[themesMap[state.theme].index].selected = true;
addClass(CONTENT, themesMap[state.theme].theme);
// ----------------------------------------

THEMES.onchange = function () {
  removeClass(CONTENT, themesMap[state.theme].theme);
  state.theme = this.value;
  addClass(CONTENT, themesMap[state.theme].theme);
};

var prev = null;
for (var i = 0; i < DEVICES.length; i++) {
  DEVICES[i].onclick = function () {
    if (this !== prev) {
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
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + evType, fn);
  } else {
    elem['on' + evType] = fn;
  }
}

function addClass(el, c) {
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  if (re.test(el.className)) return;
  el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(el, c) {
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  el.className = el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}