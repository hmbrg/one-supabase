import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import * as z from "zod";
import { Button, Form, H1, Input, Text, View, YStack } from "tamagui";

import { useSupabase } from "~/code/context/supabase-provider";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Please enter at least 8 characters.")
      .max(64, "Please enter fewer than 64 characters.")
      .regex(
        /^(?=.*[a-z])/,
        "Your password must have at least one lowercase letter."
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Your password must have at least one uppercase letter."
      )
      .regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
      .regex(
        /^(?=.*[!@#$%^&*])/,
        "Your password must have at least one special character."
      ),
    confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { signUp } = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signUp(data.email, data.password);
      form.reset();
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }

  console.log(form.formState.errors);

  return (
    <YStack flex={1} padding="$4" gap="$1">
      <View flex={1} gap="$4">
        <H1>Sign Up</H1>

        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <YStack gap="$4">
            <Controller
              control={form.control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
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
          <Text>Sign Up</Text>
        )}
      </Button>
    </YStack>
  );
}
