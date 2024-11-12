import {
  backButton,
  mainButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  expandViewport,
  $debug,
  init as initSDK, secondaryButton,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export function initialize(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Check if all required components are supported.
  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  // Mount all components used in the project.
  backButton.mount();
  mainButton.mount();
  secondaryButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport
    .mount()
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  // Expand the viewport to the full screen.
  expandViewport();

  // Define components-related CSS variables.
  miniApp.bindCssVars();
  themeParams.bindCssVars();
}