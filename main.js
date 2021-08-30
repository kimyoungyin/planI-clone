const slider = document.querySelector(".main__slideWrap");
const fill = document.querySelector(".main__fillBar");
const leftBtn = document.querySelector(".main__button");
const prevArrow = document.getElementById("main__prevArrow");
const nextArrow = document.getElementById("main__nextArrow");
const prevArrowImgs = document.querySelectorAll("#main__prevArrow img");
const nextArrowImgs = document.querySelectorAll("#main__nextArrow img");

let slideIndex = 1;
let slideHeight = window.innerWidth <= 1700 ? 126 : 141;
let clicked = false;

slider.style.transform = `translateY(-${slideHeight * slideIndex}px)`;

const TIME_INTERVAL = 5000;

const resizeHandler = () => {
    if (window.innerWidth <= 1700) {
        slideHeight = 126;
    } else if (window.innerWidth > 1700) {
        slideHeight = 141;
    }
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (slideIndex + 1)}px)`;
};

// 슬라이드
const slideHandler = () => {
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (slideIndex + 1)}px)`;
    slideIndex++;

    if (slideIndex === 10) {
        setTimeout(() => {
            slider.style.transition = "0s";
            slider.style.transform = `translateY(-${slideHeight}px)`;
        }, 501);
        slideIndex = 1;
    }
};

const animationHandler = () => {
    slideHandler();
    fill.classList.add("wait");
    void fill.offsetWidth;
    fill.classList.remove("wait");
};

let id = setInterval(() => {
    animationHandler();
}, TIME_INTERVAL);

const leftBtnClickHandler = () => {
    if (!clicked) {
        fill.style.animationPlayState = "paused";
        prevArrow.classList.add("visible");
        nextArrow.classList.add("visible");
        clicked = true;
        clearTimeout(id);
    } else {
        clearTimeout(id);
        fill.style.animationPlayState = "running";
        prevArrow.classList.remove("visible");
        nextArrow.classList.remove("visible");
        clicked = false;
        id = setInterval(() => {
            animationHandler();
        }, TIME_INTERVAL);
    }
};

const hoverHandler = (event) => {
    const {
        target: {
            id,
            classList: { value: classValue },
        },
    } = event;
    if (classValue) {
        if (id === "main__prevArrow") {
            prevArrowImgs[0].classList.add("hidden");
            prevArrowImgs[1].classList.remove("hidden");
        } else if (id === "main__nextArrow") {
            nextArrowImgs[0].classList.add("hidden");
            nextArrowImgs[1].classList.remove("hidden");
        }
    }
};

const resetImg = (event) => {
    const {
        target: {
            id,
            classList: { value: classValue },
        },
    } = event;
    if (classValue) {
        if (id === "main__prevArrow") {
            prevArrowImgs[1].classList.add("hidden");
            prevArrowImgs[0].classList.remove("hidden");
        } else if (id === "main__nextArrow") {
            nextArrowImgs[1].classList.add("hidden");
            nextArrowImgs[0].classList.remove("hidden");
        }
    }
};

const prevArrowClickHandler = () => {
    clearInterval(id);
    fill.classList.add("wait");
    void fill.offsetWidth;
    fill.classList.remove("wait");
    fill.style.animationPlayState = "running";

    if (slideIndex === 1) {
        console.log("맨 처음");
        slider.style.transition = "0.5s";
        slider.style.transform = "translateY(0px)";
        slideIndex = 9;
        setTimeout(() => {
            slider.style.transition = "0s";
            slider.style.transform = `translateY(-${
                slideHeight * slideIndex
            }px)`;
        }, 501);
        return;
    }
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (slideIndex - 1)}px)`;
    slideIndex--;
};
const nextArrowClickHandler = () => {
    clearInterval(id);
    console.log("다음");
    animationHandler();
    fill.style.animationPlayState = "running";
};

window.addEventListener("resize", resizeHandler);
prevArrow.addEventListener("mouseenter", hoverHandler);
nextArrow.addEventListener("mouseenter", hoverHandler);
prevArrow.addEventListener("mouseleave", resetImg);
nextArrow.addEventListener("mouseleave", resetImg);
prevArrow.addEventListener("click", prevArrowClickHandler);
nextArrow.addEventListener("click", nextArrowClickHandler);
leftBtn.addEventListener("click", leftBtnClickHandler);
