# Writing a good commit message

A good commit message is clear, specific, and easy to scan. Keep the subject brief and imperative, say what changed and where, and avoid vague wording such as “fix stuff.” Use the body when the reason, relevant context, trade-offs, or user impact is not obvious from the subject; wrap it for readability and leave implementation trivia out unless it helps a future maintainer.

Call out breaking changes explicitly in the body (and, where the project uses them, with a `BREAKING CHANGE:` footer), including what breaks and how to migrate. If the change reverts an earlier commit, say so plainly, identify the reverted commit or behavior, and explain why; do not disguise a revert as an unrelated fix. Keep the message accurate when a change spans multiple concerns, mention important limitations or follow-up work, and use issue or release references only when they add useful traceability.
