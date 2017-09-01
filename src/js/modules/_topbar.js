var prevent = true;
var enable;

var click = function(e) {
  if (prevent || !this.parentNode.classList.contains('topbar__dropdown--active')) {
    over.call(this.parentNode);
  } else {
    out.call(this.parentNode);
  }
  e.preventDefault();
};

var targets = document.querySelectorAll('.topbar__dropdown__toggle');

for (var i = 0; i < targets.length; i += 1) {
  targets[i].addEventListener('click', click);
}

//

var items = document.querySelectorAll('.topbar__dropdown');

var reset = function() {
  prevent = true;
  clearTimeout(enable);
  for (var i = 0; i < items.length; i += 1) {
    items[i].classList.remove('topbar__dropdown--active');
  }
  document.body.removeEventListener('click', outClick);
};

var over = function(e) {
  reset();
  this.classList.add('topbar__dropdown--active');
  enable = setTimeout(function() {
    prevent = false;
  }, 100);
  document.body.addEventListener('click', outClick);
};

var out = function(e) {
  reset();
};

var outClick = function(e) {
  var el = document.querySelector('.topbar__dropdown--active');
  if (!el.contains(e.target)) {
    out();
  }
};

for (var i = 0; i < items.length; i += 1) {
  items[i].addEventListener('mouseover', over);
  items[i].addEventListener('mouseout', out);
}
