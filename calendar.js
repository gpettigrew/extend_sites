document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    updateCalendar();
});

let selectedDates = { start: null, end: null };

function populateDropdowns() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Populate the month dropdown
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = new Date(0, i).toLocaleString('default', { month: 'long' });
        monthSelect.appendChild(option);
    }

    // Populate the year dropdown from current year - 10 to current year + 10
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
}

function updateCalendar() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    calendar.innerHTML = '';  // Clear the calendar

    // Create day of week headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = new Date(firstDayOfMonth);
    firstDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()); // Adjust to the first Sunday

    // Generate one month's view, plus overflow to fill weeks
    for (let i = 0; i < 42; i++) {  // Always display 6 weeks
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = firstDay.getDate();
        dayCell.dataset.date = firstDay.toISOString().slice(0, 10); // ISO string format
        dayCell.onclick = () => selectDate(new Date(firstDay));

        if (firstDay.getMonth() !== month) {
            dayCell.classList.add('not-current-month');
        }

        calendar.appendChild(dayCell);
        firstDay.setDate(firstDay.getDate() + 1);
    }

    highlightRange();
}

function selectDate(date) {
    if (!selectedDates.start || selectedDates.end) {
        selectedDates.start = date;
        selectedDates.end = null;
    } else if (date < selectedDates.start) {
        selectedDates.end = selectedDates.start;
        selectedDates.start = date;
    } else {
        selectedDates.end = date;
    }
    highlightRange();
}

function highlightRange() {
    const days = document.querySelectorAll('.day:not(.header)');
    days.forEach(day => {
        const dayDate = new Date(day.dataset.date);
        if (selectedDates.start && selectedDates.end && dayDate >= selectedDates.start && dayDate <= selectedDates.end) {
            day.classList.add('selected');
        } else if (selectedDates.start && !selectedDates.end && dayDate.toISOString().slice(0, 10) === selectedDates.start.toISOString().slice(0, 10)) {
            day.classList.add('selected');
        } else {
            day.classList.remove('selected');
        }
    });
}
