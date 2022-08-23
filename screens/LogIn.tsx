import React, { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";

interface LogInFormData {
  username: string;
  password: string;
}

export default function LogIn() {
  const { control, handleSubmit } = useForm<LogInFormData>();
  const onValid = (data: LogInFormData) => {
    console.log(data);
  };
  const passwordRef = useRef<TextInput | null>(null);
  const onNext = (nextOne: RefObject<TextInput | null>) => {
    nextOne?.current?.focus();
  };

  return (
    <AuthLayout>
      <Controller
        name="username"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 20 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            placeholder="Username"
            returnKeyType="next"
            autoCapitalize="none"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 30 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
