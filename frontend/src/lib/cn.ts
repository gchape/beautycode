import { clsx, type ClassValue } from "clsx";

// No tailwind-merge: we don't allow callers to override internal classes
// with conflicting utility values, so plain conditional joining is enough.
// If that ever changes, reach for `tailwind-merge` again rather than
// hand-rolling conflict resolution.
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
