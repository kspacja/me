// Chat history has max length of X messages. When the limit is reached, the oldest message is removed.

import { useCallback, useEffect, useState } from "react";

const MAX_HISTORY_LENGTH = 10;
const STORAGE_KEY = 'inputHistory';

export function loadInputHistory() {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) as string[] : [];
}

export function saveLastMessage(message: string) {
  const history = loadInputHistory();

  if (history[history.length - 1] === message) {
    return;
  }

  if (history.length >= MAX_HISTORY_LENGTH) {
    history.pop();
  }

  history.unshift(message);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useInputHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setHistory(loadInputHistory());
  }, []);

  const moveIndex = useCallback((move: number) => {
    const newIndex = index + move;

    if (newIndex < 0) {
      setIndex(0);
    } else if (newIndex >= history.length) {
      setIndex(history.length - 1);
    } else {
      setIndex(newIndex);
    }
  }, [index, history, setIndex]);

  return [history[index], moveIndex] as const;
}