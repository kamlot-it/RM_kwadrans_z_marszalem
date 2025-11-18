(() => {
  const config = (window.__APP_CONFIG__ ?? {});

  if (!config.API_BASE_URL || !config.API_KEY) {
    console.warn("App secrets are not configured. Set API_BASE_URL and API_KEY via GitHub Pages environment secrets.");
    return;
  }

  const normalize = (value) => {
    try {
      return new URL(value, window.location.href).toString();
    } catch (_) {
      return "";
    }
  };

  const targetBase = normalize(config.API_BASE_URL);
  if (!targetBase) {
    console.warn("Invalid API_BASE_URL provided in app configuration.");
    return;
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const request = new Request(input, init);
    const url = normalize(request.url);

    if (url.startsWith(targetBase)) {
      const headers = new Headers(request.headers);
      if (!headers.has("X-Api-Key")) {
        headers.set("X-Api-Key", config.API_KEY);
      }
      init = {
        ...init,
        headers,
      };
    }

    return originalFetch(request, init);
  };
})();
