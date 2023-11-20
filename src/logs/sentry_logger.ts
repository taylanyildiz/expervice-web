import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://be632f8d5452bda34ed6d521aa9610f7@o4504439033561088.ingest.sentry.io/4506258311938048",
    integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
    ],
    enabled: import.meta.env.PROD,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});