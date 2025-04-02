document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function calculateAge() {
    var d1 = parseInt(document.getElementById('date').value);
    var m1 = parseInt(document.getElementById('month').value);
    var y1 = parseInt(document.getElementById('year').value);
    var birthTime = document.getElementById('time').value;

    if (!d1 || !m1 || !y1) {
        document.getElementById('age-result').innerHTML = "❌ Please enter a valid date.";
        return;
    }

    var today = new Date();
    var d2 = today.getDate();
    var m2 = today.getMonth() + 1;
    var y2 = today.getFullYear();

    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((y2 % 4 === 0 && y2 % 100 !== 0) || (y2 % 400 === 0)) {
        monthDays[1] = 29;
    }

    if (d1 > d2) {
        d2 += monthDays[m2 - 1];
        m2 -= 1;
    }

    if (m1 > m2) {
        m2 += 12;
        y2 -= 1;
    }

    var d = d2 - d1;
    var m = m2 - m1;
    var y = y2 - y1;

    var result = `🎉 You are ${y} Years, ${m} Months, and ${d} Days old.`;
    
    if (birthTime) {
        result += `<br> ⏰ Time of Birth: ${birthTime}`;
    }

    document.getElementById('age-result').innerHTML = result;

    generateChart(y, m, d);
}

function generateChart(y, m, d) {
    var ctx = document.getElementById('ageChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Years', 'Months', 'Days'],
            datasets: [{
                data: [y, m, d],
                backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            }]
        },
        options: {
            responsive: true
        }
    });
}
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        let answer = button.nextElementSibling;
        answer.style.display = (answer.style.display === "block") ? "none" : "block";
    });
});
