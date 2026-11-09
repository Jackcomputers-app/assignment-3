const fs = require('fs');
const csv = require('csv-parser');

function workoutCalculator(filePath) {
    return new Promise((resolve, reject) => {
        const workouts = [];

        fs.createReadStream(filePath)
            .on('error', error => {
                reject(new Error(`Unable to read workout file: ${error.message}`));
            })
            .pipe(csv())
            .on('data', row => {
                workouts.push(row);
            })
            .on('end', () => {
                let totalMinutes = 0;

                for (let i = 0; i < workouts.length; i++) {
                    totalMinutes += Number(workouts[i].duration);
                }

                resolve({
                    totalWorkouts: workouts.length,
                    totalMinutes
                });
            })
            .on('error', error => {
                reject(new Error(`Invalid CSV data: ${error.message}`));
            });
    });
}

module.exports = { workoutCalculator };
