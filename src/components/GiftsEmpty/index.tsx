import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EmptyLottie } from '@/components/EmptyLottie';
import './index.css';


export const GiftsEmpty = ({ text }: { text: string }) => {
  return (
    <div className="gifts-empty">
      <EmptyLottie />
      <span>{text}</span>
      <Link to="/store">
        <Trans i18nKey="common.open_store" />
      </Link>
    </div>
  );
};
