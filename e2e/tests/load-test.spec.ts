import {Page} from 'playwright';
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


type TestFunction = (page: Page) => Promise<void>;

function withTimeouts(
    testFunction: TestFunction): TestFunction {
    return async (page: Page) => {
        page.setDefaultTimeout(60000);
        page.setDefaultNavigationTimeout(60000);

        await testFunction(page);
    };
}

export const config = {
    target: 'https://oz-faimer-dev.mekomsolutions.net',
    engines: {
        playwright: {
            timeout: 60000,
            launchOptions: {
                headless: true,
            },
            contextOptions: {
                ignoreHTTPSErrors: true
            }
        }
    }
};

export const scenarios = [
    {
        engine: 'playwright',
        name: 'Patient summary to load all the apps',
        testFunction: withTimeouts(runPatientSummaryTest)
    },
    {
        engine: 'playwright',
        name: 'Demo patients should be present and accessible through patient search',
        testFunction: withTimeouts(runDemoPatientsTest)
    },
    {
        engine: 'playwright',
        name: 'Add discharge instructions',
        testFunction: withTimeouts(runAddDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Edit discharge instructions',
        testFunction: withTimeouts(runEditDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Delete discharge instructions',
        testFunction: withTimeouts(runDeleteDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Add discharge instructions',
        testFunction: withTimeouts(runAddDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Edit discharge instructions',
        testFunction: withTimeouts(runEditDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Delete discharge instructions',
        testFunction: withTimeouts(runDeleteDischargeInstructionsTest)
    },
    {
        engine: 'playwright',
        name: 'Add discharge summary',
        testFunction: withTimeouts(runAddDischargeSummaryTest)
    },
    {
        engine: 'playwright',
        name: 'Edit discharge summary',
        testFunction: withTimeouts(runEditDischargeSummaryTest)
    },
    {
        engine: 'playwright',
        name: 'Delete discharge summary',
        testFunction: withTimeouts(runDeleteDischargeSummaryTest)
    },
    {
        engine: 'playwright',
        name: 'Add a drug order',
        testFunction: withTimeouts(runAddDrugOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Modify a drug order',
        testFunction: withTimeouts(runModifyDrugOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Discontinue a drug order',
        testFunction: withTimeouts(runDiscontinueDrugOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Add a drug order with free text dosage',
        testFunction: withTimeouts(runAddDrugOrderWithFreeTextDosageTest)
    },
    {
        engine: 'playwright',
        name: 'Edit patient details',
        testFunction: withTimeouts(runEditPatientDetailsTest)
    },
    {
        engine: 'playwright',
        name: 'Render server in an iframe after login, with all core features available',
        testFunction: withTimeouts(runRenderIframeTest)
    },
    {
        engine: 'playwright',
        name: 'Add an imaging order',
        testFunction: withTimeouts(runAddImagingOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Modify an imaging order',
        testFunction: withTimeouts(runModifyImagingOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Discontinue an imaging order',
        testFunction: withTimeouts(runDiscontinueImagingOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Add a lab test',
        testFunction: withTimeouts(runAddLabOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Modify a lab order',
        testFunction: withTimeouts(runModifyLabOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Discontinue a lab order',
        testFunction: withTimeouts(runDiscontinueLabOrderTest)
    },
    {
        engine: 'playwright',
        name: 'Order basket should load all the orderables',
        testFunction: withTimeouts(runOrderBasketLoadAllOrderablesTest)
    },
    {
        engine: 'playwright',
        name: 'Create a patient list',
        testFunction: withTimeouts(runCreatePatientListTest)
    },
    {
        engine: 'playwright',
        name: 'Edit a patient list',
        testFunction: withTimeouts(runEditPatientListTest)
    },
    {
        engine: 'playwright',
        name: 'Delete a patient list',
        testFunction: withTimeouts(runDeletePatientListTest)
    },
    {
        engine: 'playwright',
        name: 'Manage patients in a list',
        testFunction: withTimeouts(runManagePatientListTest)
    },
    {
        engine: 'playwright',
        name: 'Patient list created by one user should not be visible to another user',
        testFunction: withTimeouts(runPatientListVisibilityCheckTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by given name',
        testFunction: withTimeouts(runSearchPatientByGivenNameTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by full name',
        testFunction: withTimeouts(runSearchPatientByFullNameTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by identifier',
        testFunction: withTimeouts(runSearchPatientByIdentifierTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by postal code',
        testFunction: withTimeouts(runSearchPatientByPostalCodeTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by age',
        testFunction: withTimeouts(runSearchPatientByAgeTest)
    },
    {
        engine: 'playwright',
        name: 'Search patient by date of birth',
        testFunction: withTimeouts(runSearchPatientByDateOfBirthTest)
    },
    {
        engine: 'playwright',
        name: 'Add procedure note',
        testFunction: withTimeouts(runAddProcedureNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Edit procedure note',
        testFunction: withTimeouts(runEditProcedureNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Delete procedure note',
        testFunction: withTimeouts(runDeleteProcedureNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Sample patients should be created upon the first user login',
        testFunction: withTimeouts(runSamplePatientsCreatedUponFirstLoginTest)
    },
    {
        engine: 'playwright',
        name: 'Add soap note',
        testFunction: withTimeouts(runAddSoapNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Edit soap note',
        testFunction: withTimeouts(runEditSoapNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Delete soap note',
        testFunction: withTimeouts(runDeleteSoapNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Add surgical operation instructions',
        testFunction: withTimeouts(runAddSurgicalOperationInstructionTest)
    },
    {
        engine: 'playwright',
        name: 'Edit surgical operation instructions',
        testFunction: withTimeouts(runEditSurgicalOperationInstructionTest)
    },
    {
        engine: 'playwright',
        name: 'Delete surgical operation instructions',
        testFunction: withTimeouts(runDeleteSurgicalOperationInstructionTest)
    },
    {
        engine: 'playwright',
        name: 'Estimated blood loss field should allow valid input',
        testFunction: withTimeouts(runEstimateBloodLossFieldFieldValidationTest)
    },
    {
        engine: 'playwright',
        name: 'User creation and data filtering',
        testFunction: withTimeouts(runUserCreationAndFilteringTest)
    },
    {
        engine: 'playwright',
        name: 'Add visit note',
        testFunction: withTimeouts(runAddVisitNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Edit visit note',
        testFunction: withTimeouts(runEditVisitNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Delete visit note',
        testFunction: withTimeouts(runDeleteVisitNoteTest)
    },
    {
        engine: 'playwright',
        name: 'Start patient visit',
        testFunction: withTimeouts(runStartPatientVisitTest)
    },
    {
        engine: 'playwright',
        name: 'Edit patient visit',
        testFunction: withTimeouts(runEditPatientVisitTest)
    },
    {
        engine: 'playwright',
        name: 'End patient visit',
        testFunction: withTimeouts(runEndPatientVisitTest)
    },
    {
        engine: 'playwright',
        name: 'Add ward admission request',
        testFunction: withTimeouts(runAddWardAdmissionRequestTest)
    },
    {
        engine: 'playwright',
        name: 'Edit ward admission request',
        testFunction: withTimeouts(runEditWardAdmissionRequestTest)
    },
    {
        engine: 'playwright',
        name: 'Delete ward admission request',
        testFunction: withTimeouts(runDeleteWardAdmissionRequestTest)
    },
    {
        engine: 'playwright',
        name: 'Creating ward admission request should create admission request in the respective location',
        testFunction: withTimeouts(runCreateWardAdmissionRequestTest)
    }
];

