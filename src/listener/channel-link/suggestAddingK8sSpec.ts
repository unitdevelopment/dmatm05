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

import { buttonForCommand } from "@atomist/automation-client/spi/message/MessageClient";
import { ChannelLinkListener } from "@atomist/sdm";
import * as slack from "@atomist/slack-messages/SlackMessages";
import { AddK8sSpecCommandName } from "../../commands/editors/k8s/addK8sSpec";

/**
 * Present a button suggesting a Kubernetes spec is added by an editor
 * @param {PushListenerInvocation} inv
 * @return {Promise<any>}
 */
export const SuggestAddingK8sSpec: ChannelLinkListener = async inv => {
    try {
        const f = await inv.project.findFile("pom.xml");
        const content = await f.getContent();
        const isSpringBoot = content.includes("spring-boot");

        if (isSpringBoot) {
            const attachment: slack.Attachment = {
                    text: "Add a Kubernetes spec to your new repo?",
                    fallback: "add Kubernetes spec",
                    actions: [buttonForCommand({text: "Add Kubernetes spec"},
                        AddK8sSpecCommandName,
                        {"targets.owner": inv.id.owner, "targets.repo": inv.id.repo},
                    ),
                    ],
                }
            ;
            const message: slack.SlackMessage = {
                attachments: [attachment],
            };
            return inv.addressChannels(message);
        }
    } catch {
        // It's not a Maven project, we don't know how to deploy it
    }
};
