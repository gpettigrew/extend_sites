document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    updateCalendar();
});

function populateDropdowns() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Clear existing options if needed
    monthSelect.innerHTML = '';
    yearSelect.innerHTML = '';

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
}

function updateCalendar() {
    const month = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearSelect').value;
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

    // Calculate the start date to fill the calendar
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = new Date(firstDayOfMonth);
    firstDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()); // Adjust to the first Sunday

    // Generate one month's view, plus overflow to fill weeks
    for (let i = 0; i < 42; i++) {  // Always display 6 weeks
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = firstDay.getDate();
        if (firstDay.getMonth() !== parseInt(month)) {
            dayCell.classList.add('not-current-month');  // Style days not in the current month differently
        }
        calendar.appendChild(dayCell);
        firstDay.setDate(firstDay.getDate() + 1);
    }
}
