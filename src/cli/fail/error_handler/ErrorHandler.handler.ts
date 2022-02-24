/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html, or the Apache License, Version 2.0
* which is available at https://www.apache.org/licenses/LICENSE-2.0.
*
* SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ICommandHandler, IHandlerParameters, ImperativeError } from "@zowe/imperative";

export default class ErrorHandlerHandler implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
        const msg: string = `"zowe zowe-cli-sample ${params.arguments._.join(" ")}" command failed!`;
        throw new ImperativeError({msg});
    }
}
