// Configure runtime environment values for the web build.
//
// For local testing, copy this file to `env.js` and set your
// Google API key. When deploying to GitHub Pages, create an
// environment secret (e.g. `GOOGLE_API_KEY`) and have your
// workflow write it into `env.js` before publishing the site.
window.__ENV = window.__ENV || {};
window.__ENV.GOOGLE_API_KEY = window.__ENV.GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY";
