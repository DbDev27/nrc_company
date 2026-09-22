gsap.registerPlugin(ScrollTrigger);

document.body.style.overflow = "hidden";

const loader = document.querySelector(".page-loader");
const loaderBrand = document.querySelector(".loader-brand");
const loaderSub = document.querySelector(".loader-sub");
const loaderPercent = document.querySelector(".loader-percent");
const loaderBar = document.querySelector(".loader-bar");

const images = document.images;
const totalImages = images.length;

let loadedImages = 0;

function updateLoader() {
    loadedImages++;

    const value = Math.round((loadedImages / totalImages) * 100);

    loaderPercent.textContent = value + "%";

    gsap.to(loaderBar, {
        width: value + "%",
        duration: 0.3,
        ease: "power2.out"
    });
}

function loadImages() {
    return new Promise((resolve) => {

        // No images
        if (totalImages === 0) {
            resolve();
            return;
        }

        Array.from(images).forEach((img) => {

            // Already loaded
            if (img.complete) {
                updateLoader();
            } else {
                img.addEventListener("load", updateLoader, { once: true });
                img.addEventListener("error", updateLoader, { once: true });
            }

        });

        const checkComplete = setInterval(() => {
            if (loadedImages >= totalImages) {
                clearInterval(checkComplete);
                resolve();
            }
        }, 50);
    });
}


async function startLoader() {

    // Intro animation
    const introTl = gsap.timeline();

    introTl
        .to(loaderBrand, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        })
        .to(loaderSub, {
            opacity: 1,
            duration: 0.5
        }, "-=.3")
        .to(loaderPercent, {
            opacity: 1,
            duration: 0.3
        }, "-=.2");

    await introTl;

    // Wait for actual images
    await loadImages();

    // Make sure it reaches 100%
    loaderPercent.textContent = "100%";

    gsap.to(loaderBar, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out"
    });

    // Small finish animation
    await gsap.to(loaderPercent, {
        scale: 1.08,
        duration: 0.15,
        yoyo: true,
        repeat: 1
    });

    // Fade loader
    await gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
    });

    gsap.set(loader, {
        display: "none"
    });

    document.body.style.overflow = "";

    heroAnimation();
}


function heroAnimation() {

    const tl = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });

    // tl.to(".l1", {
    //     y: 0,
    //     opacity: 1,
    //     duration: 1.2
    // }); tl.to(".l2", {
    //     // y: 0,
    //     opacity: 1,
    //     duration: 1
    // });

    // tl.to(".logoEl", {
    //     y: -35,
    //     opacity: 1,
    //     duration: 1
    // });

    // Hero background stays FIXED
}


// Start
startLoader();