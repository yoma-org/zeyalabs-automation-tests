# Reporting

Report:

- canonical case IDs implemented, tagged `@review` (failures listed with their open question), left as `fixme`, or skipped as `Manual`;
- tests passed, failed, flaky, skipped, blocked;
- files changed;
- trace and screenshot paths;
- root-cause classification (with GOTCHAS / source-issues reference when relevant);
- remaining automation gaps;
- manual-only scenarios;
- validation commands executed, including the `check-traceability.mjs` summary line.

Do not count a generated spec as successful automation until it executes successfully.
