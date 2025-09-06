import {test} from '../utils/configs/globalSetup';
import {runPatientSummaryTest} from "./chart-summary";
import {runDemoPatientsTest} from "./demo-patients";
import {
    runAddDischargeInstructionsTest,
    runDeleteDischargeInstructionsTest,
    runEditDischargeInstructionsTest
} from "./discharge-instructions-form";
import {
    runAddDischargeSummaryTest,
    runDeleteDischargeSummaryTest,
    runEditDischargeSummaryTest
} from "./discharge-summary-form";
import {
    runAddDrugOrderTest,
    runAddDrugOrderWithFreeTextDosageTest,
    runDiscontinueDrugOrderTest,
    runModifyDrugOrderTest
} from "./drug-orders";
import {runEditPatientDetailsTest} from "./edit-patient-details";
import {runRenderIframeTest} from "./iframe";
import {runAddImagingOrderTest, runDiscontinueImagingOrderTest, runModifyImagingOrderTest} from "./imaging-orders";
import {runAddLabOrderTest, runDiscontinueLabOrderTest, runModifyLabOrderTest} from "./lab-orders";
import {runOrderBasketLoadAllOrderablesTest} from "./order-basket";
import {
    runCreatePatientListTest,
    runDeletePatientListTest,
    runEditPatientListTest,
    runManagePatientListTest, runPatientListVisibilityCheckTest
} from "./patient-list";
import {
    runSearchPatientByAgeTest, runSearchPatientByDateOfBirthTest,
    runSearchPatientByFullNameTest,
    runSearchPatientByGivenNameTest,
    runSearchPatientByIdentifierTest, runSearchPatientByPostalCodeTest
} from "./patient-search";
import {
    runAddProcedureNoteTest,
    runDeleteProcedureNoteTest,
    runEditProcedureNoteTest
} from "./procedure-note-form";
import {runSamplePatientsCreatedUponFirstLoginTest} from "./sample-patients";
import {runAddSoapNoteTest, runDeleteSoapNoteTest, runEditSoapNoteTest} from "./soap-note-form";
import {
    runAddSurgicalOperationInstructionTest, runDeleteSurgicalOperationInstructionTest,
    runEditSurgicalOperationInstructionTest, runEstimateBloodLossFieldFieldValidationTest
} from "./surgical-operation-form";
import {runUserCreationAndFilteringTest} from "./users";
import {runAddVisitNoteTest, runDeleteVisitNoteTest, runEditVisitNoteTest} from "./visit-note-form";
import {runEditPatientVisitTest, runEndPatientVisitTest, runStartPatientVisitTest} from "./visits";
import {
    runAddWardAdmissionRequestTest, runCreateWardAdmissionRequestTest,
    runDeleteWardAdmissionRequestTest,
    runEditWardAdmissionRequestTest
} from "./ward-admission-form";

test('Patient summary to load all the apps', async ({page}) => {
    await runPatientSummaryTest(page);
});

test('Demo patients should be present and accessible through patient search', async ({page}) => {
    await runDemoPatientsTest(page);
});

test('Add discharge instructions', async ({page}) => {
    await runAddDischargeInstructionsTest(page);
});

test('Edit discharge instructions', async ({page}) => {
    await runEditDischargeInstructionsTest(page);
});

test('Delete discharge instructions', async ({page}) => {
    await runDeleteDischargeInstructionsTest(page);
});

test('Add discharge summary', async ({page}) => {
    await runAddDischargeSummaryTest(page);
});

test('Edit discharge summary', async ({page}) => {
    await runEditDischargeSummaryTest(page);
});

test('Delete discharge summary', async ({page}) => {
    await runDeleteDischargeSummaryTest(page);
});

test('Add a drug order', async ({page}) => {
    await runAddDrugOrderTest(page);
});

test('Modify a drug order', async ({page}) => {
    await runModifyDrugOrderTest(page);
});

test('Discontinue a drug order', async ({page}) => {
    await runDiscontinueDrugOrderTest(page);
});

test('Add a drug order with free text dosage', async ({page}) => {
    await runAddDrugOrderWithFreeTextDosageTest(page);
});

test('Edit patient details', async ({page}) => {
    await runEditPatientDetailsTest(page);
});

test('Render server in an iframe after login, with all core features available', async ({page}) => {
    await runRenderIframeTest(page);
});

