# What makes a good commit message

A good commit message is clear, specific, and easy to scan. Use a concise subject in the imperative mood (for example, “Add cache headers”), keep it focused on one logical change, and explain the motivation, important context, or observable effect in the body when the subject is not enough. Mention relevant constraints, follow-up work, or testing details, but do not merely repeat the diff.

Call out breaking changes explicitly, including what consumers must do; describe generated or vendored changes and their source when they are intentional; and make reverts identify the original commit and why it is being undone. Merge commits should explain the integration or conflict-resolution context when that is not obvious from the branch history. Avoid vague subjects, issue-only messages, misleading claims, and sensitive data: the message should remain useful months later to someone who did not author the change.
