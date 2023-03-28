/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandHandler } from "@zowe/imperative";
import * as zftp from "@zowe/zos-ftp-for-zowe-cli"
import { zdcHandlerParams } from "../../../zdcHandlerParams"

export default class zdcDefinitionHandler implements ICommandHandler {
    public async process(params: zdcHandlerParams): Promise<void> {
        const options = {
            owner: params.arguments.owner,
            status: params.arguments.status
        };
        const filteredJobs = await zftp.JobUtils.listJobs(params.connection, params.jobname, options);
        params.response.data.setObj(filteredJobs);
        params.response.data.setMessage("Successfully listed %d matching jobs", filteredJobs.length);
        params.response.format.output({
            output: filteredJobs,
            format: "table",
            fields: ["jobid", "jobname", "owner", "status"]
        });
    }
}
