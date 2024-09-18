'use client';

import { useEffect } from 'react';

import client, { initializeGenesysClient, authenticateClient, getGenesysClient, getQueryParameters, computeState } from '@/config/genesys.config';

const GenesysProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const initGenesys = async () => {
      try {
        initializeGenesysClient();
        // eslint-disable-next-line no-console
        console.log(getGenesysClient())
        const queryParameters = getQueryParameters();
        const state = computeState(queryParameters);

        await authenticateClient(state).then(() => {
          return new client.UsersApi().getUsersMe({ 'expand': ['authorization'] })
        }).then((data) => {
          // eslint-disable-next-line no-console
          console.log('Genesys user data:', data);
        })
      } catch (error) {
        console.error('Genesys authentication failed:', error);
      }
    };

    initGenesys();
  }, []);

  return <>{children}</>; // Render child components after initializing Genesys
};

export default GenesysProvider;
