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
   let $d = new Date(date);

   let da = $d.getDate().toString();
   let mo = $d.getMonth().toString();
   let ye = $d.getFullYear().toString();
   let ho = $d.getHours().toString();
   let mi = $d.getMinutes().toString();

   if (da.length === 1) { da = '0' + da; }
   if (mo.length === 1) { mo = '0' + mo; }
   if (ho.length === 1) { ho = '0' + ho; }
   if (mi.length === 1) { mi = '0' + mi; }

   return `${da}/${mo}/${ye} ${ho}:${mi}`;
}