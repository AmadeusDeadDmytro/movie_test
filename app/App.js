import React from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  RootNavigator,
} from "./navigators"
import { Provider } from 'mobx-react'
import { mainStore } from './stores'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider mainStore={mainStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator />
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
