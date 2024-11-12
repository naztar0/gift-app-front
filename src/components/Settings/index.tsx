import { Theme } from './theme';
import { Language } from './language';
import './index.css';


export const Settings = () => {
  return (
    <div className="settings">
      <Theme />
      <Language />
    </div>
  );
}