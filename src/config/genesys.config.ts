const platformClient = require('purecloud-platform-client-v2/dist/node/purecloud-platform-client-v2.js')

export const client = platformClient.ApiClient.instance;

// Function to initialize Genesys Cloud client
export const initializeGenesysClient = () => {
  // Set environment from env or default to 'mypurecloud.com'
  client.setEnvironment(process.env.GENESYS_ENVIRONMENT || 'mypurecloud.jp');

  // Optionally persist settings (e.g., for token storage)
  client.setPersistSettings(true, 'agent-monitoring-app');
  // client.setAccessToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5Y2I3MzE0NC05NWFiLTQxOTQtYTRkMS1iMGZjMzRmNTM2YzMiLCJqdGkiOiJmZGJkNTc1MjRkMzVhNjkwNTVmYmIwMWVjNTRhNjM0NjBiZTE0MGQ5YTIxZGYwZDBiNzQ4Y2ViZGJlN2U5ZDYyOGE1NGI2ZWZhYjdlMWZhYiIsImlhdCI6MTcyNTk1MDIxMS41MTg2NzcsIm5iZiI6MTcyNTk1MDIxMS41MTg2OCwiZXhwIjoxNzQxNTg4NjExLjUxNjUzNCwic3ViIjoiNDE1ZTIxNWItNGQ0Yy00OTZhLThhMWQtOTBmM2EzNTU2ZWQ5Iiwic2NvcGVzIjpbXX0.TK7LtyWPHyT0EtfHrtVO-Vw8Meu1iIU1AJ0cf99sjB2sqKBmLhkiE2vIMP6ggNF5GL01PGlnvV-ZYvRR0HYPPH3852dEp8r7glsYc-jOhp-FtUkmFAH_-cSmLahNIt-qY2KE6FfA90Raj9D8ddRObN5wsh2xA-sn4X3WFl_iHzM1IL_wH7EyL4X4hk-fwN1jW1txjS1PtVgzg1lOgHeYD1qTgLh8OEJIhp3ia2HNPn22ugI3YZFBf_iYZySkSw4li4N0gr-dhTZFMcGCmEq0wKwTd8i0wH7vIHqIQJ7dqiX0z2YD8eTlMdZESNbT8XjWxxJenSxoLAFgMddTVgA9uaQlCFjYWz6VAx-bZFnjqi4PmxyrB5WKLI4JbJbKSxAUvKxfRDtpbeRVxJ1Eq6S9uze9uJXvsu5TP2g61lLWvObAEhh5dIpcO5przzNDc39m6A519PUAHFWc35m8pLio7F6axVRTmHxbpxo9N7T3nAYQqHBPVvXHkrC1vAjeO9SuZ2nwoBe4niXjuINwF8SrSroipH3Gq0Vch8dXRzrPPMYBNAXzNCSZcZl8A4C9W-cwTc_WyvZgROG8ja17TZYp4DHErsTMqovHg1qVZR0kat5Ji8t6AMJXlzrV4l0vABT1gcMWPIBB3HLNKsrQ5LzNYpsKT8AaFm-DCpvFYuj1LVY");
};

// Function to authenticate the client using implicit grant
export const authenticateClient = async (state = '') => {
  const { origin, protocol, host, pathname } = window.location;
  const redirectUrl = (origin || `${protocol}//${host}`) + pathname;
  try {
    // Login using OAuth implicit grant flow
    return await client.loginImplicitGrant(
      process.env.GENESYS_CLIENT_ID || '',     // Client ID from .env
      redirectUrl,  // Redirect URI from .env
      { state }     // State parameter
    ).then((data: { state: string }) => {
      window.history.replaceState({}, '', `${pathname}?${data.state}`);
    });
    // eslint-disable-next-line no-console
    // console.log('Genesys client authenticated');
  } catch (err) {
    // console.error('Failed to authenticate Genesys client:', err);
    throw new Error('Authentication failed');
  }
};

// Function to get the authenticated client instance
export const getGenesysClient = () => {
  return client;
};

export const getQueryParameters = () => {
  const result = {
    gcHostOrigin: null,
    gcTargetEnv: null,
    pcEnvironment: null
  }

  if (window.location.hash && window.location.hash.indexOf('access_token') >= 0) {
    let oauthParams = extractParams(window.location.hash.substring(1));
    if (oauthParams && oauthParams.access_token && oauthParams.state) {
      // OAuth2 spec dictates this encoding
      // See: https://tools.ietf.org/html/rfc6749#appendix-B
      const queryParams = extractParams(unescape(oauthParams.state));
      result.gcHostOrigin = queryParams.gcHostOrigin;
      result.gcTargetEnv = queryParams.gcTargetEnv;
      result.pcEnvironment = queryParams.pcEnvironment;
    }
  }
  const queryParams = extractParams(window.location.search.substring(1));
  if (!result.gcHostOrigin) {
    result.gcHostOrigin = queryParams.gcHostOrigin;
  }
  if (!result.gcTargetEnv) {
    result.gcTargetEnv = queryParams.gcTargetEnv;
  }
  if (!result.pcEnvironment) {
    result.pcEnvironment = queryParams.pcEnvironment;
  }
  return result;
}

export const extractParams = (url: string) => {
  let result: { [key: string]: any } = {};

  if (url) {
    let params = url.split('&');
    params.forEach(function (currParam) {
      if (currParam) {
        let paramTokens = currParam.split('=');
        let paramName = paramTokens[0];
        let paramValue = paramTokens[1];
        if (paramName) {
          paramName = decodeURIComponent(paramName);
          paramValue = paramValue ? decodeURIComponent(paramValue) : '';

          if (!result.hasOwnProperty(paramName)) {
            result[paramName] = paramValue;
          } else if (Array.isArray(result[paramName])) {
            result[paramName].push(paramValue);
          } else {
            result[paramName] = [result[paramName], paramValue];
          }
        }
      }
    });
  }

  return result;
}

export const computeState = ({ gcHostOrigin, gcTargetEnv, pcEnvironment }: { gcHostOrigin: string | null, gcTargetEnv: string | null, pcEnvironment: string | null }) => {
  if (gcHostOrigin && gcTargetEnv) {
    return `gcHostOrigin=${gcHostOrigin}&gcTargetEnv=${gcTargetEnv}`;
  } else {
    return `pcEnvironment=${pcEnvironment}`;
  }
}

export default client;
