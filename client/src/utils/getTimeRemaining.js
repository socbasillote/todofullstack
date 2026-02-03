export const getTimeRemaining = (expiresAt) => {
  const now = new Date();
  const end = new Date(expiresAt);

  const diff = end - now;

  if (diff <= 0) {
    return { expired: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds,
  };
};
