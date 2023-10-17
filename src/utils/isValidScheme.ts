export function isValidScheme(url: string): boolean {
    if (url.includes('blob')) {
        return true
    }
    const pattern = /^(https:\/\/|http:\/\/)/i;
    return pattern.test(url);
}
