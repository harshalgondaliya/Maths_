function forwardInterpolation() {
    let xValues = document.getElementById("xValues").value.split(',').map(Number);
    let yValues = document.getElementById("yValues").value.split(',').map(Number);
    let x = parseFloat(document.getElementById("x").value);
    let n = xValues.length;

    let result = forwardNewtonInterpolation(xValues, yValues, x, n);
    document.getElementById("result").innerText = `Interpolated forward value at y(${x}) is ${result}`;
}

function backwardInterpolation() {
    let xValues = document.getElementById("xValues").value.split(',').map(Number);
    let yValues = document.getElementById("yValues").value.split(',').map(Number);
    let x = parseFloat(document.getElementById("x").value);
    let n = xValues.length;

    let result = backwardNewtonInterpolation(xValues, yValues, x, n);
    document.getElementById("result").innerText = `Interpolated backward value at y(${x}) is ${result}`;
}


function forwardNewtonInterpolation(xValues, yValues, x, n) {
    let result = 0;
    let temp = [];
    for (let i = 0; i < n; i++) {
        temp.push([]);
        temp[i][0] = yValues[i];
    }
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            temp[j][i] = temp[j + 1][i - 1] - temp[j][i - 1];
        }
    }
    let u = (x - xValues[0]) / (xValues[1] - xValues[0]);
    for (let i = 0; i < n; i++) {
        let p = 1;
        for (let j = 0; j < i; j++) {
            p *= (u - j);
        }
        result += (temp[0][i] * p) / fact(i);
    }
    return result;
}

function backwardNewtonInterpolation(xValues, yValues, x, n) {
    let result = 0;
    let temp = [];
    for (let i = 0; i < n; i++) {
        temp.push([]);
        temp[i][0] = yValues[i];
    }
    for (let i = 1; i < n; i++) {
        for (let j = n - 1; j >= i; j--) {
            temp[j][i] = temp[j][i - 1] - temp[j - 1][i - 1];
        }
    }
    let u = (x - xValues[n - 1]) / (xValues[1] - xValues[0]);
    for (let i = 0; i < n; i++) {
        let p = 1;
        for (let j = 0; j < i; j++) {
            p *= (u + j);
        }
        result += (temp[n - 1][i] * p) / fact(i);
    }
    return result;
}

function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });