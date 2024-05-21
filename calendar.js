document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");
    populateDropdowns();
    populateTimeZones();
    updateCalendar();
});

let selectedDate = null;

const timeZones = [
    { name: "UTC", offset: 0 },
    { name: "GMT", offset: 0 },
    { name: "EST", offset: -5 },
    { name: "CST", offset: -6 },
    { name: "MST", offset: -7 },
    { name: "PST", offset: -8 },
    // Add more time zones as needed
];

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

function populateTimeZones() {
    console.log("Populating time zones.");
    const timeZoneSelect = document.getElementById('timeZoneSelect');
    
    timeZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.offset;
        option.textContent = zone.name;
        timeZoneSelect.appendChild(option);
    });

    timeZoneSelect.addEventListener('change', updateCalendar);
    console.log("Time zones populated.");
}

function updateCalendar() {
    console.log("Updating calendar.");
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const timeZoneOffset = parseInt(document.getElementById('timeZoneSelect').value);
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
        currentDay.setHours(0, 0, 0, 0);

        const dayCell = document.createElement('div');
        dayCell.className = 'day';
        dayCell.textContent = currentDay.getDate();
        dayCell.dataset.date = new Date(currentDay.getTime() - (timeZoneOffset * 60 * 60 * 1000)).toISOString().slice(0, 10);
        dayCell.onclick = () => selectDate(new Date(currentDay));

        console.log(`Creating cell for date: ${currentDay.toISOString().slice(0, 10)}`);  // Log the date being created

        if (currentDay.getMonth() !== month) {
            dayCell.classList.add('not-current-month');
        }

        calendar.appendChild(dayCell);
    }

    highlightSelectedDate();
    console.log("Calendar updated.");
}

function selectDate(date) {
    const timeZoneOffset = parseInt(document.getElementById('timeZoneSelect').value);
    date.setHours(0, 0, 0, 0);
    selectedDate = new Date(date.getTime() - (timeZoneOffset * 60 * 60 * 1000));
    console.log(`Date selected: ${selectedDate.toISOString().slice(0, 10)}`);
    highlightSelectedDate();
}

function highlightSelectedDate() {
    console.log("Highlighting selected date.");
    const days = document.querySelectorAll('.day:not(.header)');

    days.forEach(day => {
        const dayDate = new Date(day.dataset.date).setHours(0, 0, 0, 0);
        const selectedDateTime = new Date(selectedDate).setHours(0, 0, 0, 0);
        
        // Clear any previous highlights
        day.classList.remove('selected');

        if (selectedDate && dayDate === selectedDateTime) {
            day.classList.add('selected');
            console.log(`Highlighting date: ${new Date(dayDate).toISOString().slice(0, 10)}`);
        }
    });
}
