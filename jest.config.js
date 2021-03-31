module.exports = {
    bail: true,
    preset: 'ts-jest',
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/__tests__/**",
        "!**/__fixtures__/**"
    ]
};
