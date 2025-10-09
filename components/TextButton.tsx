import * as StoreReview from "expo-store-review";
import { Button } from "react-native";

export default function HiddenTestButton() {
  const request = async () => {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      await StoreReview.requestReview();
      console.log("Review requested!");
    } else {
      console.log("StoreReview not available on this platform.");
    }
  };

  return <Button title="💬 Test Review Popup" onPress={request} />;
}
