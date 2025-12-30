/**
 * Risk Scoring Functions
 * Calculates risk scores for BP, Temperature, and Age
 */

//Check invalid type
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


function isValidNumber(value) {
    if(isInvalidOrMissing(value)) {
        return false;
    }
    const num = typeof value === 'number' ? value : parseFloat(value);
    return !isNaN(num) && isFinite(num);
}
// Calculate Blood Pressure Risk Score
export function calculateBloodPressureRisk(bloodPressure) {
    if(!bloodPressure)    return 0;
    const parts = bloodPressure.split('/');
    if(parts.length !== 2) return 0;
    const sysNum = Number(parts[0].trim());
    const diaNum = Number(parts[1].trim());

    if(sysNum === 0 || diaNum === 0 ) return 0;

    if(isNaN(sysNum) || isNaN(diaNum) || !isFinite(sysNum) || !isFinite(diaNum)) {
        return 0;
    }

    if(sysNum >= 140 || diaNum >=90) {
        return 3;
    }
    if((sysNum >= 130 && sysNum <= 139) || (diaNum >=80 && diaNum <= 89)){
        return 2;
    }
    if(sysNum >= 120 && sysNum <=129 && diaNum <80) {
        return 1;
    }
    if(sysNum < 120 && diaNum < 80) {
        return 0;
    }

    return 3;
}

//Calculate Temperature Risk Score
export function calculateTemperatureRisk(temperature) {
    console.log("Calculating Temperature Risk for:", temperature);
    if(isInvalidOrMissing(temperature)) {
        return 0;
    }

    const tempNum = parseFloat(temperature);

    if(isNaN(tempNum) || !isFinite(tempNum)) {
        return 0;
    }

    if(tempNum <= 99.5) {
        return 0;
    }

    if(tempNum >= 99.6 && tempNum <= 100.9) {
        return 1;
    }

    if(tempNum >= 101.0) {
        return 2;
    }

    return 3;
}

//Calculate Age Risk Score
export function calculateAgeRisk(age) {
    console.log("Calculating Age Risk for:", age);
    if(isInvalidOrMissing(age)) {
        return 0;
    }

    const ageNum = parseFloat(age);

    if(isNaN(ageNum) || !isFinite(ageNum)) {
        return 0;
    }

    if(ageNum < 40) {
        return 0;
    }

    if(ageNum >=40 && ageNum <= 65) {
        return 1;
    }

    if(ageNum > 65) {
        return 2;
    }

    return 3;
}

//Calculate Total Risk Score
export function calculateTotalRisk(patient) {
    const bpRisk = calculateBloodPressureRisk(patient.blood_pressure);
    const tempRisk = calculateTemperatureRisk(patient.temperature);
    const ageRisk = calculateAgeRisk(patient.age);

    console.log(`Patient ID: ${patient.patient_id}, Total Risk: ${bpRisk + tempRisk + ageRisk}`);

    return bpRisk + tempRisk + ageRisk;
}