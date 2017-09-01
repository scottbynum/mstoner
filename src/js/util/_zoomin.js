function zoominRun(i, target) {
  setTimeout(function() {
    target.classList.remove('zoomin');
    target.classList.add('zoomin--active');
  }, 320 + (i * 160));
}

function zoominCheck() {
  var scroll = window.scrollY || window.pageYOffset;
  var targets = document.querySelectorAll('.zoomin');
  for (var i = 0, len = targets.length; i < len; i++) {
    var target = targets[i];
    var position = target.getBoundingClientRect().top - window.innerHeight;
    if (position < 0) {
      zoominRun(i, target);
    }
  }
  requestAnimationFrame(zoominCheck);
}

zoominCheck();
