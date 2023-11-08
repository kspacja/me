"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import Sun from "./sun.svg";
import Moon from "./moon.svg";

import { Button } from "./styles";

type TimeOfDay = "night" | "day" | null;

function useNightSounds() {
  const buzzRef = useRef<HTMLAudioElement>(null);
  const switchRef = useRef<HTMLAudioElement>(null);

  const turnAudio = (state: TimeOfDay) => {
    if (!buzzRef.current || !switchRef.current || !state) {
      return;
    }

    switchRef.current.volume = 0.1;
    switchRef.current.play();
    if (state === "day") {
      buzzRef.current.volume = 0.1;
      buzzRef.current.play();
    } else {
      buzzRef.current.pause();
      buzzRef.current.currentTime = 0;
    }
  };

  return [buzzRef, switchRef, turnAudio] as const;
}

function setFavicon(timeOfDay: TimeOfDay) {
  const faviconLink =
    document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (faviconLink && timeOfDay) {
    faviconLink.href = `/favicon-${timeOfDay}.ico`;
  }
}

export default function NightSwitch() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(null);
  const defferTimeOfDay = useDeferredValue(timeOfDay);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTimeOfDay(e.matches ? "night" : "day");
    };

    setTimeOfDay(prefersDarkScheme.matches ? "night" : "day");
    prefersDarkScheme.addEventListener("change", handleChange);

    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (defferTimeOfDay) {
      document.body.className = defferTimeOfDay;
    }

    setFavicon(defferTimeOfDay);
  }, [defferTimeOfDay]);

  const [buzzRef, switchRef, turnAudio] = useNightSounds();

  return (
    <>
      <audio src="/buzz.mp3" ref={buzzRef} />
      <audio src="/switch.wav" ref={switchRef} />
      <Button
        onClick={() => {
          setTimeOfDay((state) => {
            turnAudio(state);
            return state === "day" ? "night" : "day";
          });
        }}
        aria-label={
          defferTimeOfDay === "day" ? "Switch to night" : "Switch to day"
        }
      >
        {defferTimeOfDay === "day" ? (
          <Sun width="30" height="30" />
        ) : (
          <Moon width="30" height="30" />
        )}
      </Button>
    </>
  );
}
