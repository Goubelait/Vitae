// contexts/AdsContext.tsx
import * as InAppPurchases from "expo-in-app-purchases";
import React, { createContext, useContext, useEffect, useState } from "react";

type AdsContextType = {
  adsRemoved: boolean;
  buyRemoveAds: () => Promise<void>;
};

const AdsContext = createContext<AdsContextType | null>(null);

export const AdsProvider = ({ children }: { children: React.ReactNode }) => {
  const [adsRemoved, setAdsRemoved] = useState(false);

  // ID défini dans App Store / Play Console
  const REMOVE_ADS_ID = "remove_ads_vitae";

  useEffect(() => {
    const init = async () => {
      await InAppPurchases.connectAsync();

      // Vérifie si déjà acheté
      const { responseCode, results } =
        await InAppPurchases.getPurchaseHistoryAsync();
      if (
        responseCode === InAppPurchases.IAPResponseCode.OK &&
        results?.some((p) => p.productId === REMOVE_ADS_ID)
      ) {
        setAdsRemoved(true);
      }
    };

    init();

    return () => {
      InAppPurchases.disconnectAsync();
    };
  }, []);

  // Acheter
  const buyRemoveAds = async () => {
    try {
      await InAppPurchases.purchaseItemAsync(REMOVE_ADS_ID);
      setAdsRemoved(true);
    } catch (err) {
      console.log("Purchase error:", err);
    }
  };

  return (
    <AdsContext.Provider value={{ adsRemoved, buyRemoveAds }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error("useAds must be inside AdsProvider");
  return ctx;
};
