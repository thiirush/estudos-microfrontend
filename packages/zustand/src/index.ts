import { useSyncExternalStore } from 'react';

type Listener = () => void;

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetState<T> = () => T;

export function create<T>(initializer: (set: SetState<T>, get: GetState<T>) => T) {
  const listeners = new Set<Listener>();

  let state: T;

  const getState: GetState<T> = () => state;

  const setState: SetState<T> = (partial) => {
    const nextPartial = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextPartial };
    listeners.forEach((listener) => listener());
  };

  state = initializer(setState, getState);

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return function useStore() {
    return useSyncExternalStore(subscribe, getState, getState);
  };
}
