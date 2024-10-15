import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import * as z from "zod";
import { Button, Form, H1, Input, Text, View, YStack } from "tamagui";

import { useSupabase } from "~/code/context/supabase-provider";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Please enter at least 8 characters.")
    .max(64, "Please enter fewer than 64 characters."),
});

export default function SignIn() {
  const { signInWithPassword } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signInWithPassword(data.email, data.password);
      form.reset();
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }

  return (
    <YStack flex={1} padding="$4" gap="$1">
      <View flex={1} gap="$4">
        <H1>Sign In</H1>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <YStack gap="$4">
            <Input
              placeholder="Email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              {...form.register("email")}
            />
            <Input
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              {...form.register("password")}
            />
          </YStack>
        </Form>
      </View>

      <Button
        size="$4"
        theme="active"
        onPress={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text>Sign In</Text>
        )}
      </Button>
    </YStack>
  );
}
