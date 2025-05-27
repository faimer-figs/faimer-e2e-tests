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
import {O3_URL} from "../utils/configs/globalSetup";

export const config = {
    target: `${O3_URL}`,
    engines: {
        playwright: {
            launchOptions: {
                headless: true,
            },
            aggregateByName: true,
            extendedMetrics: true
        }
    },
};

export const scenarios = [
    {
        engine: 'playwright',
        name: 'Patient summary to load all the apps',
        testFunction: runPatientSummaryTest
    },
    {
        engine: 'playwright',
        name: 'Demo patients should be present and accessible through patient search',
        testFunction: runDemoPatientsTest
    },
    {
        engine: 'playwright',
        name: 'Add discharge instructions',
        testFunction: runAddDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Edit discharge instructions',
        testFunction: runEditDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Delete discharge instructions',
        testFunction: runDeleteDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Add discharge instructions',
        testFunction: runAddDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Edit discharge instructions',
        testFunction: runEditDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Delete discharge instructions',
        testFunction: runDeleteDischargeInstructionsTest
    },
    {
        engine: 'playwright',
        name: 'Add discharge summary',
        testFunction: runAddDischargeSummaryTest
    },
    {
        engine: 'playwright',
        name: 'Edit discharge summary',
        testFunction: runEditDischargeSummaryTest
    },
    {
        engine: 'playwright',
        name: 'Delete discharge summary',
        testFunction: runDeleteDischargeSummaryTest
    },
    {
        engine: 'playwright',
        name: 'Add a drug order',
        testFunction: runAddDrugOrderTest
    },
    {
        engine: 'playwright',
        name: 'Modify a drug order',
        testFunction: runModifyDrugOrderTest
    },
    {
        engine: 'playwright',
        name: 'Discontinue a drug order',
        testFunction: runDiscontinueDrugOrderTest
    },
    {
        engine: 'playwright',
        name: 'Add a drug order with free text dosage',
        testFunction: runAddDrugOrderWithFreeTextDosageTest
    },
    {
        engine: 'playwright',
        name: 'Edit patient details',
        testFunction: runEditPatientDetailsTest
    },
    {
        engine: 'playwright',
        name: 'Render server in an iframe after login, with all core features available',
        testFunction: runRenderIframeTest
    },
    {
        engine: 'playwright',
        name: 'Add an imaging order',
        testFunction: runAddImagingOrderTest
    },
    {
        engine: 'playwright',
        name: 'Modify an imaging order',
        testFunction: runModifyImagingOrderTest
    },
    {
        engine: 'playwright',
        name: 'Discontinue an imaging order',
        testFunction: runDiscontinueImagingOrderTest
    },
    {
        engine: 'playwright',
        name: 'Add a lab test',
        testFunction: runAddLabOrderTest
    },
    {
        engine: 'playwright',
        name: 'Modify a lab order',
        testFunction: runModifyLabOrderTest
    },
    {
        engine: 'playwright',
        name: 'Discontinue a lab order',
        testFunction: runDiscontinueLabOrderTest
    },
    {
        engine: 'playwright',
        name: 'Order basket should load all the orderables',
        testFunction: runOrderBasketLoadAllOrderablesTest
    },
    {
        engine: 'playwright',
        name: 'Create a patient list',
        testFunction: runCreatePatientListTest
    },
    {
        engine: 'playwright',
        name: 'Edit a patient list',
        testFunction: runEditPatientListTest
    },
    {
        engine: 'playwright',
        name: 'Delete a patient list',
        testFunction: runDeletePatientListTest
    },
    {
        engine: 'playwright',
        name: 'Manage patients in a list',
        testFunction: runManagePatientListTest
    },
    {
        engine: 'playwright',
        name: 'Patient list created by one user should not be visible to another user',
        testFunction: runPatientListVisibilityCheckTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by given name',
        testFunction: runSearchPatientByGivenNameTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by full name',
        testFunction: runSearchPatientByFullNameTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by identifier',
        testFunction: runSearchPatientByIdentifierTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by postal code',
        testFunction: runSearchPatientByPostalCodeTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by age',
        testFunction: runSearchPatientByAgeTest
    },
    {
        engine: 'playwright',
        name: 'Search patient by date of birth',
        testFunction: runSearchPatientByDateOfBirthTest
    },
    {
        engine: 'playwright',
        name: 'Add procedure note',
        testFunction: runAddProcedureNoteTest
    },
    {
        engine: 'playwright',
        name: 'Edit procedure note',
        testFunction: runEditProcedureNoteTest
    },
    {
        engine: 'playwright',
        name: 'Delete procedure note',
        testFunction: runDeleteProcedureNoteTest
    },
    {
        engine: 'playwright',
        name: 'Sample patients should be created upon the first user login',
        testFunction: runSamplePatientsCreatedUponFirstLoginTest
    },
    {
        engine: 'playwright',
        name: 'Add soap note',
        testFunction: runAddSoapNoteTest
    },
    {
        engine: 'playwright',
        name: 'Edit soap note',
        testFunction: runEditSoapNoteTest
    },
    {
        engine: 'playwright',
        name: 'Delete soap note',
        testFunction: runDeleteSoapNoteTest
    },
    {
        engine: 'playwright',
        name: 'Add surgical operation instructions',
        testFunction: runAddSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        name: 'Edit surgical operation instructions',
        testFunction: runEditSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        name: 'Delete surgical operation instructions',
        testFunction: runDeleteSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        name: 'Estimated blood loss field should allow valid input',
        testFunction: runEstimateBloodLossFieldFieldValidationTest
    },
    {
        engine: 'playwright',
        name: 'User creation and data filtering',
        testFunction: runUserCreationAndFilteringTest
    },
    {
        engine: 'playwright',
        name: 'Add visit note',
        testFunction: runAddVisitNoteTest
    },
    {
        engine: 'playwright',
        name: 'Edit visit note',
        testFunction: runEditVisitNoteTest
    },
    {
        engine: 'playwright',
        name: 'Delete visit note',
        testFunction: runDeleteVisitNoteTest
    },
    {
        engine: 'playwright',
        name: 'Start patient visit',
        testFunction: runStartPatientVisitTest
    },
    {
        engine: 'playwright',
        name: 'Edit patient visit',
        testFunction: runEditPatientVisitTest
    },
    {
        engine: 'playwright',
        name: 'End patient visit',
        testFunction: runEndPatientVisitTest
    },
    {
        engine: 'playwright',
        name: 'Add ward admission request',
        testFunction: runAddWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        name: 'Edit ward admission request',
        testFunction: runEditWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        name: 'Delete ward admission request',
        testFunction: runDeleteWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        name: 'Creating ward admission request should create admission request in the respective location',
        testFunction: runCreateWardAdmissionRequestTest
    }
];

