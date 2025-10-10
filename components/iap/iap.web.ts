export async function initIAP() {
  // No-op on web
}

export async function buyPremium() {
  // No-op on web
  console.warn('In-app purchases are not available on web');
}

export async function restorePurchases() {
  // No-op on web
  console.warn('Restore purchases is not available on web');
}

