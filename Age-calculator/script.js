document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Function to Calculate Age and Zodiac Sign
function calculateAge() {
    const day = parseInt(document.getElementById('date').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const birthTime = document.getElementById('time').value;

    if (!day || !month || !year) {
        alert("Please enter valid birth details.");
        return;
    }

    let today = new Date();
    let birthDate = new Date(year, month - 1, day);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    let zodiacSign = getZodiacSign(day, month);

    let resultSection = document.getElementById('age-result');
    resultSection.innerHTML = `
        🎂 Age: <strong>${ageYears} Years, ${ageMonths} Months, ${ageDays} Days</strong><br>
        🌟 Zodiac Sign: <strong>${zodiacSign}</strong> ${getZodiacEmoji(zodiacSign)} <br>
        ⏳ Birth Time: <strong>${birthTime || "Not Provided"}</strong>
    `;
    
    // Apply smooth fade-in animation
    resultSection.style.opacity = 0;
    setTimeout(() => {
        resultSection.style.opacity = 1;
    }, 300);

    renderAgeChart(ageYears, ageMonths, ageDays);
}

// Function to Get Correct Zodiac Sign
function getZodiacSign(day, month) {
    const zodiacSigns = [
        { sign: "Capricorn", start: "01-01", end: "01-19" },
        { sign: "Aquarius", start: "01-20", end: "02-18" },
        { sign: "Pisces", start: "02-19", end: "03-20" },
        { sign: "Aries", start: "03-21", end: "04-19" },
        { sign: "Taurus", start: "04-20", end: "05-20" },
        { sign: "Gemini", start: "05-21", end: "06-20" },
        { sign: "Cancer", start: "06-21", end: "07-22" },
        { sign: "Leo", start: "07-23", end: "08-22" },
        { sign: "Virgo", start: "08-23", end: "09-22" },
        { sign: "Libra", start: "09-23", end: "10-22" },
        { sign: "Scorpio", start: "10-23", end: "11-21" },
        { sign: "Sagittarius", start: "11-22", end: "12-21" },
        { sign: "Capricorn", start: "12-22", end: "12-31" } // Capricorn appears twice for Jan & Dec
    ];

    const birthDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return zodiacSigns.find(z => birthDate >= z.start && birthDate <= z.end).sign;
}

// Function to Get Zodiac Emoji
function getZodiacEmoji(zodiac) {
    const emojis = {
        "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓", "Aries": "♈",
        "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌",
        "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐"
    };
    return emojis[zodiac] || "";
}

// Function to Render Age Chart (Pie Chart)
function renderAgeChart(years, months, days) {
    const ctx = document.getElementById('ageChart').getContext('2d');

    // Destroy existing chart instance if it exists
    if (window.ageChartInstance) {
        window.ageChartInstance.destroy();
    }

    window.ageChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Years', 'Months', 'Days'],
            datasets: [{
                label: 'Age Breakdown',
                data: [years, months, days],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}


// FAQ Section Toggle with Smooth Animation
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";

        // Apply smooth slide-down animation
        answer.style.maxHeight = answer.style.display === "block" ? answer.scrollHeight + "px" : "0px";
        answer.style.overflow = "hidden";
        answer.style.transition = "max-height 0.5s ease-out";
    });
});
