// Data de start
var startDate = new Date("December 24, 2023 00:00:00 GMT+0200");


// Funcție pentru actualizarea cronometrului
function updateCountdown() {
    // Obținem unitatea de timp selectată
    var selectedUnit = document.getElementById("timeUnitSelector").value;

    // Obținem data curentă
    var currentDate = new Date();

    // Calculăm diferența de timp în milisecunde
    var timeDifference = currentDate - startDate;

    // Verificăm anii bisecți și ajustăm diferența de timp
    timeDifference -= countLeapYears(startDate, currentDate) * 24 * 60 * 60 * 1000;

    // Calculăm timpul și restul în funcție de unitatea selectată
    var time = 0;
    var rest = {};

    switch (selectedUnit) {
        case "month":
            time = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
            rest = calculateRest(timeDifference % (1000 * 60 * 60 * 24 * 30.44));
            break;
        case "day":
            time = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            rest = calculateRest(timeDifference % (1000 * 60 * 60 * 24));
            break;
        case "hour":
            time = Math.floor(timeDifference / (1000 * 60 * 60));
            rest = calculateRest(timeDifference % (1000 * 60 * 60));
            break;
        case "minute":
            time = Math.floor(timeDifference / (1000 * 60));
            rest = calculateRest(timeDifference % (1000 * 60));
            break;
        case "second":
            time = Math.floor(timeDifference / 1000);
            break;
        default:
            break;
    }

    // Afișăm rezultatele
    document.getElementById("countdown").innerText = formatTime(time, selectedUnit) + "  " + formatRest(rest);

    // Programăm o reactualizare la fiecare secundă
    setTimeout(updateCountdown, 1000);
}

// Funcție pentru formatarea timpului în unități de timp specificate
function formatTime(value, unit) {
    return value + " " + unit + (value !== 1 ? "" : "");
}

// Funcție pentru formatarea restului în toate unitățile
// Funcție pentru formatarea restului în toate unitățile
function formatRest(rest) {
    var formattedRest = "";
    var carry = 0;  // Variabilă pentru transportul restului

    // Definim un obiect pentru a stabili ordinea unităților
    var unitsOrder = ["years", "months", "days", "hours", "minutes", "seconds"];

    // Iterăm prin fiecare unitate și calculăm restul
    for (var i = 0; i < unitsOrder.length; i++) {
        var unit = unitsOrder[i];

        // Adăugăm restul transportat de la unitatea anterioară
        rest[unit] += carry;

        // Dacă avem o valoare nenulă pentru această unitate, o adăugăm la rezultat
        if (rest[unit] > 0) {
            formattedRest += rest[unit] + " " + unit + (rest[unit] !== 1 ? "" : "");
            
            // Adăugați virgulă dacă există unități ulterioare
            if (i < unitsOrder.length - 1 && formattedRest !== "") {
                formattedRest += ", ";
            }
        }

        // Calculăm restul transportat pentru unitatea următoare
        carry = Math.floor(rest[unit] / getUnitDuration(unit));
        rest[unit] %= getUnitDuration(unit);
    }

    return formattedRest.trim();
}


// Funcție pentru calcularea restului în toate unitățile
function calculateRest(timeDifference) {
    var rest = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    // Definim un obiect pentru a stabili durata fiecărei unități în milisecunde
    var unitDurations = {
        years: 1000 * 60 * 60 * 24 * 365.25,
        months: 1000 * 60 * 60 * 24 * (365.25 / 12),  // Durata medie a unei luni
        days: 1000 * 60 * 60 * 24,
        hours: 1000 * 60 * 60,
        minutes: 1000 * 60,
        seconds: 1000
    };

    // Iterăm prin fiecare unitate și calculăm restul
    var unitsOrder = ["years", "months", "days", "hours", "minutes", "seconds"];
    for (var i = 0; i < unitsOrder.length; i++) {
        var unit = unitsOrder[i];
        rest[unit] = Math.floor(timeDifference / unitDurations[unit]);
        timeDifference %= unitDurations[unit];
    }

    return rest;
}

// Funcție pentru numărarea anilor bisecți între două date
function countLeapYears(startDate, currentDate) {
    var count = 0;
    for (var year = startDate.getFullYear(); year <= currentDate.getFullYear(); year++) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            count++;
        }
    }
    return count;
}

// Funcție pentru a obține durata unei unități în milisecunde
function getUnitDuration(unit) {
    switch (unit) {
        case "years":
            return 1000 * 60 * 60 * 24 * 365.25;
        case "months":
            return 1000 * 60 * 60 * 24 * 30.44;
        case "days":
            return 1000 * 60 * 60 * 24;
        case "hours":
            return 1000 * 60 * 60;
        case "minutes":
            return 1000 * 60;
        case "seconds":
            return 1000;
        default:
            return 1;
    }
}

// Inițializăm cronometrul la încărcarea paginii
updateCountdown();



let slideIndex = 1;

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
