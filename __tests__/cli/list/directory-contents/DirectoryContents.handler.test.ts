/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import {CheckStatus} from "@zowe/zosmf-for-zowe-sdk";
import {Files} from "../../../../src/api/Files";
import {IHandlerParameters} from "@zowe/imperative";
import { DirectoryContentsDefinition } from "../../../../src/cli/list/directory-contents/DirectoryContents.definition";
import * as DirectoryContentsHandler from "../../../../src/cli/list/directory-contents/DirectoryContents.handler";

jest.mock("../../../../src/api/Files");

process.env.FORCE_COLOR = "0";

const DEFAULT_PARAMETERS: IHandlerParameters = {
    arguments: {
        $0: "bright",
        _: ["zowe-cli-sample", "list", "directory-contents"],
    },
    positionals: ["zowe-cli-sample", "list", "directory-contents"],
    profiles: {
        get: (type: string) => {
            return {};
        }
    } as any,
    response: {
        data: {
            setMessage: jest.fn((setMsgArgs): string => {
                expect("" + setMsgArgs).toMatchSnapshot();
                return "";
            }),
            setObj: jest.fn((setObjArgs) => {
                expect(setObjArgs).toMatchSnapshot();
            }),
            setExitCode: jest.fn()
        },
        console: {
            log: jest.fn((logs) => {
                expect("" + logs).toMatchSnapshot();
                return "";
            }),
            error: jest.fn((errors) => {
                expect("" + errors).toMatchSnapshot();
                return "";
            }),
            errorHeader: jest.fn(() => undefined),
            prompt: jest.fn(() => undefined)
        },
        progress: {
            startBar: jest.fn((parms) => undefined),
            endBar: jest.fn(() => undefined)
        },
        format: {
            output: jest.fn((parms) => {
                expect(parms).toMatchSnapshot();
            })
        }
    },
    definition: DirectoryContentsDefinition,
    fullDefinition: DirectoryContentsDefinition,
};

describe("directory-contents Handler", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("should read a mocked directory", async () => {
        const fakeDir: string = "fake/directory";
        // Mock the files api call
        Files.listDirectoryContents = jest.fn((dir) => {
            return [{
                fake: "file",
                moreFake: "directory"
            }];
        });
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            return {zosmf_hostname: "dummy"};
        });
        const handler = new DirectoryContentsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments = {
            ...params.arguments,
            directory: fakeDir,
            host: "fake",
            port: 443,
            user: "admin",
            password: "123456"
        };

        // The handler should succeed
        await handler.process(params);

        expect(Files.listDirectoryContents).toHaveBeenCalledWith(fakeDir);
    });
});
