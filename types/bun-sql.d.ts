declare global {
    // Minimal typing we need for Bun.SQL
    // (We keep it small to avoid TS conflicts with Next)
    var Bun: {
        SQL: new (url: string) => (strings: TemplateStringsArray, ...values: any[]) => Promise<any[]>;
    };
}

export { };