import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppRoot } from '@/components/AppRoot';
import { Animator } from '@/components/Animator';
import { routes } from '@/navigation/routes';
import { store } from '@/store';


export const App = () => {
  useTranslation();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoot>
          <Animator>
            <Routes>
              {routes.map((route) => <Route key={route.path} {...route} />)}
            </Routes>
          </Animator>
        </AppRoot>
      </BrowserRouter>
    </Provider>
  );
};
