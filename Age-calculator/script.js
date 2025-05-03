        // Theme Toggle Functionality
        document.getElementById("theme-toggle").addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            
            // Save theme preference
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                this.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
            } else {
                localStorage.setItem("theme", "light");
                this.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
            }
        });

        // Load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
            document.getElementById("theme-toggle").innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
        }

        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Get parent tab container
                const tabContainer = button.closest('.tab-container');
                
                // Get all tabs from the same group
                const tabButtons = tabContainer.querySelectorAll('.tab-btn');
                const tabContents = tabContainer.parentElement.querySelectorAll('.tab-content');
                
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding content
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // FAQ Toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                
                // Toggle active class on question
                question.classList.toggle('active');
                
                // Toggle show class on answer
                answer.classList.toggle('show');
            });
        });

        // Calculate age and other metrics
        document.getElementById('calculate-btn').addEventListener('click', calculateAge);

        // Array to store calculation history
        let calculationHistory = JSON.parse(localStorage.getItem('ageCalcHistory')) || [];
        
        // Update history display on load
        updateHistoryDisplay();

        // Calculate Age Function
        function calculateAge() {
            const day = parseInt(document.getElementById('date').value);
            const month = parseInt(document.getElementById('month').value);
            const year = parseInt(document.getElementById('year').value);
            const birthTime = document.getElementById('time').value;
            const name = document.getElementById('name').value || "Your";
            const lifeExpectancy = parseInt(document.getElementById('life-expectancy').value) || 80;
            
            // Validate input
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                alert("Please enter valid numeric birth details.");
                return;
            }
            
            // Create birthday date object
            let birthDate = new Date(year, month - 1, day);
            
            // Get target date (today or specified date)
            let targetDate = new Date();
            const specifiedDate = document.getElementById('target-date').value;
            if (specifiedDate) {
                targetDate = new Date(specifiedDate);
            }
            
            // Calculate basic age
            let ageYears = targetDate.getFullYear() - birthDate.getFullYear();
            let ageMonths = targetDate.getMonth() - birthDate.getMonth();
            let ageDays = targetDate.getDate() - birthDate.getDate();
            
            // Adjust for negative days
            if (ageDays < 0) {
                ageMonths--;
                // Get days in the previous month
                const prevMonthDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
                ageDays += prevMonthDate.getDate();
            }
            
            // Adjust for negative months
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }
            
            // Display main age result
            document.getElementById('age-value').textContent = `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
            
            // Calculate total days lived
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const daysLived = Math.floor((targetDate - birthDate) / millisecondsPerDay);
            
            // Calculate other metrics
            const weeksLived = Math.floor(daysLived / 7);
            const hoursLived = daysLived * 24;
            const heartbeats = (daysLived * 24 * 60 * 70 / 1000000).toFixed(1); // Average 70 bpm
            const breaths = (daysLived * 24 * 60 * 16 / 1000000).toFixed(1); // Average 16 breaths per minute
            
            // Calculate life percentage
            const lifeExpectancyDays = lifeExpectancy * 365.25;
            const lifePercentage = ((daysLived / lifeExpectancyDays) * 100).toFixed(1);
            
            // Update detailed stats
            document.getElementById('days-lived').textContent = daysLived.toLocaleString();
            document.getElementById('weeks-lived').textContent = weeksLived.toLocaleString();
            document.getElementById('hours-lived').textContent = hoursLived.toLocaleString();
            document.getElementById('life-percentage').textContent = lifePercentage + '%';
            document.getElementById('heartbeats').textContent = heartbeats;
            document.getElementById('breaths').textContent = breaths;
            
            // Calculate next birthday
            const nextBirthdayYear = targetDate.getFullYear() + (targetDate.getMonth() > birthDate.getMonth() || 
                (targetDate.getMonth() === birthDate.getMonth() && targetDate.getDate() >= birthDate.getDate()) ? 1 : 0);
            const nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate());
            const daysToNextBirthday = Math.ceil((nextBirthday - targetDate) / millisecondsPerDay);
            document.getElementById('next-birthday-value').textContent = `${daysToNextBirthday} days`;

            // Show results section
            document.getElementById('results').style.display = 'block';
            document.getElementById('no-results').style.display = 'none';

            // Save to history
            const resultData = {
                name,
                age: `${ageYears} years, ${ageMonths} months, ${ageDays} days`,
                daysLived,
                date: new Date().toLocaleString()
            };

            calculationHistory.unshift(resultData);
            if (calculationHistory.length > 10) calculationHistory.pop(); // Limit history
            localStorage.setItem('ageCalcHistory', JSON.stringify(calculationHistory));
            updateHistoryDisplay();
        }

        function updateHistoryDisplay() {
            const historySection = document.getElementById('history-section');
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';

            if (calculationHistory.length === 0) {
                historySection.style.display = 'none';
                return;
            }

            calculationHistory.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.name} - ${entry.age} - Calculated on ${entry.date}`;
                historyList.appendChild(li);
            });

            historySection.style.display = 'block';
        }
