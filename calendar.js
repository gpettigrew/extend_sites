document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");
    populateDropdowns();
    updateCalendar();
});

let selectedDates = { start: null, end: null };

function populateDropdowns() {
    console.log("Populating dropdowns.");
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Clear existing options and populate month dropdown
    monthSelect.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = new Date(0, i).toLocaleString('default', { month: 'long' });
        monthSelect.appendChild(option);
    }

    // Clear existing options and populate year dropdown
    yearSelect.innerHTML = '';
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    monthSelect.addEventListener('change', updateCalendar);
    yearSelect.addEventListener('change', updateCalendar);
    console.log("Dropdowns populated.");
}

function updateCalendar() {
    console.log("Updating calendar.");
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Clear previous calendar entries
    calendar.innerHTML = '';

    // Create headers for days of the week
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Fill the calendar with day cells
    const firstDayOfMonth = new Date(year, month, 1);
    const firstSunday = new Date(firstDayOfMonth);
    firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());  // Adjust to the first Sunday

    for (let i = 0; i < 42; i++) {  // Always display 6 weeks
        const currentDay = new Date(firstSunday);
        currentDay.setDate(firstSunday.getDate() + i);

        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = currentDay.getDate();
        dayCell.dataset.date = currentDay.toISOString().slice(0, 10);
        dayCell.onclick = () => selectDate(new Date(currentDay));

        console.log(`Creating cell for date: ${currentDay.toISOString().slice(0, 10)}`);  // Log the date being created

        if (currentDay.getMonth() !== month) {
            dayCell.classList.add('not-current-month');
        }

        calendar.appendChild(dayCell);
    }

    highlightRange();
    console.log("Calendar updated.");
}

function selectDate(date) {
    console.log(`Date selected: ${date.toISOString().slice(0, 10)}`);
    if (!selectedDates.start || selectedDates.end) {
        selectedDates.start = date;
        selectedDates.end = null;
    } else {
        selectedDates.end = date;
    }
    highlightRange();
    console.log(`Selected Date Range: Start = ${selectedDates.start ? selectedDates.start.toISOString().slice(0, 10) : "Not Set"}, End = ${selectedDates.end ? selectedDates.end.toISOString().slice(0, 10) : "Not Set"}`);
}

function highlightRange() {
    console.log("Highlighting range.");
    const days = document.querySelectorAll('.day:not(.header)');
    days.forEach(day => {
        const dayDate = new Date(day.dataset.date);
        // Clear any previous highlights
        day.classList.remove('selected');

        if (selectedDates.start && selectedDates.end) {
            if (dayDate >= selectedDates.start && dayDate <= selectedDates.end) {
                day.classList.add('selected');
            }
        } else if (selectedDates.start && !selectedDates.end) {
            if (dayDate.toISOString().slice(0, 10) === selectedDates.start.toISOString().slice(0, 10)) {
                day.classList.add('selected');
            }
        }
    });
    console.log("Range highlighted.");
}

function resetSelection() {
    selectedDates.start = null;
    selectedDates.end = null;
    highlightRange();
    console.log("Date selection reset.");
}
