import Constants from "expo-constants";
import { Platform } from "react-native";
import { usePremium } from "../state/premiumStore";

type IAPModule = typeof import("expo-in-app-purchases");
let IAP: IAPModule | null = null;
const warnMissingModule = () =>
  console.warn(
    "In-app purchases are not available in this environment (expo-in-app-purchases native module missing)."
  );

const IOS_PRODUCT_ID =
  Constants.expoConfig?.extra?.premium?.iosProductId || "premium_monthly_ios";
const ANDROID_PRODUCT_ID =
  Constants.expoConfig?.extra?.premium?.androidProductId ||
  "premium_monthly_android";

const PRODUCT_ID =
  Platform.OS === "android"
    ? ANDROID_PRODUCT_ID
    : Platform.OS === "ios"
    ? IOS_PRODUCT_ID
    : IOS_PRODUCT_ID;

if (Platform.OS !== "web") {
  try {
    IAP = require("expo-in-app-purchases") as IAPModule;
  } catch (error) {
    console.warn(
      "expo-in-app-purchases native module is unavailable. In-app purchases will be disabled.",
      error
    );
  }
}

let initPromise: Promise<void> | null = null;
let isReady = false;

export async function initIAP() {
  if (!IAP) {
    warnMissingModule();
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      await IAP!.connectAsync();
      const responseCode = await IAP!.getBillingResponseCodeAsync();
      if (responseCode !== IAP!.IAPResponseCode.OK) {
        isReady = false;
        return;
      }

      await IAP!.getProductsAsync([PRODUCT_ID]);

      IAP!.setPurchaseListener(async ({ responseCode, results }) => {
        if (responseCode === IAP!.IAPResponseCode.OK) {
          for (const purchase of results ?? []) {
            usePremium.getState().setPremium(true);
            await IAP!.finishTransactionAsync(purchase, true);
          }
        }
      });

      isReady = true;
      await restorePurchases(true);
    } catch (error) {
      isReady = false;
      console.warn("Failed to initialise in-app purchases", error);
    }
  })();

  return initPromise;
}

export async function teardownIAP() {
  if (!IAP) return;
  try {
    await IAP.disconnectAsync();
  } catch (error) {
    console.warn("Failed to disconnect in-app purchases", error);
  } finally {
    isReady = false;
    initPromise = null;
  }
}

export async function buyPremium() {
  if (!IAP) {
    warnMissingModule();
    return;
  }

  await initIAP();
  if (!isReady) {
    console.warn("In-app purchases are not ready yet.");
    return;
  }
  await IAP.purchaseItemAsync(PRODUCT_ID);
}

export async function restorePurchases(skipInit = false) {
  if (!IAP) {
    warnMissingModule();
    return;
  }
  try {
    if (!skipInit) {
      await initIAP();
    }
    if (!isReady) {
      console.warn("In-app purchases are not ready yet.");
      return;
    }
    const history = await IAP.getPurchaseHistoryAsync({
      useGooglePlayCache: true,
    });
    const has = (history.results ?? []).some(
      (p) => p.productId === PRODUCT_ID
    );
    usePremium.getState().setPremium(has);
  } catch (error) {
    console.warn("Failed to restore purchases", error);
  }
}
