import { RootState } from '@/store';

export const getAnimationActive = (state: RootState) => state.animation.active;
export const getAnimationElementId = (state: RootState) => state.animation.elementId;
export const getAnimationProps = (state: RootState) => state.animation.props;
