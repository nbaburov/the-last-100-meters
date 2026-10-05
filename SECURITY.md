# Security

## Status

The last 100 meters is an archived university project. It is not deployed anywhere and receives no feature work. Spring Boot is pinned at 3.3.13, the final patch of the 3.3 line, which is out of upstream support.

`npm audit` still reports advisories in the frontend. They come from `quagga`, the barcode library, which is no longer maintained, and from React Router 6. Each remaining fix needs a breaking upgrade that is out of scope for an archive. The non-breaking fixes have been applied.

The admin sign-in runs in the browser only and the API has no authentication. Treat the stack as a local demo. Do not expose it to the internet.

## Secrets

No credentials are committed. The database passwords are read from `.env`, and `.env.example` documents them. The demo admin credentials in the README are public on purpose.

## Reporting a vulnerability

Please report problems in the code privately through [GitHub's private vulnerability reporting](https://github.com/nbaburov/the-last-100-meters/security/advisories/new) rather than in public. Expect an acknowledgement within a week. Reports that only restate the status above will be closed with a pointer to this file.
