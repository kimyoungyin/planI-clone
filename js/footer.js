const selectBox = document.querySelector(".footer__selectBox");
const ul = selectBox.querySelector("ul");
const btn = selectBox.querySelector("button");

let active = false;

const classHandler = () => {
    if (!active) {
        console.log("활성화");
        ul.classList.add("active");
        active = true;
    } else {
        console.log("비활성화");
        ul.classList.remove("active");
        active = false;
    }
};

btn.addEventListener("click", classHandler);
