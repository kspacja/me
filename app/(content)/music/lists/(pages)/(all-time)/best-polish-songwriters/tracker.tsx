'use client';

import { useEffect } from "react";
import './tracker.css';

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

let openedWrapper: HTMLDivElement | null = null;

function openPlayer(iframeProps: { src: string, width: string, height: string, allow: string}) {
  if (openedWrapper) {
    openedWrapper.remove();
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'yt-wrapper';
  openedWrapper = wrapper;

  const iframe = document.createElement('iframe');
  iframe.src = iframeProps.src;
  iframe.width = iframeProps.width;
  iframe.height = iframeProps.height;
  iframe.allow = iframeProps.allow;
  iframe.className = 'yt-iframe';
  iframe.allowFullscreen = true;

  // add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'zamknij';
  closeButton.className = 'yt-close';
  closeButton.addEventListener('click', () => {
    wrapper.remove();
    openedWrapper = null;
  });

  wrapper.appendChild(iframe);
  wrapper.appendChild(closeButton);
  document.body.appendChild(wrapper);
}

export default function Tracker() {
  useEffect(() => {
    document.querySelectorAll('a').forEach(a => {
      if (a.host !== window.location.host && !a.getAttribute('data-umami-event')) {
        a.setAttribute('data-umami-event', 'external-link');

        // find sibiling element before, which <label> 

        const label = a.previousElementSibling;
        if (label?.tagName === 'LABEL') {
          a.setAttribute('data-umami-event-caption', label.textContent || a.href);
        }

        const caption = (label?.tagName === 'LABEL' ? label.textContent?.trim().replace(':', '') : null) ?? (a.textContent || a.href);

        a.setAttribute('data-umami-event-caption', caption);
      }

      // On touch devices, rewrite YouTube/Tidal URLs through a redirect endpoint
      // so Android's intent system doesn't intercept the tap and open the native app.
      if (window.matchMedia('(pointer: coarse)').matches) {
        if (a.href.includes('youtube.com/watch') || a.href.includes('tidal.com/track')) {
          a.href = `/api/redirect?url=${encodeURIComponent(a.href)}`;
        }
      }
    });

    // Attach at document level with capture so we fire before React's root listener,
    // which otherwise calls router.push() before our <a>-level handler runs.
    const handleClick = (e: MouseEvent) => {
      // Let cmd/ctrl/shift/middle-click pass through for native new-tab behavior
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const a = (e.target as Element).closest('a');
      if (!a) return;

      // Unwrap redirect URL on touch devices
      const redirectParam = new URL(a.href, window.location.href).searchParams.get('url');
      const effectiveHref = redirectParam ? decodeURIComponent(redirectParam) : a.href;

      // youtube
      if (effectiveHref.includes('youtube.com/watch')) {
        e.preventDefault();
        e.stopImmediatePropagation();

        window.umami?.track('external-link', { caption: a.textContent || effectiveHref });

        const videoId = effectiveHref.split('v=')[1].split('&')[0];
        openPlayer({
          src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
          width: '320',
          height: '180',
          allow: 'autoplay; encrypted-media'
        });
        return;
      }

      // tidal
      if (effectiveHref.includes('tidal.com/track')) {
        e.preventDefault();
        e.stopImmediatePropagation();

        window.umami?.track('external-link', { caption: a.textContent || effectiveHref });

        // e.g. https://tidal.com/track/32588932/u
        const trackId = effectiveHref.split('/track/')[1].split('/')[0];
        openPlayer({
          src: `https://embed.tidal.com/tracks/${trackId}`,
          width: '320',
          height: '120',
          allow: 'encrypted-media'
        });
      }
    };

    // add default wrapper with simple message about youtube links
    const defaultWrapper = document.createElement('div');
    defaultWrapper.className = 'yt-default-wrapper';
    defaultWrapper.innerHTML = 'Gdy klikniesz w link do piosenki (YouTube lub Tidal), pojawi się okienko z utworem bez opuszczania strony.<div class="yt-default-wrapper-note"> Możesz cały czas otworzyć w nowej karcie - to zależy od Twojej decyzji :)</div>';
    document.body.appendChild(defaultWrapper);
    openedWrapper = defaultWrapper;

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [])

  return null;
}