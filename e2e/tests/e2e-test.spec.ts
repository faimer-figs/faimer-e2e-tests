import {test} from '../utils/configs/globalSetup';
import {runPatientSummaryTest} from "./chart-summary.spec";
import {runDemoPatientsTest} from "./demo-patients.spec";
import {
    runAddDischargeInstructionsTest,
    runDeleteDischargeInstructionsTest,
    runEditDischargeInstructionsTest
} from "./discharge-instructions-form.spec";
import {
    runAddDischargeSummaryTest,
    runDeleteDischargeSummaryTest,
    runEditDischargeSummaryTest
} from "./discharge-summary-form.spec";
import {
    runAddDrugOrderTest,
    runAddDrugOrderWithFreeTextDosageTest,
    runDiscontinueDrugOrderTest,
    runModifyDrugOrderTest
} from "./drug-orders.spec";
import {runEditPatientDetailsTest} from "./edit-patient-details.spec";
import {runRenderIframeTest} from "./iframe.spec";
import {runAddImagingOrderTest, runDiscontinueImagingOrderTest, runModifyImagingOrderTest} from "./imaging-orders.spec";
import {runAddLabOrderTest, runDiscontinueLabOrderTest, runModifyLabOrderTest} from "./lab-orders.spec";
import {runOrderBasketLoadAllOrderablesTest} from "./order-basket.spec";
import {
    runCreatePatientListTest,
    runDeletePatientListTest,
    runEditPatientListTest,
    runManagePatientListTest, runPatientListVisibilityCheckTest
} from "./patient-list.spec";
import {
    runSearchPatientByAgeTest, runSearchPatientByDateOfBirthTest,
    runSearchPatientByFullNameTest,
    runSearchPatientByGivenNameTest,
    runSearchPatientByIdentifierTest, runSearchPatientByPostalCodeTest
} from "./patient-search.spec";
import {
    runAddProcedureNoteTest,
    runDeleteProcedureNoteTest,
    runEditProcedureNoteTest
} from "./procedure-note-form.spec";
import {runSamplePatientsCreatedUponFirstLoginTest} from "./sample-patients.spec";
import {runAddSoapNoteTest, runDeleteSoapNoteTest, runEditSoapNoteTest} from "./soap-note-form.spec";
import {
    runAddSurgicalOperationInstructionTest, runDeleteSurgicalOperationInstructionTest,
    runEditSurgicalOperationInstructionTest, runEstimateBloodLossFieldFieldValidationTest
} from "./surgical-operation-form.spec";
import {runUserCreationAndFilteringTest} from "./users.spec";
import {runAddVisitNoteTest, runDeleteVisitNoteTest, runEditVisitNoteTest} from "./visit-note-form.spec";
import {runEditPatientVisitTest, runEndPatientVisitTest, runStartPatientVisitTest} from "./visits.spec";
import {
    runAddWardAdmissionRequestTest, runCreateWardAdmissionRequestTest,
    runDeleteWardAdmissionRequestTest,
    runEditWardAdmissionRequestTest
} from "./ward-admission-form.spec";

test('Patient summary to load all the apps', async ({page, browser}) => {
    await runPatientSummaryTest(page, browser);
});

test('Demo patients should be present and accessible through patient search', async ({page, browser}) => {
    await runDemoPatientsTest(page, browser);
});

test('Add discharge instructions', async ({page, browser}) => {
    await runAddDischargeInstructionsTest(page, browser);
});

test('Edit discharge instructions', async ({page, browser}) => {
    await runEditDischargeInstructionsTest(page, browser);
});

test('Delete discharge instructions', async ({page, browser}) => {
    await runDeleteDischargeInstructionsTest(page, browser);
});

test('Add discharge summary', async ({page, browser}) => {
    await runAddDischargeSummaryTest(page, browser);
});

test('Edit discharge summary', async ({page, browser}) => {
    await runEditDischargeSummaryTest(page, browser);
});

test('Delete discharge summary', async ({page, browser}) => {
    await runDeleteDischargeSummaryTest(page, browser);
});

test('Add a drug order', async ({page, browser}) => {
    await runAddDrugOrderTest(page, browser);
});

test('Modify a drug order', async ({page, browser}) => {
    await runModifyDrugOrderTest(page, browser);
});

test('Discontinue a drug order', async ({page, browser}) => {
    await runDiscontinueDrugOrderTest(page, browser);
});

test('Add a drug order with free text dosage', async ({page, browser}) => {
    await runAddDrugOrderWithFreeTextDosageTest(page, browser);
});

test('Edit patient details', async ({page, browser}) => {
    await runEditPatientDetailsTest(page, browser);
});

test('Render server in an iframe after login, with all core features available', async ({page, browser}) => {
    await runRenderIframeTest(page, browser);
});

