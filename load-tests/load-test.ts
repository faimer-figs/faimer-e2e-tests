import {O3_URL} from "../e2e/utils/configs/globalSetup";
import {runDemoPatientsTest} from "./validate-demo-patients";
import {runSamplePatientsTest} from "./validate-sample-patients";
import {runSamplePatientsResultViewerTest} from "./validate-result-viewer";

export const config = {
    target: `${O3_URL}`,
    phases: [
        {
            duration: 600,
            arrivalCount:6,
        },
        // {
        //     duration: 60,
        //     arrivalRate: 1,
        //     rampTo: 5,
        //     maxVusers: 20,
        //     name: 'Ramp-up to Peak Load',
        // },
        // {
        //     duration: 60,
        //     arrivalRate: 5,
        //     maxVusers: 20,
        //     name: 'Peak Load',
        // },
        // {
        //     duration: 60,
        //     arrivalRate: 5,
        //     rampTo: 1,
        //     maxVusers: 20,
        //     name: 'Cool Down',
        // },
    ],
    engines: {
        playwright: {
            launchOptions: {
                headless: true,
                viewport: {
                    width: 1920,
                    height: 1080
                },
                args: ['--start-fullscreen', '--start-maximized']
            },
            aggregateByName: true,
            extendedMetrics: true
        }
    },
};

export const scenarios = [
    {
        engine: 'playwright',
        name: 'Login OpenMRS and validate if Demo Patients are present',
        testFunction: runDemoPatientsTest,
    },
    {
        engine: 'playwright',
        name: 'Login OpenMRS and validate if all 5 Sample Patients are present',
        testFunction: runSamplePatientsTest,
    },
    {
        engine: 'playwright',
        name: 'Validate if Sample Patients contain results',
        testFunction: runSamplePatientsResultViewerTest,
    }
];

