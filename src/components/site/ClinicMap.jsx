// Leaflet + OpenStreetMap tiles, loaded only when the clinics page opens.
// Only clinics with confirmed lat/lng get a marker; nothing is guessed.
import { useEffect, useRef, useState } from 'react';
import { useSite } from '../../lib/site.jsx';

const SUDAN = [15.6, 32.5];

export default function ClinicMap({ clinics, selected, onSelect }) {
  const { lang, t } = useSite();
  const el = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);
  const markers = useRef({});
  const [failed, setFailed] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(navigator.onLine);
    window.addEventListener('online', on); window.addEventListener('offline', on);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', on); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]).then(([mod]) => {
      if (cancelled || !el.current || map.current) return;
      const L = mod.default;
      map.current = L.map(el.current, { scrollWheelZoom: false, attributionControl: true }).setView(SUDAN, 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.current);
      layer.current = { L, group: L.layerGroup().addTo(map.current) };
      setTimeout(() => map.current?.invalidateSize(), 50);
      drawMarkers();
    }).catch(() => setFailed(true));
    return () => { cancelled = true; map.current?.remove(); map.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawMarkers() {
    if (!layer.current) return;
    const { L, group } = layer.current;
    group.clearLayers();
    markers.current = {};
    const located = clinics.filter((c) => c.lat != null && c.lng != null);
    located.forEach((c) => {
      const icon = L.divIcon({ className: 'map-pin', html: '<span></span>', iconSize: [28, 36], iconAnchor: [14, 34] });
      const m = L.marker([c.lat, c.lng], { icon, title: lang === 'ar' ? c.name_ar : c.name_en }).addTo(group);
      m.bindPopup(`<strong>${lang === 'ar' ? c.name_ar : c.name_en}</strong>`);
      m.on('click', () => onSelect?.(c.id));
      markers.current[c.id] = m;
    });
    if (located.length > 1) map.current.fitBounds(L.latLngBounds(located.map((c) => [c.lat, c.lng])), { padding: [30, 30] });
    else if (located.length === 1) map.current.setView([located[0].lat, located[0].lng], 13);
  }

  useEffect(drawMarkers, [clinics, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const m = markers.current[selected];
    if (m && map.current) { map.current.setView(m.getLatLng(), 14); m.openPopup(); }
  }, [selected]);

  const anyLocated = clinics.some((c) => c.lat != null && c.lng != null);
  const notice = failed || !online ? t.clinics.mapOffline : !anyLocated ? t.clinics.mapPending : null;

  return (
    <div className="map-wrap">
      <div ref={el} className="map" role="region" aria-label={t.clinics.mapTitle} />
      {notice && <div className="map-notice"><p>{notice}</p></div>}
    </div>
  );
}
