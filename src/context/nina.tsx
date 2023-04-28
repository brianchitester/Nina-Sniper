import * as React from "react";
import Nina from "@nina-protocol/js-sdk";
import { useEffect, useState } from "react";

Nina.client.init(
  undefined,
  `https://solana-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
);

const NinaContext = React.createContext<NinaContextValue>({});

type NinaContextValue = {
  allReleases?: any;
};

type NinaProviderProps = {
  children?: React.ReactNode;
};

function NinaProvider({ children }: NinaProviderProps) {
  const [allReleases, setAllReleases] = useState<any[]>();

  const fetchAll = async () => {
    //TODO: What happens if there are more than 10000 releases?
    const { releases } = await Nina.Release.fetchAll({ limit: 10000 }, true);
    setAllReleases(releases);
  };

  useEffect(() => {
    if (!allReleases) {
      fetchAll();
    }
  }, [allReleases]);

  const value = { allReleases };
  return <NinaContext.Provider value={value}>{children}</NinaContext.Provider>;
}

function useNina() {
  const context = React.useContext(NinaContext);
  if (context === undefined) {
    throw new Error("useNina must be used within a NinaProvider");
  }
  return context;
}

export { NinaProvider, useNina };
