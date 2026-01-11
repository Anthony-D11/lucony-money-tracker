import { Stack, Tabs } from "expo-router";
import './global.css';
import { RealmProvider } from "@/contexts/RealmContext";

const realmConfig = {
  schemaVersion: 1, 
  // encryptionKey: 
};

export default function RootLayout() {
  return (
    <RealmProvider {...realmConfig}>
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="add_transaction"
          options={{
            animation: "slide_from_bottom",
            headerShown: false
          }}
        />
      </Stack>
    </RealmProvider>
  )
}
