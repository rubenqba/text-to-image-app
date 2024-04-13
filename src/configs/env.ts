import { cleanEnv, Spec, str, ValidatorSpec } from "envalid";

// https://github.com/af/envalid

/**
 * This module is the single source of truth for application environment configuration.
 * When imported as a TypeScript module, it provides runtime access to validated environment variables.
 * When executed as a script, it may cover the following use cases:
 *     - validate current environment
 *     - load current environment beforehand (when CLI flag --force-load-env is used)
 *     - print empty environment configuration as .env-compatible string (when CLI flag --print-env is used)
 *     - print valid environment configuration as .env-compatible string (when CLI flag --print-env is used)
 * This module detects if it is executed in a client-side environment and excludes server-only variables, see:
 * https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
 */

const FORCE_LOAD_CLI_FLAG = "--force-load-env";
const PRINT_ENV_CLI_FLAG = "--print-env";

const printEnvCliFlagProvided = process.argv?.includes(PRINT_ENV_CLI_FLAG);
const forceLoadCliFlagProvided = process.argv?.includes(FORCE_LOAD_CLI_FLAG);
if (forceLoadCliFlagProvided) {
  console.info("Force-loading environment ...");
  const { loadEnvConfig } = require("@next/env");
  loadEnvConfig(process.cwd());
}

// ==========  environment definition and validation ==========

const isServer = typeof window === "undefined";

const envVars = {
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
  API_URL: process.env.API_URL,
};

type EnvKey = keyof typeof envVars;

const optionalVarOpts: Spec<string> = { default: undefined };
const serverVarOpts = isServer ? undefined : optionalVarOpts;

const envConfig: Record<EnvKey, ValidatorSpec<string>> = {
  KEYCLOAK_REALM: str(serverVarOpts),
  KEYCLOAK_CLIENT_ID: str(serverVarOpts),
  KEYCLOAK_CLIENT_SECRET: str(serverVarOpts),
  API_URL: str(serverVarOpts),
};

if (printEnvCliFlagProvided) {
  console.info("Printing empty .env configuration ...");
  const emptyEnvConfigString = Object.keys(envConfig)
    .map((key) => `${key}=`)
    .join("\n");
  console.info(`${emptyEnvConfigString}\n`);
}

const env = cleanEnv(envVars, envConfig);

if (printEnvCliFlagProvided && forceLoadCliFlagProvided) {
  console.info("Printing current valid .env configuration ...");
  const validEnvConfigString = Object.entries(env)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  console.info(`${validEnvConfigString}\n`);
}

export default env;
