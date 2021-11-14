/*Adding some extra clones withing the elements for screens with bigger height*/
Array.from(document.querySelectorAll(".name-item"), (item, index) => {
  const clone = item.cloneNode(true);
  document.querySelector(".names-flex").appendChild(clone);
  clone.classList.add("js-clone");
});

/*Getting the initial height of the elements without it's second loop*/
var h = 0;
document.querySelectorAll(".name-item").forEach((item) => {
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

const loop = [];
let state;
/*function to get the current "location" of the scroll*/
const scr = (_) => document.querySelector(".loop-container").scrollTop;
document.addEventListener("DOMContentLoaded", (_) => {
  /*On page laod, create an array called loop, push the initial elments into it, clone those elements in the array, and then append the cloned elements to the DOM*/
  loop.push(document.querySelector(".loop"));
  loop.push(loop[0].cloneNode(true));

  const wrapper = loop[0].parentNode;
  const height = loop[0].scrollHeight;
  loop.forEach((l, i) => {
    /*Set the height*/
    l.style.height = `${height}px`;
    /*Most important, set the second loop's position from the top, right where the first one's height ends*/
    l.style.top = `${height * i}px`;
  });

  wrapper.appendChild(loop[1]);

  const currLoop = Symbol("loop");
  state = {
    [currLoop]: 0,
    get otherLoop() {
      return loop[(state[currLoop] = (this[currLoop] + 1) % 2)];
    },
    get loopScroll() {
      const cE = this.currElement;
      return cE.scrollHeight + cE.offsetTop;
    },
    get currElement() {
      return loop[this[currLoop]];
    },
    get currIndex() {
      return this[currLoop];
    },
    get goingDown() {
      return state.previous <= scr();
    },
    /*This is the function that keeps repositioning the elements when you scrol lthrough each, while alse making the scrolling container bigger, so you never reach the bottom */
    renderNext(scrollAmt) {
      console.log("Render next loop", { current: scr(), target: scrollAmt });
      const cLoop = state.otherLoop;
      cLoop.style.top = `${scrollAmt}px`;
      document.querySelector(".loop-wrapper").style.height = `${
        scrollAmt + height * 2
      }px`;
    },
    renderPrev(scrollAmt) {
      /*Same as above but going up, and without making the div any bigger*/
      console.log("Render prev loop", { current: scr(), target: scrollAmt });
      const cLoop = state.otherLoop;
      cLoop.style.top = `${scrollAmt - 2 * height}px`;
      document.querySelector(".loop-wrapper").style.height = `${
        scrollAmt + height * 2
      }px`;
    },
  };
  /*scroll the element down 2px to allow scrolling up on page load*/
  document.querySelector(".loop-container").scrollTop = 2;

  /*On scroll*/
  document.querySelector(".loop-container").addEventListener("scroll", (e) => {
    const scrollAmt = state.loopScroll;
    /*Check if reached the top*/
    if (document.querySelector(".loop-container").scrollTop <= 0) {
      /*scroll the viewport down to the clone, to make it seem like there's a new element above while it's actually just the same element being scrolled */
      document.querySelector(".loop-container").scrollTop = h;
      /*Render the next element, which basically means make sure that the second clone is under the first(in case the user just came back to the top after scrolling to the bottom)*/
      state.renderNext(h);
    }

    /*If going down render the next element, which means make the scrolling container bigger by the height of one of these elements, and reposition the other element(the one not being viewed) down*/
    if (state.goingDown && scr() > scrollAmt - h) state.renderNext(scrollAmt);
    /*Opposite of above, if user has scrolled 90% of the elemnts height while hoing up, render the previous element */ else if (
      !state.goingDown &&
      scr() < scrollAmt - 0.9 * height
    )
      state.renderPrev(scrollAmt);
    state.previous = scr();
  });
});
