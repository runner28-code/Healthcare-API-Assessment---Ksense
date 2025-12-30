/**
 * API Client for interacting with the healthcare risk assessment service
 */

import { CONFIG } from './config.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//retry logic
async function makeRequestWithRetry(endpoint, options = {}, retryCount = 0) {
    const url = `${CONFIG.BASE_URL}${endpoint}`;

    const headers = {
        'x-api-key': CONFIG.API_KEY,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try{
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if(response.status === 429) {
            if(retryCount < CONFIG.MAX_RETRIES) {
                await sleep(CONFIG.RATE_LIMIT_DELAY_MS);
                return makeRequestWithRetry(endpoint, options, retryCount + 1);
            }else {
                throw new Error('Max retries reached for rate limiting');
            }
        }

        if(response.status >= 500 && response.status < 600) {
            if(retryCount < CONFIG.MAX_RETRIES) {
                const delay = Math.min(CONFIG.RETRY_DELAY_MS * Math.pow(2, retryCount) + Math.random() * 1000, CONFIG.MAX_RETRY_DELAY_MS);
                await sleep(delay);
                return makeRequestWithRetry(endpoint, options, retryCount + 1);
            }else {
                throw new Error(`Max retries reached for server error: ${response.status}`);
            }
        }

        if(!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        return response;
    } catch (error) {
        if(retryCount < CONFIG.MAX_RETRIES && !error.message.includes('Max retries')) {
            const delay = Math.min(
            CONFIG.RETRY_DELAY_MS * Math.pow(2, retryCount) + Math.random() * 1000,
            CONFIG.MAX_RETRY_DELAY_MS
        );
            console.log(`Request failed: ${error.message}. Retrying in ${Math.round(delay)}ms... (Attempt ${retryCount + 1}/${CONFIG.MAX_RETRIES})`);
            await sleep(delay);
            return makeRequestWithRetry(endpoint, options, retryCount + 1);
        }
        throw error;
    }
}

//fetch all patients to get patient data
export async function fetchAllPatients() {
    const allPatients = [];
    let page = 1;
    let hasNext = true;

    while(hasNext) {
        try{
            
        }
    }
}