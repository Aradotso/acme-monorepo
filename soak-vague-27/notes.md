# What Makes a Good Commit Message

A good commit message is concise, specific, and useful to someone reviewing
history later. Use a short imperative subject that says what the commit does
(for example, “Add RSS discovery link”), keep it focused on one logical change,
and add a body only when context, rationale, trade-offs, or noteworthy
limitations are not clear from the subject and diff. Keep the subject brief
enough to scan, and wrap body paragraphs consistently.

Describe the result rather than the debugging journey; avoid vague subjects
such as “fix stuff,” implementation trivia, and issue numbers without meaning.
Do not claim behavior the commit does not deliver. If a change is breaking,
security-sensitive, dependent on ordering, or requires migration or follow-up,
say so explicitly. Mention tests or validation when they help reviewers
understand confidence, and use trailers for structured metadata such as issue
references, reviewers, or co-authors. Preserve the repository’s established
conventions, and ensure the message remains accurate if the diff is split,
amended, or reverted.
