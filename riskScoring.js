/**
 * Risk Scoring Functions
 * Calculates risk scores for BP, Temperature, and Age
 */

// Calculate Blood Pressure Risk Score
export function calculateBloodPressureRisk(bloodPressure) {
    const systolic = bloodPressure.systolic;
    const diastolic = bloodPressure.diastolic;

    const sysNum = parseFloat(systolic);
    const diaNum = parseFloat(diastolic);

    if(sysNum < 120 && diaNum < 80) {
        return 0;
    }

    if(sysNum >= 120 && sysNum <=129 && diaNum <80) {
        return 1;
    }

    if((sysNum >= 130 && sysNum <= 139) || (diaNum >=80 && diaNum <= 89)){
        return 2;
    }
  
    if(sysNum >= 140 || diaNum >=90) {
        return 3;
    }

    return 3;
}

//Calculate Temperature Risk Score
export function calculateTemperatureRisk(temperature) {
    const tempNum = parseFloat(temperature);

    if(tempNum <= 99.0) {
        return 0;
    }

    if(tempNum >= 99.1 && tempNum <= 100.9) {
        return 1;
    }

    if(tempNum > 101.0) {
        return 2;
    }

    return 3;
}

//Calculate Age Risk Score
export function calculateAgeRisk(age) {
    const ageNum = parseFloat(age);

    if(ageNum <= 39) {
        return 0;
    }

    if(ageNum >=40 && ageNum <= 65) {
        return 1;
    }

    if(ageNum >= 65) {
        return 2;
    }

    return 3;
}

//Calculate Total Risk Score
export function calculateTotalRisk(patient) {
    const bpRisk = calculateBloodPressureRisk(patient.bloodPressure);
    const tempRisk = calculateTemperatureRisk(patient.temperature);
    const ageRisk = calculateAgeRisk(patient.age);

    return bpRisk + tempRisk + ageRisk;
}