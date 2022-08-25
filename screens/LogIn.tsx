import React, { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import { LoginMutation, useLoginMutation } from "../generated/graphql";

interface LogInFormData {
  username: string;
  password: string;
  result: string;
}

export default function LogIn() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LogInFormData>();
  const onValid = ({ username, password }: LogInFormData) => {
    if (!loading) {
      logInMutation({ variables: { username, password } });
    }
  };
  const onCompleted = ({ login }: LoginMutation) => {
    if (login) {
      const { ok, error, token } = login;
      if (!ok && error) {
        setError("result", { message: error });
      }
      if (token) {
        isLoggedInVar(true);
      }
    }
  };
  const [logInMutation, { loading }] = useLoginMutation({
    onCompleted,
  });
  const clearError = () => {
    clearErrors("result");
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
            onFocus={clearError}
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
            onFocus={clearError}
          />
        )}
      />
      {errors ? (
        <View>
          <Text style={{ color: "red" }}>{errors.result?.message}</Text>
        </View>
      ) : null}
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
