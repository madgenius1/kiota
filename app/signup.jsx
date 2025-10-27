import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from "lucide-react-native";
import { HeaderText, BodyText, CaptionText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [signupMethod, setSignupMethod] = useState("email"); // 'email' or 'phone'
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      setLoading(false);
      router.replace("/profile");
    }, 2000);
  };

  const handleEmailSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setLoading(true);
    // Simulate email signup
    setTimeout(() => {
      setLoading(false);
      router.push("/otp");
    }, 2000);
  };

  const handlePhoneSignup = async () => {
    setLoading(true);
    // Simulate phone signup
    setTimeout(() => {
      setLoading(false);
      router.push("/otp");
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <IconButton
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </IconButton>
          
          <HeaderText style={{ fontSize: 20 }}>
            Create Your Kiota Account
          </HeaderText>
        </View>

        {/* Google Signup */}
        <SecondaryButton
          title="CONTINUE WITH GOOGLE"
          onPress={handleGoogleSignup}
          disabled={loading}
          style={{
            marginBottom: 24,
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
          textStyle={{ color: "#1C1C1C" }}
        />

        {/* Divider */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#374151" }} />
          <CaptionText style={{ marginHorizontal: 16, color: "#6B7280" }}>
            OR
          </CaptionText>
          <View style={{ flex: 1, height: 1, backgroundColor: "#374151" }} />
        </View>

        {/* Method Toggle */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#1C1C1C",
            borderRadius: 12,
            padding: 4,
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            onPress={() => setSignupMethod("email")}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: signupMethod === "email" ? "#F7B500" : "transparent",
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <Mail 
              size={20} 
              color={signupMethod === "email" ? "#1C1C1C" : "#9CA3AF"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setSignupMethod("phone")}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: signupMethod === "phone" ? "#F7B500" : "transparent",
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <Phone 
              size={20} 
              color={signupMethod === "phone" ? "#1C1C1C" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>

        {/* Email Form */}
        {signupMethod === "email" && (
          <View style={{ marginBottom: 32 }}>
            <View style={{ marginBottom: 16 }}>
              <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                EMAIL ADDRESS
              </CaptionText>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#FFFFFF",
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#374151",
                }}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                PASSWORD
              </CaptionText>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showPassword}
                  style={{
                    backgroundColor: "#1C1C1C",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 48,
                    color: "#FFFFFF",
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 24 }}>
              <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                CONFIRM PASSWORD
              </CaptionText>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showConfirmPassword}
                  style={{
                    backgroundColor: "#1C1C1C",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 48,
                    color: "#FFFFFF",
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <PrimaryButton
              title="CREATE ACCOUNT"
              onPress={handleEmailSignup}
              disabled={loading || !email || !password || !confirmPassword}
            />
          </View>
        )}

        {/* Phone Form */}
        {signupMethod === "phone" && (
          <View style={{ marginBottom: 32 }}>
            <View style={{ marginBottom: 24 }}>
              <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                PHONE NUMBER
              </CaptionText>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+254 7xx xxx xxx"
                placeholderTextColor="#6B7280"
                keyboardType="phone-pad"
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: "#FFFFFF",
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#374151",
                }}
              />
            </View>

            <PrimaryButton
              title="SEND OTP"
              onPress={handlePhoneSignup}
              disabled={loading || !phone}
            />
          </View>
        )}

        {/* Terms */}
        <BodyText
          style={{
            textAlign: "center",
            color: "#6B7280",
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 24,
          }}
        >
          By continuing, you agree to Kiota's{" "}
          <BodyText style={{ color: "#F7B500" }}>Terms of Use</BodyText> &{" "}
          <BodyText style={{ color: "#F7B500" }}>Privacy Policy</BodyText>.
        </BodyText>

        {/* Login Link */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BodyText style={{ color: "#6B7280", marginRight: 8 }}>
            Already have an account?
          </BodyText>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <BodyText style={{ color: "#F7B500" }}>Sign In</BodyText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}