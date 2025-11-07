export default async function fetchData<T>(url: string, signal: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });
    if (response.status === 404) {
        throw new Error(`Your Pokemon is in another ball. Try again.`);
    }

    if (!response.ok) {
        throw new Error(`Fetch failed:${response.status} \n Try again.`);
    }
    const data: T = await response.json();
    return data;
}
