import { MOVE_INTERVAL } from '../utils/gameSettings';

export const getMoveInterval = (score: number): number => {
  const accelerationFactor = Math.floor(score / 10);
  const acceleratedInterval = MOVE_INTERVAL - (score);
  return Math.max(20, acceleratedInterval);
};
