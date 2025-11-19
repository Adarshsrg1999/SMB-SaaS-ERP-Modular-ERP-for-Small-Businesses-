const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'insurance.db');
const db = new sqlite3.Database(dbPath);

console.log('--- USERS ---');
db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.table(rows);
    }
});

setTimeout(() => {
    console.log('\n--- ORDERS ---');
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.table(rows);
        }
    });
}, 100); // Small delay to keep output ordered
