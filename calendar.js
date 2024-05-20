document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");
    populateDropdowns();
    updateCalendar();
});

let selectedDate = null;

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
        currentDay.setHours(0, 0, 0, 0); // Ensure time is set to start of day

        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = currentDay.getDate();
        dayCell.dataset.date = currentDay.toISOString().slice(0, 10);
        dayCell.onclick = () => selectDate(currentDay);

        console.log(`Creating cell for date: ${currentDay.toDateString()}`);  // Log the date being created

        if (currentDay.getMonth() !== month) {
            dayCell.classList.add('not-current-month');
        }

        calendar.appendChild(dayCell);
    }

    highlightSelectedDate();
    console.log("Calendar updated.");
}

function selectDate(date) {
    console.log(`Date selected: ${date.toDateString()}`);
    selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set time to start of the day in local time
    highlightSelectedDate();
}

function highlightSelectedDate() {
    console.log("Highlighting selected date.");
    if (!selectedDate) return; // Ensure selectedDate is not null

    const days = document.querySelectorAll('.day:not(.header)');

    days.forEach(day => {
        const dayDate = new Date(day.dataset.date);
        dayDate.setHours(0, 0, 0, 0);

        console.log(`Comparing: ${dayDate.getTime()} with ${selectedDate.getTime()}`);
        console.log(`Comparing (Date Strings): ${dayDate.toDateString()} with ${selectedDate.toDateString()}`);

        // Clear any previous highlights
        day.classList.remove('selected');

        if (selectedDate && dayDate.getTime() === selectedDate.getTime()) {
            day.classList.add('selected');
            console.log(`Highlighting date: ${dayDate.toDateString()}`);
        }
    });
}
