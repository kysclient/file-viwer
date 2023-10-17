
export function convertToEmbedURL(url: string): string {
    const watchURLPattern = /^https:\/\/www\.youtube\.com\/watch\?v=/i;
    if (watchURLPattern.test(url)) {
        return url.replace(watchURLPattern, 'https://www.youtube.com/embed/');
    }
    return url;
}
