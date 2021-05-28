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

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
 export function parseTime(date) {
   let d = new Date(date);
   return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}