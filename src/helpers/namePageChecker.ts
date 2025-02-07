export const namePageChecker = (pathname: string): string | undefined => {
  if (pathname === '/dashboard') {
    return 'Dashboard';
  }
  if (pathname === '/megabot') {
    return 'Megabot';
  }
  if (pathname === '/market') {
    return 'Bot Market';
  }
  if (pathname === '/prices') {
    return 'Coin prices';
  }
  if (pathname === '/profile') {
    return 'Profile';
  }
};
