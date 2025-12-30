/**
 * Configuration for the Healthcare API
 */

export const CONFIG = {
    API_KEY: 'ak_67d1b0059e62f7c0785487e7c13ad4f41a17217cc62181',
    BASE_URL: 'https://assessment.ksensetech.com/api',
    MAX_RETRIES: 5,
    RETRY_DELAY_MS: 1000, // Initial delay
    RATE_LIMIT_DELAY_MS: 2000, // Delay when hitting rate limits
    MAX_RETRY_DELAY_MS: 10000, // Maximum delay between retries
};