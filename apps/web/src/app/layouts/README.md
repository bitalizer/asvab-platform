# src/app/layouts/

This folder holds **shared layout helper components** that get composed into
`layout.tsx` files at route-group boundaries — e.g., a `MarketingShell`,
`DashboardChrome`, or `WizardScaffold` that several route-group layouts use.

**Note on Next.js conventions:** The actual `layout.tsx` files MUST live at
their file-convention paths (`app/layout.tsx`, `app/(auth)/layout.tsx`, etc.)
or Next.js will not register them. Do not move them here. This folder is for
the reusable building blocks those layout files import.
