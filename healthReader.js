const fs = require('fs').promises;

async function healthMetricsCounter(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content);

        if (!Array.isArray(data.metrics)) {
            throw new Error('Health data must contain a metrics array');
        }

        return {
            totalEntries: data.metrics.length
        };

    } catch (error) {
        throw new Error(`Unable to read health data: ${error.message}`);
    }
}

module.exports = { healthMetricsCounter };