test('Add an imaging order', async ({page, browser}) => {
    await runAddImagingOrderTest(page, browser);
});

test('Modify an imaging order', async ({page, browser}) => {
    await runModifyImagingOrderTest(page, browser);
});

test('Discontinue an imaging order', async ({page, browser}) => {
    await runDiscontinueImagingOrderTest(page, browser);
});

test('Add a lab test', async ({page, browser}) => {
    await runAddLabOrderTest(page, browser);
});

test('Modify a lab order', async ({page, browser}) => {
    await runModifyLabOrderTest(page, browser);
});

test('Discontinue a lab order', async ({page, browser}) => {
    await runDiscontinueLabOrderTest(page, browser);
});

test('Order basket should load all the orderables', async ({page, browser}) => {
    await runOrderBasketLoadAllOrderablesTest(page, browser);
});

test('Create a patient list', async ({page, browser}) => {
    await runCreatePatientListTest(page, browser);
});

test('Edit a patient list', async ({page, browser}) => {
    await runEditPatientListTest(page, browser);
});

test('Delete a patient list', async ({page, browser}) => {
    await runDeletePatientListTest(page, browser);
});

test('Manage patients in a list', async ({page, browser}) => {
    await runManagePatientListTest(page, browser);
});

test('Patient list created by one user should not be visible to another user', async ({page, browser}) => {
    await runPatientListVisibilityCheckTest(page, browser);
});

test('Search patient by given name', async ({page, browser}) => {
    await runSearchPatientByGivenNameTest(page, browser);
});

test('Search patient by full name', async ({page, browser}) => {
    await runSearchPatientByFullNameTest(page, browser);
});

test('Search patient by identifier', async ({page, browser}) => {
    await runSearchPatientByIdentifierTest(page, browser);
});

test('Search patient by postal code', async ({page, browser}) => {
    await runSearchPatientByPostalCodeTest(page, browser);
});

test('Search patient by age', async ({page, browser}) => {
    await runSearchPatientByAgeTest(page, browser);
});

test('Search patient by date of birth', async ({page, browser}) => {
    await runSearchPatientByDateOfBirthTest(page, browser);
});

test('Add procedure note', async ({page, browser}) => {
    await runAddProcedureNoteTest(page, browser);
});

test('Edit procedure note', async ({page, browser}) => {
    await runEditProcedureNoteTest(page, browser);
});

test('Delete procedure note', async ({page, browser}) => {
    await runDeleteProcedureNoteTest(page, browser);
});

test('Sample patients should be created upon the first user login', async ({page, browser}) => {
    await runSamplePatientsCreatedUponFirstLoginTest(page, browser);
});

test('Add soap note', async ({page, browser}) => {
    await runAddSoapNoteTest(page, browser);
});

test('Edit soap note', async ({page, browser}) => {
    await runEditSoapNoteTest(page, browser);
});

test('Delete soap note', async ({page, browser}) => {
    await runDeleteSoapNoteTest(page, browser);
});

test('Add surgical operation instructions', async ({page, browser}) => {
    await runAddSurgicalOperationInstructionTest(page, browser);
});

test('Edit surgical operation instructions', async ({page, browser}) => {
    await runEditSurgicalOperationInstructionTest(page, browser);
});

test('Delete surgical operation instructions', async ({page, browser}) => {
    await runDeleteSurgicalOperationInstructionTest(page, browser);
});

test('Estimated blood loss field should allow valid input', async ({page, browser}) => {
    await runEstimateBloodLossFieldFieldValidationTest(page, browser);
});

test('User creation and data filtering', async ({page, browser}) => {
    await runUserCreationAndFilteringTest(page, browser);
});

test('Add visit note', async ({page, browser}) => {
    await runAddVisitNoteTest(page, browser);
});

test('Edit visit note', async ({page, browser}) => {
    await runEditVisitNoteTest(page, browser);
});

test('Delete visit note', async ({page, browser}) => {
    await runDeleteVisitNoteTest(page, browser);
});

test('Start patient visit', async ({page, browser}) => {
    await runStartPatientVisitTest(page, browser);
});

test('Edit patient visit', async ({page, browser}) => {
    await runEditPatientVisitTest(page, browser);
});

test('End patient visit', async ({page, browser}) => {
    await runEndPatientVisitTest(page, browser);
});

test('Add ward admission request', async ({page, browser}) => {
    await runAddWardAdmissionRequestTest(page, browser);
});

test('Edit ward admission request', async ({page, browser}) => {
    await runEditWardAdmissionRequestTest(page, browser);
});

test('Delete ward admission request', async ({page, browser}) => {
    await runDeleteWardAdmissionRequestTest(page, browser);
});

test('Creating ward admission request should create admission request in the respective location', async ({page, browser}) => {
    await runCreateWardAdmissionRequestTest(page, browser);
});
