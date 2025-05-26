import {test} from '../utils/configs/globalSetup';
import {runPatientSummaryTest} from "./chart-summary.spec";

test('Patient summary to load all the apps', async ({page, browser}) => {
    await runPatientSummaryTest(page, browser);
});