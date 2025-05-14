import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://942e755a720cddc1d8908d4d67b1e2ad@o4509311615631360.ingest.us.sentry.io/4509311616614400",
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "system", // تقدر تختار 'light' أو 'dark'
    }),
  ],
});
