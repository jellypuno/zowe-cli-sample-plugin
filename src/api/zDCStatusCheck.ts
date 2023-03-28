/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import * as imperative from "@zowe/imperative";
import * as zftp from "@zowe/zos-ftp-for-zowe-cli";

export interface ConnectionType {
    close(): void;
}

/**
 * Class of utility file APIs for usage within the CLI and programmatically from node scripts.
 * @export
 * @class ListFiles
 */
export class StatusCheck {
    /**
     * Returns a list of attribute objects for the the contents of a directory.
     * @static
     * @param {string} dir - The directory for which to list the contents.
     * @throws ImperativeError
     * @memberof ListFiles
     */
    public static async listJobs(connection: any, prefix: string, option?: zftp.IListJobOption): Promise<zftp.IJob[]> {
        const accessorOption: any = {
            jobName: prefix || "*",
        };
        let debugMessage = `Listing jobs that match prefix ${prefix}`;
        if (option && option.owner) {
            accessorOption.owner = option.owner;
            debugMessage += ` and are owned by ${accessorOption.owner}`;
        }
        if(option && option.status) {
            accessorOption.status = option.status;
            debugMessage += ` and status is ${accessorOption.status}`;
        }
        this.log.debug(debugMessage);

        const jobs = await connection.listJobs(accessorOption);
        this.log.debug("List returned %d jobs", jobs.length);
        const filteredJobs = this.parseJobDetails(jobs);
        return filteredJobs;
    }

    public static parseJobDetails(jobs: string[]): zftp.IJob[] {
        if (jobs.length > 1) {
            jobs = jobs.slice(1);
        }
        return jobs.map((job: string) => {
            // object looks like:
            // JOBNAME, JOBID, OWNER, STATUS, CLASS
            // turn the object into a similar format to that returned by
            // z/osmf so that users who use the list ds command in main
            // zowe can use the same filtering options
            const fields = job.split(/\s+/g);

            const jobNameIndex = 0;
            const jobIdIndex = 1;
            const ownerIndex = 2;
            const statusIndex = 3;
            const classIndex = 4;
            return {
                jobname: fields[jobNameIndex],
                jobid: fields[jobIdIndex],
                owner: fields[ownerIndex],
                status: fields[statusIndex],
                class: fields[classIndex],
                originalFtpResult: job
            };
        });
    }

    private static get log(): imperative.Logger {
        return imperative.Logger.getAppLogger();
    }
}