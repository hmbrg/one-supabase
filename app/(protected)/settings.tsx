import { Button, H1, Text, View, YStack } from "tamagui";

import { useSupabase } from "~/code/context/supabase-provider";

export default function Settings() {
  const { signOut } = useSupabase();

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$4"
      gap="$4"
      backgroundColor="$background"
    >
      <H1 textAlign="center">Sign Out</H1>
      <Text textAlign="center" color="$gray11">
        Sign out and return to the welcome screen.
      </Text>
      <Button width="100%" size="$4" theme="active" onPress={signOut}>
        <Text>Sign Out</Text>
      </Button>
    </YStack>
  );
}
