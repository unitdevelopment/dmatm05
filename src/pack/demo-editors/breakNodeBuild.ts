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

import { HandlerContext } from "@atomist/automation-client";
import { commitToMaster } from "@atomist/automation-client/operations/edit/editModes";
import { Project } from "@atomist/automation-client/project/Project";
import { EditorRegistration } from "@atomist/sdm";

export const BadTypeScriptFileName = "src/Bad.ts";
export const BadJavaScriptFileName = "src/Bad.js";

export const BreakNodeBuildEditor: EditorRegistration = {
    createEditor: () => breakBuild,
    name: "breakNodeBuild",
    editMode: commitToMaster(`You asked me to break the build!`),
};

async function breakBuild(p: Project, ctx: HandlerContext) {
    await p.addFile(BadJavaScriptFileName, "this is not JavaScript");
    return p.addFile(BadTypeScriptFileName, "this is not TypeScript");
}

export const UnbreakNodeBuildEditor: EditorRegistration = {
    createEditor: () => unbreakNodeBuild,
    name: "unbreakNodeBuild",
    editMode: commitToMaster(`Trying to unbreak the build!`),
};

async function unbreakNodeBuild(p: Project, ctx: HandlerContext) {
    await p.deleteFile(BadTypeScriptFileName);
    return p;
}
