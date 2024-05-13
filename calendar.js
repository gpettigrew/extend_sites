document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    updateCalendar();
});

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
}

function updateCalendar() {
    const month = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearSelect').value;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, parseInt(month) + 1, 0);
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';  // Clear previous calendar cells

    // Add days of the week headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
        const header = document.createElement('div');
        header.className = 'day header';
        header.textContent = daysOfWeek[i];
        calendar.appendChild(header);
    }

    // Generate days for the calendar
    let day = new Date(firstDay);
    while (day.getDay() !== 0) {  // Pad the calendar with empty cells if month does not start on Sunday
        const paddingDay = document.createElement('div');
        paddingDay.className = 'day padding';
        calendar.appendChild(paddingDay);
        day.setDate(day.getDate() - 1);
    }
    
    for (day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = day.getDate();
        calendar.appendChild(dayCell);
    }
}

        dayCell.textContent = day.getDate();
        calendar.appendChild(dayCell);
    }
}
