// contexts/AdsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Import conditionnel pour éviter l'erreur en développement
let InAppPurchases: any = null;
try {
  InAppPurchases = require("expo-in-app-purchases");
} catch (error) {
  console.log("expo-in-app-purchases not available in development");
}

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
      if (!InAppPurchases) {
        console.log("InAppPurchases not available, skipping initialization");
        return;
      }

      try {
        await InAppPurchases.connectAsync();

        // Vérifie si déjà acheté
        const { responseCode, results } =
          await InAppPurchases.getPurchaseHistoryAsync();
        if (
          responseCode === InAppPurchases.IAPResponseCode.OK &&
          results?.some((p: any) => p.productId === REMOVE_ADS_ID)
        ) {
          setAdsRemoved(true);
        }
      } catch (error) {
        console.log("InAppPurchases initialization error:", error);
      }
    };

    init();

    return () => {
      if (InAppPurchases) {
        InAppPurchases.disconnectAsync();
      }
    };
  }, []);

  // Acheter
  const buyRemoveAds = async () => {
    if (!InAppPurchases) {
      console.log("InAppPurchases not available, simulating purchase");
      setAdsRemoved(true);
      return;
    }

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
