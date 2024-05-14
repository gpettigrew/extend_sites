document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    updateCalendar();
});

function populateDropdowns() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    console.log("Populating Dropdowns...");

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
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, parseInt(month) + 1, 0);

    console.log("Updating Calendar for", month, year);

    calendar.innerHTML = '';  // Clear previous calendar cells

    // Generate days for the calendar
    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = day.getDate();
        calendar.appendChild(dayCell);
    }
}
