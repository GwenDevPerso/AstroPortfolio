/** `2026-03-01` → `2026.03` */
export function formatMonth(isoDate: string): string {
    return isoDate.slice(0, 7).replace('-', '.');
}

/** `2026.03 → 2026.06`, or `2025.06 → in progress` when there is no end date. */
export function formatPeriod(start: string, end: string | null, inProgress: string): string {
    return `${formatMonth(start)} → ${end ? formatMonth(end) : inProgress}`;
}

/** Zero-padded index used in lists: `1` → `01`. */
export function pad(n: number): string {
    return String(n).padStart(2, '0');
}
