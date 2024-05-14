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
    monthSelect.innerHTML = ''; // Clear existing options
    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = new Date(0, i).toLocaleString('default', { month: 'long' });
        monthSelect.appendChild(option);
    }

    // Populate the year dropdown
    yearSelect.innerHTML = ''; // Clear existing options
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
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const calendar = document.getElementById('calendar');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    calendar.innerHTML = ''; // Clear previous entries

    // Create headers for days of the week
    daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Start building days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();

    // Fill in blanks for days before start of the month
    for (let i = 0; i < startDayOfWeek; i++) {
        const blank = document.createElement('div');
        blank.className = 'day';
        calendar.appendChild(blank);
    }

    // Fill in actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = day;
        dayCell.dataset.date = new Date(year, month, day).toISOString().slice(0, 10);
        dayCell.addEventListener('click', function() { selectDate(new Date(year, month, day)); });
        calendar.appendChild(dayCell);
    }
}

function selectDate(date) {
    if (!selectedDates.start || selectedDates.end) {
        selectedDates.start = date;
        selectedDates.end = null;
    } else if (selectedDates.start.getTime() === date.getTime() || date < selectedDates.start) {
        selectedDates.start = date;
        selectedDates.end = null;
    } else {
        selectedDates.end = date;
    }
    highlightRange();
}

function highlightRange() {
    document.querySelectorAll('.day').forEach(day => {
        const dayDate = new Date(day.dataset.date);
        if (day.dataset.date && selectedDates.start && selectedDates.end &&
            dayDate >= selectedDates.start && dayDate <= selectedDates.end) {
            day.classList.add('selected');
        } else if (day.dataset.date && selectedDates.start && !selectedDates.end &&
                   dayDate.toISOString().slice(0, 10) === selectedDates.start.toISOString().slice(0, 10)) {
            day.classList.add('selected');
        } else {
            day.classList.remove('selected');
        }
    });
}
