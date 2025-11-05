import type { JSX } from "react";

export function mapToList<T>(
    array: T[] | undefined,
    renderFn: (item: T, index: number | string) => JSX.Element
) {
    return array?.map((item, index) => renderFn(item, index));
}
