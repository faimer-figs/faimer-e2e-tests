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
    },
    {
        engine: 'playwright',
        testFunction: runAddDischargeSummaryTest
    },
    {
        engine: 'playwright',
        testFunction: runEditDischargeSummaryTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteDischargeSummaryTest
    },
    {
        engine: 'playwright',
        testFunction: runAddDrugOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runModifyDrugOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runDiscontinueDrugOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runAddDrugOrderWithFreeTextDosageTest
    },
    {
        engine: 'playwright',
        testFunction: runEditPatientDetailsTest
    },
    {
        engine: 'playwright',
        testFunction: runRenderIframeTest
    },
    {
        engine: 'playwright',
        testFunction: runAddImagingOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runModifyImagingOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runDiscontinueImagingOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runAddLabOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runModifyLabOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runDiscontinueLabOrderTest
    },
    {
        engine: 'playwright',
        testFunction: runOrderBasketLoadAllOrderablesTest
    },
    {
        engine: 'playwright',
        testFunction: runCreatePatientListTest
    },
    {
        engine: 'playwright',
        testFunction: runEditPatientListTest
    },
    {
        engine: 'playwright',
        testFunction: runDeletePatientListTest
    },
    {
        engine: 'playwright',
        testFunction: runManagePatientListTest
    },
    {
        engine: 'playwright',
        testFunction: runPatientListVisibilityCheckTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByGivenNameTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByFullNameTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByIdentifierTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByPostalCodeTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByAgeTest
    },
    {
        engine: 'playwright',
        testFunction: runSearchPatientByDateOfBirthTest
    },
    {
        engine: 'playwright',
        testFunction: runAddProcedureNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runEditProcedureNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteProcedureNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runSamplePatientsCreatedUponFirstLoginTest
    },
    {
        engine: 'playwright',
        testFunction: runAddSoapNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runEditSoapNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteSoapNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runAddSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        testFunction: runEditSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteSurgicalOperationInstructionTest
    },
    {
        engine: 'playwright',
        testFunction: runEstimateBloodLossFieldFieldValidationTest
    },
    {
        engine: 'playwright',
        testFunction: runUserCreationAndFilteringTest
    },
    {
        engine: 'playwright',
        testFunction: runAddVisitNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runEditVisitNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteVisitNoteTest
    },
    {
        engine: 'playwright',
        testFunction: runStartPatientVisitTest
    },
    {
        engine: 'playwright',
        testFunction: runEditPatientVisitTest
    },
    {
        engine: 'playwright',
        testFunction: runEndPatientVisitTest
    },
    {
        engine: 'playwright',
        testFunction: runAddWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        testFunction: runEditWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        testFunction: runDeleteWardAdmissionRequestTest
    },
    {
        engine: 'playwright',
        testFunction: runCreateWardAdmissionRequestTest
    }
];

