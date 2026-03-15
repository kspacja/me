'use client';

import { useEffect } from "react";
import './tracker.css';

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
        a.setAttribute('data-umami-event-caption', a.textContent || a.href);

        a.addEventListener('click', (e) => {
          // open embed for youtube links and tidal links

          // don't open if user holds ctrl or cmd key (wants to open in new tab)
          if (e.ctrlKey || e.metaKey) {
            return;
          }

          // youtube
          if (a.href.includes('youtube.com/watch')) {
            e.preventDefault();

            const videoId = a.href.split('v=')[1].split('&')[0];

            openPlayer({
              src: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
              width: '320',
              height: '180',
              allow: 'autoplay; encrypted-media'
            });

            return false;
          }

          // tidal
          if (a.href.includes('tidal.com/track')) {
            e.preventDefault();

            // e.g. https://tidal.com/track/32588932/u
            const trackId = a.href.split('/track/')[1].split('/')[0]

            openPlayer({
              src: `https://embed.tidal.com/tracks/${trackId}`,
              width: '320',
              height: '120',
              allow: 'encrypted-media'
            });

            return false;
          }
        }, { capture: true });
      }
    });

    // add default wrapper with simple message about youtube links
    const defaultWrapper = document.createElement('div');
    defaultWrapper.className = 'yt-default-wrapper';
    defaultWrapper.innerHTML = 'Gdy klikniesz w link do piosenki (YouTube lub Tidal), pojawi się okienko z utworem bez opuszczania strony.<div class="yt-default-wrapper-note"> Może cały czas otworzyć w nowej karcie - to zależy od Twojej decyzji :)</div>';
    document.body.appendChild(defaultWrapper);

    openedWrapper = defaultWrapper;
  }, [])

  return null;
}