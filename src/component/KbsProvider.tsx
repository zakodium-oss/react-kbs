import { createContext, ReactNode } from 'react';

export interface KbsProviderProps {
  children: ReactNode;
}

const kbsDispatchContext = createContext<any>(null);

export function KbsProvider(props: KbsProviderProps) {
  return (
    <kbsDispatchContext.Provider value={null}>
      {props.children}
    </kbsDispatchContext.Provider>
  );
}
