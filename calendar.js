document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    function loadCalendarDays() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';

        for(let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day.getDate();
            calendar.appendChild(dayElement);
        }
    }

    loadCalendarDays();
});
