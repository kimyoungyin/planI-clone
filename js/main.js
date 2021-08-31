const slider = document.querySelector(".main__slideWrap");
const fill = document.querySelector(".main__fillBar");
const leftBtn = document.querySelector(".main__button");
const prevArrow = document.getElementById("main__prevArrow");
const nextArrow = document.getElementById("main__nextArrow");
const prevArrowImgs = document.querySelectorAll("#main__prevArrow img");
const nextArrowImgs = document.querySelectorAll("#main__nextArrow img");
const right = document.querySelector(".main__right");
const rightMessage = right.querySelector(".main__message");

let index = 1;
let slideHeight =
    window.innerWidth <= 1700
        ? window.innerWidth <= 1580
            ? window.innerWidth <= 1430
                ? window.innerWidth <= 1280
                    ? 61
                    : 69
                : 79
            : 90
        : 112;
let clicked = false;

const messageList = [
    "Intelligence",
    "Information",
    "Facts",
    "News",
    "Report",
    "Message",
    "Notic",
    "Knowledge",
    "Data",
    "Intelligence",
    "Information",
];

const TO_RIGHT = "toRight 0.6s ease forwards";
const FROM_RIGHT = "fromRight 0.6s ease forwards";

slider.style.transform = `translateY(-${slideHeight * index}px)`;
rightMessage.innerText = messageList[index];

const TIME_INTERVAL = 5000;

const resizeHandler = () => {
    slideHeight =
        window.innerWidth <= 1700
            ? window.innerWidth <= 1580
                ? window.innerWidth <= 1430
                    ? window.innerWidth <= 1280
                        ? 61
                        : 69
                    : 79
                : 90
            : 112;
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (index + 1)}px)`;
};

const slideHandler = () => {
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (index + 1)}px)`;
    index++;

    if (index === 10) {
        setTimeout(() => {
            slider.style.transition = "0s";
            slider.style.transform = `translateY(-${slideHeight}px)`;
        }, 501);
        index = 1;
    }
};

const rightAnimationHandler = () => {
    right.style.animation = TO_RIGHT;
    // 이미 index 변화
    setTimeout(() => {
        rightMessage.innerText = messageList[index];
        right.style.animation = FROM_RIGHT;
    }, 600);
};

const resetFillbar = () => {
    fill.classList.add("wait");
    void fill.offsetWidth;
    fill.classList.remove("wait");
};

const timeoutHandler = () => {
    slideHandler();
    rightAnimationHandler();
    resetFillbar();
};

let id = setInterval(() => {
    timeoutHandler();
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
            timeoutHandler();
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

    if (index === 1) {
        console.log("맨 처음");
        slider.style.transition = "0.5s";
        slider.style.transform = "translateY(0px)";
        index = 9;
        setTimeout(() => {
            slider.style.transition = "0s";
            slider.style.transform = `translateY(-${slideHeight * index}px)`;
        }, 501);
        return;
    }
    slider.style.transition = "0.5s";
    slider.style.transform = `translateY(-${slideHeight * (index - 1)}px)`;
    index--;
};
const nextArrowClickHandler = () => {
    clearInterval(id);
    console.log("다음");
    timeoutHandler();
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
