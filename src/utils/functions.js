import defaultSettings from '@/settings/app';

/**
 *
 * @param {String} pageTitle
 * @returns String
 */
export function getPageTitle(pageTitle) {
  const appTitle = defaultSettings.appTitle || 'Booking home stay';
  if (appTitle) {
    if (!pageTitle) return appTitle;
    return `${appTitle} - ${pageTitle}`;
  }
  return `${appTitle}`;
}