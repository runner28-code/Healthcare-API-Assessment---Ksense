/**
 * Patient Data Processing and Categorization
 */

import {
    calculateTotalRisk,
    calculateBloodPressureRisk,
    calculateTemperatureRisk,
    calculateAgeRisk,
} from './riskScoring.js';

//check invalid type
function isInvalidOrMissing(value) {
    if(value === null || value === undefined || value === '') {
        return true;
     }
    if(typeof value === 'string') {
       const lower = value.toLowerCase().trim();
       return lower === 'null' || lower === 'temperror' || lower === 'true' || lower === 'unknown';
    }
    if(typeof value === 'number') {
        return isNaN(value) || !isFinite(value);
    }
    return false;
}

function hasDataQualityIssue(patient) {
    if(!patient.bloodPressure || typeof patient.bloodPressure !== 'object') {
        return true;
    }
    if(isInvalidOrMissing(patient.bloodPressure.systolic) || isInvalidOrMissing(patient.bloodPressure.diastolic)) {
        return true;
    }
    if(isInvalidOrMissing(patient.temperature)) {
        return true;
    }
    if(isInvalidOrMissing(patient.age)) {
        return true;
    }
    return false;
}

//get fever patients
function hasFever(patient) {
    if(isInvalidOrMissing(patient.temperature)) {
        return false;
    }
    const tempNum = parseFloat(patient.temperature);
    if(isNaN(tempNum) || !isFinite(tempNum)) {
        return false;
    }

    return tempNum >= 99.0;
}

export function processPatients(patients) {
    const highRiskPatients = [];
    const feverPatients = [];
    const dataQualityIssues = [];

    patients.forEach((patient, index) => {
        if(!patient || !patient.id) {
            return;
        }
        const patientId = String(patient.id);
        const totalRisk = calculateTotalRisk(patient);

        if(totalRisk >= 4) {
            highRiskPatients.push(patientId);
        }

        if(hasFever(patient)) {
            feverPatients.push(patientId);
        }

        if(hasDataQualityIssue(patient)) {
            dataQualityIssues.push(patientId);
        }
    });

    const uniqueHighRisk = [...new Set(highRiskPatients)];
    const uniqueFever = [...new Set(feverPatients)];
    const uniqueDataQuality = [...new Set(dataQualityIssues)];

    return {
        high_risk_patients: uniqueHighRisk.sort(),
        fever_patients: uniqueFever.sort(),
        data_quality_issues: uniqueDataQuality.sort(),
    };
}
