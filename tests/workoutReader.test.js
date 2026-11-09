// Test your workoutReader.js module here
const { workoutCalculator } = require('../workoutReader');
const path = require('path');

test('reads a valid CSV workout file', async () => {
    const filePath = path.join(__dirname, '../data/workouts.csv');

    const result = await workoutCalculator(filePath);

    expect(result.totalWorkouts).toBe(10);
    expect(result.totalMinutes).toBe(330);
});

test('handles a missing CSV file', async () => {
    await expect(
        workoutCalculator('./data/missing.csv')
    ).rejects.toThrow();
});

test('returns the correct data structure', async () => {
    const filePath = path.join(__dirname, '../data/workouts.csv');

    const result = await workoutCalculator(filePath);

    expect(result).toHaveProperty('totalWorkouts');
    expect(result).toHaveProperty('totalMinutes');

    expect(typeof result.totalWorkouts).toBe('number');
    expect(typeof result.totalMinutes).toBe('number');
});
