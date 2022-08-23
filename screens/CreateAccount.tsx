import { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";

interface CreateAccountFormData {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const { control, handleSubmit } = useForm<CreateAccountFormData>();
  const onValid = (data: CreateAccountFormData) => {
    console.log(data);
  };
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
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
