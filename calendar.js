<!DOCTYPE html>
<html>
<head>
    <style>
        .day {
            display: inline-block;
            width: 14%;
            text-align: center;
            border: 1px solid #ccc;
            cursor: pointer;
            padding: 10px;
            box-sizing: border-box;
        }
        .header {
            font-weight: bold;
            background-color: #f0f0f0;
        }
        .not-current-month {
            background-color: #e0e0e0;
        }
        .selected {
            background-color: #add8e6;
        }
    </style>
</head>
<body>
    <select id="monthSelect"></select>
    <select id="yearSelect"></select>
    <select id="timeZoneSelect"></select>
    <div id="calendar"></div>
    <script src="calendar.js"></script>
</body>
</html>
