// START OF HAMBURGER MENU
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
})
)
// END OF HAMBURGER MENU

// MAGNETIC ELEMENTS

const lerp = (current, target, factor) =>
    current * (1 - factor) + target * factor;

let mousePosition = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
});

const calculateDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x1 - x2, y1 - y2);
};

// ------------------------------------------------------------------------
class MagneticObject {
    constructor(domElement) {
        this.domElement = domElement;
        this.boundingClientRect = this.domElement.getBoundingClientRect();
        this.triggerArea = 200;
        this.interpolationFactor = 0.8;

        this.lerpingData = {
            x: { current: 0, target: 0 },
            y: { current: 0, target: 0 },
        };

        this.render();
        this.resize();
    }

    resize() {
        window.addEventListener("resize", () => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
    }

    render() {
        const distanceFromMouseToCenter = calculateDistance(
            mousePosition.x,
            mousePosition.y,
            this.boundingClientRect.left + this.boundingClientRect.width / 2,
            this.boundingClientRect.top + this.boundingClientRect.height / 2
        );

        let targetHolder = { x: 0, y: 0 };

        if (distanceFromMouseToCenter < this.triggerArea) {
            this.domElement.classList.add("focus");
            targetHolder.x =
                (mousePosition.x -
                    (this.boundingClientRect.left +
                        this.boundingClientRect.width / 2)) *
                0.1;
            targetHolder.y =
                (mousePosition.y -
                    (this.boundingClientRect.top +
                        this.boundingClientRect.height / 1)) *
                0.1;
            console.log(targetHolder);
        } else {
            this.domElement.classList.remove("focus");
        }
        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;

        for (const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(
                this.lerpingData[item].current,
                this.lerpingData[item].target,
                this.interpolationFactor
            );
        }

        this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;

        window.requestAnimationFrame(() => this.render());
    }
}

const button = document.querySelector(".magnetic");
new MagneticObject(button);
// END OF MAGNETIC

// START OF SCROLL BTN FADEOUT
// select the #tips section and the #scroll-button element
const tipsSection = document.querySelector('#footer');
const scrollButton = document.querySelector('#scroll-btn');

// create an IntersectionObserver instance to observe the #tips section
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.target === tipsSection) {
      // if the #tips section is intersecting with the viewport, hide the #scroll-button
      if (entry.isIntersecting) {
        scrollButton.style.display = "none";
      } else {
        // if the #tips section is not intersecting with the viewport, show the #scroll-button
        scrollButton.style.display = "flex";
      }
    }
  });
});

// start observing the #tips section
observer.observe(tipsSection);
