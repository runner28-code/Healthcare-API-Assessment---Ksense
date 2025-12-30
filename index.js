import { fetchAllPatients } from "./apiClient";
import { processPatients} from "./patientProcessor";

async function main() {
    try {
        //Fetch all patients
        const patients = await fetchAllPatients();

        if(!patients || patients.length === 0) {
            throw new Error('No patients found');
        }
        //process patients
        const results = processPatients(patients);
        //submit results
        const submissionResult = await submitAssessment(results);

        //Display the results
        console.log('========== Result ==========');
        console.log(JSON.stringify(submissionResult, null, 2));

        if(submissionResult.success) {
            console.log('Submit successfully');
            console.log(` Score: ${submissionResult.score}/${submissionResult.submitted || 'N/A'}`);
            console.log(` Percentage: ${submissionResult.percentage || 'N/A'}%`);
            console.log(` Status: ${submissionResult.status || 'N/A'}`);

            if(submissionResult.breakdown) {
                console.log('\n Breakdown:');
                console.log(` High Risk: ${submissionResult.breakdown.high_risk || 0}`);
                console.log(` Fever: ${submissionResult.breakdown.fever || 0}`);
                console.log(` Correct: ${submissionResult.breakdown.correct || 0}`);
                console.log(` submitted: ${submissionResult.breakdown.submitted || 0}`);
                console.log(` Matched: ${submissionResult.breakdown.matches || 0}`);
            }
        }else {
            console.log(`submission failed: ${submissionResult.message || 'Unknown error'}`);
        }
    } catch(error) {
        console.error('\n Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();