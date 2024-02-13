import { throwErr } from "./error";

export const fromEnv = (env: string) => process.env[env] ||  throwErr(`Environment variable ${env} not found`);