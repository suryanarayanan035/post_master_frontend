// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// https://ddecb2b6e24f04df018308c3ed104e2d@o4508366075396096.ingest.us.sentry.io/4508366075658240

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
