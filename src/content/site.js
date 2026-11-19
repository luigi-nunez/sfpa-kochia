// Organisation-level content. Fields set to null are not yet confirmed by SFPA;
// the UI shows a "to be confirmed" marker instead of inventing values.
import { WA_NUMBER, CALL_CENTRE } from '../config.js';
import { SERVICES } from '../data/services.js';
import { SPECIALTIES } from './specialties.js';

export const SITE = {
  name: { en: 'Sudan Family Planning Association', ar: 'جمعية تنظيم الأسرة السودانية' },
  short: { en: 'SFPA Sudan', ar: 'جمعية تنظيم الأسرة' },
  tagline: {
    en: 'Confidential sexual and reproductive health care, information, and support.',
    ar: 'رعاية ومعلومات ودعم سري في مجال الصحة الجنسية والإنجابية.',
  },
  whatsapp: WA_NUMBER,
  callCentre: CALL_CENTRE,
  email: null,            // e.g. 'info@sfpa.sd' once confirmed
  address: null,          // head office address once confirmed
  hours: null,            // { en: 'Sunday to Thursday, 08:00 to 15:00', ar: '...' }
  founded: null,          // confirm founding year with SFPA before publishing
  socials: [],            // [{ id: 'facebook', url: 'https://facebook.com/...' }]
  donationUrl: null,      // payment gateway link once SFPA has one
};

// Stats are derived from data in this repo so nothing is invented.
export function getStats() {
  return {
    services: SERVICES.length,
    free: SERVICES.filter((s) => s.price === null).length,
    specialties: SPECIALTIES.length,
  };
}
