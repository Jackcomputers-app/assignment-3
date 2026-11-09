require('dotenv').config();

const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

async function processFiles() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = Number(process.env.WEEKLY_GOAL);

        console.log('Processing data for:', userName);

        console.log('Reading workout data...');
        const workoutData = await workoutCalculator('./data/workouts.csv');

        console.log('Total workouts:', workoutData.totalWorkouts);
        console.log('Total minutes:', workoutData.totalMinutes);

        console.log('Reading health data...');
        const healthData = await healthMetricsCounter('./data/health-metrics.json');

        console.log('Total health entries:', healthData.totalEntries);

        console.log('\nSUMMARY:');
        console.log('Workouts found:', workoutData.totalWorkouts);
        console.log('Total workout minutes:', workoutData.totalMinutes);
        console.log('Health entries found:', healthData.totalEntries);
        console.log('Weekly goal:', weeklyGoal, 'minutes');

        if (workoutData.totalMinutes >= weeklyGoal) {
            console.log('Congratulations ' + userName + '! You met your weekly goal!');
        } else {
            console.log('Keep going ' + userName + '! You have not met your weekly goal yet.');
        }

    } catch (error) {
        console.error('Error processing files:', error.message);
    }
}

processFiles();
