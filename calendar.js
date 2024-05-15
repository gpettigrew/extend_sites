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

    for (let i = 0; i < 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = new Date(0, i).toLocaleString('default', { month: 'long' });
        monthSelect.appendChild(option);
    }

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

    calendar.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = new Date(firstDayOfMonth);
    firstDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    for (let i = 0; i < 42; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = firstDay.getDate();
        dayCell.dataset.date = firstDay.toISOString().slice(0, 10);
        dayCell.onclick = () => selectDate(new Date(firstDay.getTime()));

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
    } else {
        selectedDates.end = date;
    }
    highlightRange();
    console.log(`Selected Date Range: Start = ${selectedDates.start.toISOString().slice(0, 10)}, End = ${selectedDates.end ? selectedDates.end.toISOString().slice(0, 10) : "Not Set"}`);
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

function resetSelection() {
    selectedDates.start = null;
    selectedDates.end = null;
    highlightRange();
    console.log("Date selection reset.");
}
