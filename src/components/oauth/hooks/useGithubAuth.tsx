import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import { REACT_APP_CLIENT_ID } from '../../../constants';
import { useApi } from '../../../hooks/useApi';
import { useTokens } from '../../../hooks/useTokens';
import { Notifications } from '../../../notifications';

export const useGithubAuth = () => {
  const api = useApi();
  const { tokens, setAccessToken, setRefreshToken } = useTokens();
  /* A react ref that tracks if GitHub auth is loading */
  const isGitHubAuthLoading = useRef(false);
  const { asPath, push } = useRouter();
  const redirectUri = typeof window !== 'undefined' ? window.location.href : '';
  const scopes = ['read'].join('%20');
  const githubAuthURL = `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`;

  const disconnect = useCallback(async () => {
    const tokens = await api.auth.githubDisconnect();

    if (tokens) {
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    } else {
      Notifications.error('Unable to disconnect GitHub account');
    }
  }, [api.auth, setAccessToken, setRefreshToken]);

  /* Redirect to github to authorize if not connected / logged in */
  const authorize = useCallback(() => push(githubAuthURL), [githubAuthURL, push]);

  const authenticate = useCallback(
    async (code: string) => {
      const tokens = await api.auth.githubAuth(code);

      if (tokens) {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
      } else {
        Notifications.error('Unable to authenticate with GitHub');
      }
    },
    [setAccessToken, setRefreshToken, api.auth],
  );

  /* After requesting Github access, Github redirects back to your app with a code parameter. */
  useEffect(() => {
    const url = asPath;
    const hasCode = url.includes('?code=');

    /* If Github API returns the code parameter */
    if (hasCode && isGitHubAuthLoading.current === false && tokens) {
      const newUrl = url.split('?code=');
      const codeWithNoHash = newUrl[1].split('#')[0];
      isGitHubAuthLoading.current = true;
      push(newUrl[0]);
      authenticate(codeWithNoHash);
    }
  }, [authenticate, asPath, push, tokens]);

  return {
    disconnect,
    authorize,
  };
};