export async function withTimeout(fn, ms, label = "Operazione") {
    return Promise.race([
        fn(),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label} superato timeout di ${ms}ms`)), ms)
        )
    ]);
}
