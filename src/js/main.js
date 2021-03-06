'use strict';

let controls = document.forms[0];
let themeSelect = controls.theme;
let deviceRadios = controls.device;

const DEVICE_VIEW = document.querySelector('.device-view');
const CONTENT = document.querySelector('.content');

const THEMES = {
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

const DEVICES = {
  desktop: 'device-desktop',
  tablet: 'device-tablet',
  mobile: 'device-mobile'
}

let state = {
  theme: 'theverge',
  device: 'desktop'
}

// init
addClass(DEVICE_VIEW, DEVICES[state.device]);
themeSelect.options[THEMES[state.theme].index].selected = true;
addClass(CONTENT, THEMES[state.theme].selector);

window.onresize = function(e){
  removeClass(DEVICE_VIEW, DEVICES[state.device]);
  addClass(DEVICE_VIEW, DEVICES['desktop']);
  deviceRadios[0].checked = true;
}

// actions
themeSelect.onchange = function() {
  removeClass(CONTENT, THEMES[state.theme].selector);
  state.theme = this.value;
  addClass(CONTENT, THEMES[state.theme].selector);
}

let prev = null;
for(var i = 0; i < deviceRadios.length; i++) {
  deviceRadios[i].onclick = function() {
    if(this !== prev) {
        prev = this;
    }
    removeClass(DEVICE_VIEW, DEVICES[state.device]);
    state.device = this.value;
    addClass(DEVICE_VIEW, DEVICES[state.device]);
  };
}

// utils
function addClass(el, c){
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  if (re.test(el.className)) return;
  el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(el, c){
  var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
  el.className = el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}
