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
const scr = (_) => document.querySelector(".loop-container").scrollTop;
document.addEventListener("DOMContentLoaded", (_) => {
  loop.push(document.querySelector(".loop"));
  loop.push(loop[0].cloneNode(true));

  const wrapper = loop[0].parentNode;
  const height = loop[0].scrollHeight;
  loop.forEach((l, i) => {
    l.style.height = `${height}px`;
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
    renderNext(scrollAmt) {
      console.log("Render next loop", { current: scr(), target: scrollAmt });
      const cLoop = state.otherLoop;
      cLoop.style.top = `${scrollAmt}px`;
      document.querySelector(".loop-wrapper").style.height = `${
        scrollAmt + height * 2
      }px`;
    },
    renderPrev(scrollAmt) {
      console.log("Render prev loop", { current: scr(), target: scrollAmt });
      const cLoop = state.otherLoop;
      cLoop.style.top = `${scrollAmt - 2 * height}px`;
      document.querySelector(".loop-wrapper").style.height = `${
        scrollAmt + height * 2
      }px`;
    },
  };
  document.querySelector(".loop-container").scrollTop = 1;
  let disableScroll = false;

  document.querySelector(".loop-container").addEventListener("scroll", (e) => {
    const scrollAmt = state.loopScroll;

    console.log({ current: scr(), target: scrollAmt });
    if (document.querySelector(".loop-container").scrollTop <= 0) {
      document.querySelector(".loop-container").scrollTop += h;
      state.renderNext(h);
    }

    if (state.goingDown && scr() > scrollAmt - h) state.renderNext(scrollAmt);
    else if (!state.goingDown && scr() < scrollAmt - 0.9 * height)
      state.renderPrev(scrollAmt);
    state.previous = scr();
  });
});
