import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import FormError from "../components/auth/FormError";
import { LoginMutation, useLoginMutation } from "../generated/graphql";
import { RootStackParamList } from "../shared/shared.types";

interface LogInFormData {
  username: string;
  password: string;
  result: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "LogIn">;

export default function LogIn({ route: { params } }: Props) {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<LogInFormData>({
    mode: "onChange",
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
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
            value={watch("username")}
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
            value={watch("password")}
            onFocus={clearError}
          />
        )}
      />
      {errors ? <FormError message={errors.result?.message} /> : null}
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!isValid || loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
