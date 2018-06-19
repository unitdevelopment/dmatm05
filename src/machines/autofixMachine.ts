/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    AutofixGoal,
    Goals,
    onAnyPush,
    SoftwareDeliveryMachine,
} from "@atomist/sdm";
import { SoftwareDeliveryMachineConfiguration } from "@atomist/sdm/api/machine/SoftwareDeliveryMachineOptions";
import { createSoftwareDeliveryMachine } from "@atomist/sdm/machine/machineFactory";
import {
    AddAtomistJavaHeader,
    AddAtomistTypeScriptHeader,
} from "../autofix/addAtomistHeader";
import { AddLicenseFile } from "../autofix/addLicenseFile";
import { DemoEditors } from "../pack/demo-editors/demoEditors";

/**
 * Assemble a machine that performs only autofixes.
 * @return {SoftwareDeliveryMachine}
 */
export function autofixMachine(
    configuration: SoftwareDeliveryMachineConfiguration): SoftwareDeliveryMachine {
    const sdm = createSoftwareDeliveryMachine({name: "Autofix machine", configuration},
        onAnyPush
            .setGoals(new Goals("Autofix", AutofixGoal)));
    sdm
        .addAutofixes(
            AddAtomistJavaHeader,
            AddAtomistTypeScriptHeader,
            AddLicenseFile,
        )
        .addExtensionPacks(
            DemoEditors,
        );

    return sdm;
}
