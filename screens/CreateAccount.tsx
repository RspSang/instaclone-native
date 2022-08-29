import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import FormError from "../components/auth/FormError";
import {
  CreateAccountMutation,
  useCreateAccountMutation,
} from "../generated/graphql";
import { RootStackParamList } from "../shared/shared.types";

interface CreateAccountFormData {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  result?: string;
}

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

export default function CreateAccount({ navigation }: CreateAccountProps) {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<CreateAccountFormData>({ mode: "onChange" });
  const onValid = (data: CreateAccountFormData) => {
    if (loading) return;
    createAccount({ variables: { ...data } });
  };
  const onCompleted = ({ createAccount }: CreateAccountMutation) => {
    const { username, password } = getValues();
    if (createAccount) {
      const { ok, error } = createAccount;
      if (!ok && error) {
        setError("result", { message: error });
        return;
      }
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };
  const [createAccount, { loading }] = useCreateAccountMutation({
    onCompleted,
  });

  const lastNameRef = useRef<TextInput | null>(null);
  const usernameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const onNext = (nextOne: RefObject<TextInput | null>) => {
    nextOne?.current?.focus();
  };
  return (
    <AuthLayout>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 20 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{ minLength: 1, maxLength: 20 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            ref={lastNameRef}
            placeholder="Last Name"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 20 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            ref={usernameRef}
            placeholder="Username"
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 20 }}
        render={({ field: { onChange, value } }) => (
          <AuthTextInput
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
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
            onSubmitEditing={handleSubmit(onValid)}
            lastOne={true}
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors ? <FormError message={errors.result?.message} /> : null}
      <AuthButton
        text="Create Account"
        loading={loading}
        disabled={!isValid || loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