test('Add an imaging order', async ({page}) => {
    await runAddImagingOrderTest(page);
});

test('Modify an imaging order', async ({page}) => {
    await runModifyImagingOrderTest(page);
});

test('Discontinue an imaging order', async ({page}) => {
    await runDiscontinueImagingOrderTest(page);
});

test('Add a lab test', async ({page}) => {
    await runAddLabOrderTest(page);
});

test('Modify a lab order', async ({page}) => {
    await runModifyLabOrderTest(page);
});

test('Discontinue a lab order', async ({page}) => {
    await runDiscontinueLabOrderTest(page);
});

test('Order basket should load all the orderables', async ({page}) => {
    await runOrderBasketLoadAllOrderablesTest(page);
});

test('Create a patient list', async ({page}) => {
    await runCreatePatientListTest(page);
});

test('Edit a patient list', async ({page}) => {
    await runEditPatientListTest(page);
});

test('Delete a patient list', async ({page}) => {
    await runDeletePatientListTest(page);
});

test('Manage patients in a list', async ({page}) => {
    await runManagePatientListTest(page);
});

test('Patient list created by one user should not be visible to another user', async ({page}) => {
    await runPatientListVisibilityCheckTest(page);
});

test('Search patient by given name', async ({page}) => {
    await runSearchPatientByGivenNameTest(page);
});

test('Search patient by full name', async ({page}) => {
    await runSearchPatientByFullNameTest(page);
});

test('Search patient by identifier', async ({page}) => {
    await runSearchPatientByIdentifierTest(page);
});

test('Search patient by postal code', async ({page}) => {
    await runSearchPatientByPostalCodeTest(page);
});

test('Search patient by age', async ({page}) => {
    await runSearchPatientByAgeTest(page);
});

test('Search patient by date of birth', async ({page}) => {
    await runSearchPatientByDateOfBirthTest(page);
});

test('Add procedure note', async ({page}) => {
    await runAddProcedureNoteTest(page);
});

test('Edit procedure note', async ({page}) => {
    await runEditProcedureNoteTest(page);
});

test('Delete procedure note', async ({page}) => {
    await runDeleteProcedureNoteTest(page);
});

test('Sample patients should be created upon the first user login', async ({page}) => {
    await runSamplePatientsCreatedUponFirstLoginTest(page);
});

test('Add soap note', async ({page}) => {
    await runAddSoapNoteTest(page);
});

test('Edit soap note', async ({page}) => {
    await runEditSoapNoteTest(page);
});

test('Delete soap note', async ({page}) => {
    await runDeleteSoapNoteTest(page);
});

test('Add surgical operation instructions', async ({page}) => {
    await runAddSurgicalOperationInstructionTest(page);
});

test('Edit surgical operation instructions', async ({page}) => {
    await runEditSurgicalOperationInstructionTest(page);
});

test('Delete surgical operation instructions', async ({page}) => {
    await runDeleteSurgicalOperationInstructionTest(page);
});

test('Estimated blood loss field should allow valid input', async ({page}) => {
    await runEstimateBloodLossFieldFieldValidationTest(page);
});

test('User creation and data filtering', async ({page}) => {
    await runUserCreationAndFilteringTest(page);
});

test('Add visit note', async ({page}) => {
    await runAddVisitNoteTest(page);
});

test('Edit visit note', async ({page}) => {
    await runEditVisitNoteTest(page);
});

test('Delete visit note', async ({page}) => {
    await runDeleteVisitNoteTest(page);
});

test('Start patient visit', async ({page}) => {
    await runStartPatientVisitTest(page);
});

test('Edit patient visit', async ({page}) => {
    await runEditPatientVisitTest(page);
});

test('End patient visit', async ({page}) => {
    await runEndPatientVisitTest(page);
});

test('Add ward admission request', async ({page}) => {
    await runAddWardAdmissionRequestTest(page);
});

test('Edit ward admission request', async ({page}) => {
    await runEditWardAdmissionRequestTest(page);
});

test('Delete ward admission request', async ({page}) => {
    await runDeleteWardAdmissionRequestTest(page);
});

test('Creating ward admission request should create admission request in the respective location', async ({page}) => {
    await runCreateWardAdmissionRequestTest(page);
});
