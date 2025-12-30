/**
 * API Client for interacting with the healthcare risk assessment service
 */


//retry logic
async function makeRequestWithRetry(endpoint, options = {}, retryCount = 0) {
    const url = `${API_BASE_URL}${endpoint}`;
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