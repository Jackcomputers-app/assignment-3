const { healthMetricsCounter } = require('../healthReader');
const path = require('path');

test('reads a valid JSON health file', async () => {
    const filePath = path.join(__dirname, '../data/health-metrics.json');

    const result = await healthMetricsCounter(filePath);

    expect(result.totalEntries).toBe(8);
});

test('handles a missing JSON file', async () => {
    await expect(
        healthMetricsCounter('./data/missing.json')
    ).rejects.toThrow();
});

test('returns the correct data structure', async () => {
    const filePath = path.join(__dirname, '../data/health-metrics.json');

    const result = await healthMetricsCounter(filePath);

    expect(result).toHaveProperty('totalEntries');
    expect(typeof result.totalEntries).toBe('number');
});
