const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function getRandomId(): string {
    return <string>Array.from({length: 20}).reduce(
        (acc: string) => acc + CHARS[~~(Math.random() * CHARS.length)],
        ''
    );
}

export function simulateRandomResourceRegistration(): Promise<boolean> {
    return new Promise((resolve) => {
        const delay = Math.random() * (1000 - 300) + 300;
        setTimeout(() => {
            const isSuccess = Math.random() < 0.8;
            resolve(isSuccess);
        }, delay);
    });
}
