var doc = window.document,
  context = doc.querySelector(".names-flex"),
  items = doc.querySelectorAll(".name-item"),
  h = 0,
  clones = [],
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0;
items.forEach((item) => {
  //Getting the initial height before cloning
  let itemH = item.getBoundingClientRect().height;
  itemH += parseInt(
    window.getComputedStyle(item).marginBottom +
      window.getComputedStyle(item).marginTop +
      window.getComputedStyle(item).paddingBottom +
      window.getComputedStyle(item).paddingTop
  ); //Getting the margins and paddings(top and bottom only)
  h = h + itemH;
});

function getScrollPos() {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
  context.scrollTop = pos;
}

function getClonesHeight() {
  clonesHeight = 0;

  Array.from(clones, (clone) => {
    clonesHeight = clonesHeight + clone.offsetHeight;
  });

  return clonesHeight;
}

function reCalc() {
  if (scrollPos <= 0) {
    setScrollPos(2); // Scroll 1 pixel to allow upwards scrolling
  }
  console.log("recalculating");
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();
}

function scrollUpdate() {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (scrollPos + innerHeight >= scrollHeight - 5) {
      // Scroll to the top(of the cloned ) when you’ve reached the bottom
      setScrollPos(context.scrollTop - 3 * h); // Scroll to
      disableScroll = true;
    } else if (scrollPos <= 1) {
      // Scroll to the bottom when you reach the top
      setScrollPos(h);
      disableScroll = true;
    }

    if (disableScroll) {
      // Disable scroll-jumping for a short time to avoid flickering
      window.setTimeout(function () {
        disableScroll = false;
      }, 60);
    }
  }
}

function onLoad() {
  Array.from(items, (item, index) => {
    const clone = item.cloneNode(true);
    context.appendChild(clone);
    clone.classList.add("js-clone");
  });

  Array.from(items, (item, index) => {
    const clone = item.cloneNode(true);
    context.appendChild(clone);
    clone.classList.add("js-clone");
  });

  Array.from(items, (item, index) => {
    const clone = item.cloneNode(true);
    context.appendChild(clone);
    clone.classList.add("js-clone");
  });

  clones = context.querySelectorAll(".js-clone");
  setScrollPos(2);
  reCalc();

  context.addEventListener(
    "touchmove",
    function () {
      window.requestAnimationFrame(scrollUpdate);
    },
    false
  );

  context.addEventListener(
    "scroll",
    function () {
      window.requestAnimationFrame(scrollUpdate);
    },
    false
  );

  window.addEventListener(
    "resize",
    function () {
      window.requestAnimationFrame(reCalc);
    },
    false
  );
}

window.onload = onLoad;
