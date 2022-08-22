// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare const process: {
  env: {
      NG_APP_VERSION:string,
      NG_APP_COMMIT:string,
      NG_APP_ENABLE_SENTRY:string,
      NG_APP_DB:string,
      NG_APP_HOST:string,
      NG_APP_PORT:string,
      NG_APP_USERNAME:string,
      NG_APP_PASSWORD:string,
  };
};

export const environment = {
  production: false,
  database: process.env["NG_APP_DB"],
  host: process.env["NG_APP_HOST"],
  port: process.env["NG_APP_PORT"],
  username: process.env["NG_APP_USERNAME"],
  password: process.env["NG_APP_PASSWORD"],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
