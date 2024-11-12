import { useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Avatar } from '@/components/Avatar';
import { formatNumberT } from '@/helpers/utils';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getProfile } from '@/selectors/profileSelector';
import { setElementId, setProps } from '@/store/reducers/animation';
import { PAGE_ANIMATION_DURATION } from '@/helpers/constants/animation';
import GiftIcon from '@/assets/icons/gift.svg?react';
import './item.css';


export const Item = ({ user }: { user: IUserShort | 'me' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfile);

  const avatarRef = useRef<HTMLElement>(null);

  const currUser = useMemo(() => user === 'me' ? profile : user, [user, profile]);

  const onClick = useCallback(() => {
    if (avatarRef.current) {
      const elementId = `avatar-${Date.now()}`;
      avatarRef.current.setAttribute('id', elementId);
      dispatch(setProps({
        x: 'center',
        y: 8,
        width: 100,
        height: 100,
      }));
      dispatch(setElementId(elementId));
    }
    setTimeout(() => navigate(`/users/${currUser._id}`), PAGE_ANIMATION_DURATION);
  }, []);

  return (
    <div className="list-item leaderboard-item" onClick={onClick}>
      <Avatar user={currUser} ref={avatarRef} />
      <div className="list-row">
        <div className="list-row-content">
          <span className="leaderboard-row-title">
            <span className="name">{`${currUser.firstName} ${currUser.lastName}`}</span>
            {profile._id === currUser._id && (
              <div className="badge">
                <span><Trans i18nKey="leaderboard.you" /></span>
              </div>
            )}
          </span>
          <div className="leaderboard-row-description">
            <GiftIcon />
            <span>
              <Trans
                i18nKey="leaderboard.gifts"
                count={currUser.giftCount}
                values={{ gifts: formatNumberT(currUser.giftCount) }}
              />
            </span>
          </div>
        </div>
        <div className="list-row-end leaderboard-rank">
          {currUser.rank > 3 ? (
            <span>#{currUser.rank}</span>
          ) : (
            <img
              src={`/images/medal_${currUser.rank}.png`}
              alt={`#${currUser.rank}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
