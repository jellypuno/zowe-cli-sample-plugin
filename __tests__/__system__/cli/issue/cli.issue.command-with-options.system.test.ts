/*
* This program and the accompanying materials are made available and may be used, at your option, under either:
* * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
* * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
*
* SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import {runCliScript} from "../../../__src__/TestUtils";
import {ITestEnvironment} from "../../../__src__/environment/doc/response/ITestEnvironment";
import {TestEnvironment} from "../../../__src__/environment/TestEnvironment";

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment;

describe("zowe-cli-sample issue command-with-options", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            installPlugin: true,
            testName: "command_with_options"
        });
    });
    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should issue a response with the number and string inputted", async () => {
        const response = await runCliScript(__dirname + "/__scripts__/issue_command_with_options.sh", TEST_ENVIRONMENT,
            [1, "\"teststring!\""]);

        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });
});
