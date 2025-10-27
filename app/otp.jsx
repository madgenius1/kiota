import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { HeaderText, BodyText, CaptionText } from "@/components/Typography";
import { PrimaryButton, IconButton } from "@/components/Button";

export default function OTPScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const inputRefs = useRef([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== "") && !verified) {
      handleVerify(newOtp);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpToVerify = otp) => {
    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
      
      // Success animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Navigate to profile after success animation
      setTimeout(() => {
        router.replace("/profile");
      }, 1500);
    }, 2000);
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    
    // Reset timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => clearInterval(timer), 30000);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 40,
        paddingHorizontal: 20,
      }}
    >
      <StatusBar style="light" />

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
          Verify Your Phone
        </HeaderText>
      </View>

      {/* Description */}
      <View style={{ marginBottom: 40 }}>
        <BodyText
          style={{
            color: "#9CA3AF",
            lineHeight: 24,
            marginBottom: 8,
          }}
        >
          We've sent a 6-digit verification code to your phone number.
        </BodyText>
        <CaptionText style={{ color: "#6B7280" }}>
          Don't worry, verification takes seconds.
        </CaptionText>
      </View>

      {/* OTP Input */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        {otp.map((digit, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [{ scale: verified ? scaleAnim : 1 }],
            }}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              style={{
                width: 48,
                height: 56,
                backgroundColor: verified ? "#A6D49F" : "#1C1C1C",
                borderRadius: 12,
                borderWidth: 2,
                borderColor: digit 
                  ? (verified ? "#A6D49F" : "#F7B500")
                  : "#374151",
                textAlign: "center",
                color: verified ? "#1C1C1C" : "#FFFFFF",
                fontSize: 24,
                fontWeight: "600",
              }}
              editable={!verified && !loading}
            />
            
            {/* Success checkmark */}
            {verified && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: successAnim,
                }}
              >
                <Check size={20} color="#1C1C1C" />
              </Animated.View>
            )}
          </Animated.View>
        ))}
      </View>

      {/* Verify Button */}
      <PrimaryButton
        title={verified ? "VERIFIED ✓" : loading ? "VERIFYING..." : "VERIFY"}
        onPress={() => handleVerify()}
        disabled={loading || verified || otp.some(digit => digit === "")}
        style={{
          marginBottom: 32,
          backgroundColor: verified ? "#A6D49F" : undefined,
        }}
        textStyle={{
          color: verified ? "#1C1C1C" : undefined,
        }}
      />

      {/* Resend Code */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BodyText style={{ color: "#6B7280", marginRight: 8 }}>
          Didn't receive the code?
        </BodyText>
        {canResend ? (
          <TouchableOpacity onPress={handleResend}>
            <BodyText style={{ color: "#F7B500" }}>Resend</BodyText>
          </TouchableOpacity>
        ) : (
          <BodyText style={{ color: "#6B7280" }}>
            Resend in {resendTimer}s
          </BodyText>
        )}
      </View>
    </View>
  );
}