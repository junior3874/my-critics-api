export default {
  coverageProvider: "v8",
  roots: ["./src"],

  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",

  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
