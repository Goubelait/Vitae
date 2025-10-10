import Constants from "expo-constants";
import { Platform } from "react-native";
import { usePremium } from "../state/premiumStore";

type IAPModule = typeof import("expo-in-app-purchases");
let IAP: IAPModule | null = null;
const warnMissingModule = () =>
  console.warn(
    "In-app purchases are not available in this environment (expo-in-app-purchases native module missing)."
  );

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

const PRODUCT_ID =
  Constants.expoConfig?.extra?.premium?.iosProductId || "premium_monthly_ios";

export async function initIAP() {
  if (!IAP) {
    warnMissingModule();
    return;
  }

  await IAP.connectAsync();
  const responseCode = await IAP.getBillingResponseCodeAsync();
  if (responseCode !== IAP.IAPResponseCode.OK) return;

  await IAP.getProductsAsync([PRODUCT_ID]);

  IAP.setPurchaseListener(async ({ responseCode, results }) => {
    if (responseCode === IAP.IAPResponseCode.OK) {
      for (const purchase of results ?? []) {
        usePremium.getState().setPremium(true);
        await IAP.finishTransactionAsync(purchase, true);
      }
    }
  });
}

export async function buyPremium() {
  if (!IAP) {
    warnMissingModule();
    return;
  }
  await IAP.purchaseItemAsync(PRODUCT_ID);
}

export async function restorePurchases() {
  if (!IAP) {
    warnMissingModule();
    return;
  }
  const history = await IAP.getPurchaseHistoryAsync({ useGooglePlayCache: true });
  const has = (history.results ?? []).some((p) => p.productId === PRODUCT_ID);
  usePremium.getState().setPremium(has);
}
