import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { App } from '@/components/App';
import { initialize } from '@/initialize';
import { DEV } from '@/config';
import '@/i18n';
import '@/mockEnv';
import '@/styles/index.css';


const root = ReactDOM.createRoot(document.getElementById('root')!);

// Configure all application dependencies.
initialize(retrieveLaunchParams().startParam === 'debug' || DEV);

root.render(
  <StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </StrictMode>,
);