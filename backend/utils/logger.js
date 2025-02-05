const { createLogger, transports, format } = require('winston');
const { timestamp, combine, printf } = format;
const path = require('path');
const fs = require('fs');

// Function to generate log file name based on date (DDMMYYYYapi.log)
const getLogFileName = () => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;
    return path.join(__dirname, `../logs/${formattedDate}-api.log`);
};

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = createLogger({
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.File({ filename: getLogFileName() }), // Save logs to date-based file
        // new transports.Console(), // Also log in the console
    ],
});

// Function to delete log files older than 7 days
const deleteOldLogs = () => {
    const logDir = path.join(__dirname, '../logs');
    const files = fs.readdirSync(logDir);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 7 days old

    files.forEach(file => {
        const match = file.match(/^(\d{2})(\d{2})(\d{4})api\.log$/);
        if (match) {
            const fileDate = new Date(`${match[3]}-${match[2]}-${match[1]}`);
            if (fileDate < sevenDaysAgo) {
                const filePath = path.join(logDir, file);
                fs.unlinkSync(filePath);
                console.log(`Deleted old log file: ${file}`);
            }
        }
    });
};

// Run deleteOldLogs when the app starts
deleteOldLogs();

module.exports = logger;
