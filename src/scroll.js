const scroller = () => {
  let duration,
    offset,
    callback,
    easing,
    distance,
    element,
    start,
    stop,
    timeStart,
    timeElapsed;

  // find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1){
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  const getLocation = () => window.scrollY || window.pageYOffset;

  const top = element => element.getBoundingClientRect().top + start;

  const done = () => {

    window.scrollTo(0, start + distance);

    if (typeof callback === 'function') {
      callback();
    }

    timeStart = false
  };

  const loop = (timeCurrent) => {
    if (!timeStart) {
      timeStart = timeCurrent;
    }
    timeElapsed = timeCurrent - timeStart;
    console.log(distance);
    next = easing(timeElapsed, start, distance, duration);

    window.scrollTo(0, next);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(loop);
    }else{
      done();
    }
  };

  const scroll = (target, options = {}) => {
    duration = options.duration || 1000;
    offset = options.offset;
    callback = options.callback;
    easing = options.easing || easeInOutQuad;

    start = getLocation();

    const type = typeof target;
    if (type === 'number') {
      element = undefined;
      stop = start + target;
    } else if (type === 'object' ) {
      element = target;
      stop = top(element);
    }else{
      element = document.querySelector(target);
      stop = top(element);
    }
    console.log(stop);
    distance = stop - start + offset;

    if (typeof duration === 'function') {
      duration = duration(distance);
    }
    window.requestAnimationFrame(loop);
  }

  return scroll;
}
const single = scroller();

// export default single;
