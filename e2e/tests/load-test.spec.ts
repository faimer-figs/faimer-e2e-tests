import {runPatientSummaryTest} from "./chart-summary.spec";
import {runDemoPatientsTest} from "./demo-patients.spec";
import {
    runAddDischargeInstructionsTest,
    runDeleteDischargeInstructionsTest,
    runEditDischargeInstructionsTest
} from "./discharge-instructions-form.spec";


export const config = {
    target: 'https://oz-faimer-dev.mekomsolutions.net',
    engines: {
        playwright: {
            timeout: 60000
        }
    }
};

export const scenarios = [
    {
        engine: 'playwright',
        testFunction: runPatientSummaryTest
    },
    {
        engine: 'playwright',
        testFunction: runDemoPatientsTest
    },
    {
        engine: 'playwright',
        testFunction: runAddDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        testFunction: runEditDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteDischargeInstructionsTest
    }
];

