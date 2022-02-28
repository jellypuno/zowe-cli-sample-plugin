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

import { ITestPropertiesSchema } from "../ITestPropertiesSchema";

/**
 * The test environment for your test.
 * @export
 * @interface ITestEnvironment
 */
export interface ITestEnvironment {
    /**
     * The working directory for your test environment. It is a unique (uuid) area where your tests can create
     * their home folders (for imperative, etc.) and you can use the area as scratch for any files, etc. that
     * must be created for your test.
     */
    workingDir: string;

    /**
     * The system test properties configured and loaded as part of the test lifecyle. This field may be null
     * in the case that no system test properties were configured or could be loaded.
     *
     */
    systemTestProperties: ITestPropertiesSchema;

    /**
     * Set of environmental variables (such as profile/logging home directory)
     * that can be used when executing Zowe CLI commands
     */
    env: { [key: string]: string };

    /**
     * a map of profileType to profile names created when you specify
     * tempProfileTypes on your ISetupEnvironmentParms object
     * empty if you did not specify any profile types
     */
    tempProfiles?: { [profileType: string]: string[] };

    /**
     * Was the plugin installed in the working directory
     */
    pluginInstalled?: boolean;
}
