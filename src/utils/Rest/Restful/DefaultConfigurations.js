require("dotenv").config();
console.table(process.env);
export const DEFAULT_CONFIGURATIONS = {
    basePath: process.env.REACT_APP_SERVER,
    AccessToken: "<access token>",
    UserAgent: "<custom user-agent",
    Timeout: 500_000, // set timeout to 500,000 milliseconds
    middleware: [],
};
