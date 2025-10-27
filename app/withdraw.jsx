import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Animated,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  CreditCard, 
  Building, 
  Smartphone,
  Check,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function WithdrawScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  // Mock user data - in real app this would come from auth
  const user = {
    id: 1,
    walletBalance: 15420.50,
  };

  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding)
  ).current;

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    if (Platform.OS === 'web') return;
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === 'web') return;
    animateTo(insets.bottom + focusedPadding);
  };

  // Withdrawal mutation
  const withdrawMutation = useMutation({
    mutationFn: async (withdrawalData) => {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(withdrawalData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Withdrawal failed');
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['portfolio']);
      queryClient.invalidateQueries(['user']);
      Alert.alert(
        "Withdrawal Successful",
        data.message || "Your withdrawal request has been submitted successfully.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    },
    onError: (error) => {
      Alert.alert("Withdrawal Failed", error.message);
    },
  });

  const withdrawalAmount = parseFloat(amount) || 0;
  const isValidAmount = withdrawalAmount > 0 && withdrawalAmount <= user.walletBalance;
  const isValidAccount = accountNumber.trim().length > 0;
  const isValidBank = selectedMethod === 'mpesa' || bankName.trim().length > 0;

  const handleWithdraw = () => {
    if (!isValidAmount) {
      Alert.alert("Invalid Amount", "Please enter a valid withdrawal amount");
      return;
    }

    if (!isValidAccount) {
      Alert.alert(
        "Missing Account Info", 
        selectedMethod === 'mpesa' ? "Please enter your M-Pesa number" : "Please enter your account number"
      );
      return;
    }

    if (!isValidBank) {
      Alert.alert("Missing Bank Info", "Please enter your bank name");
      return;
    }

    const methodText = selectedMethod === 'mpesa' 
      ? `M-Pesa (${accountNumber})`
      : `Bank Transfer (${bankName} - ${accountNumber})`;

    Alert.alert(
      "Confirm Withdrawal",
      `Withdraw KES ${withdrawalAmount.toFixed(2)} to ${methodText}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            withdrawMutation.mutate({
              userId: user.id,
              amount: withdrawalAmount,
              method: selectedMethod,
              accountNumber,
              bankName: selectedMethod === 'bank' ? bankName : undefined,
            });
          },
        },
      ]
    );
  };

  const QuickAmount = ({ value, label }) => (
    <TouchableOpacity
      onPress={() => setAmount(value.toString())}
      style={{
        backgroundColor: amount === value.toString() ? "#F7B500" : "#1C1C1C",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 4,
      }}
      activeOpacity={0.8}
    >
      <NumberText
        style={{
          color: amount === value.toString() ? "#1C1C1C" : "#FFFFFF",
          fontSize: 16,
        }}
      >
        {value.toLocaleString()}
      </NumberText>
      <CaptionText
        style={{
          color: amount === value.toString() ? "#1C1C1C" : "#6B7280",
          fontSize: 10,
          marginTop: 2,
        }}
      >
        {label}
      </CaptionText>
    </TouchableOpacity>
  );

  const WithdrawalMethod = ({ method, icon: Icon, title, description, selected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? "#F7B500" : "#374151",
      }}
      activeOpacity={0.8}
    >
      <Icon size={24} color="#F7B500" style={{ marginRight: 16 }} />
      
      <View style={{ flex: 1 }}>
        <BodyText style={{ fontSize: 16, marginBottom: 4 }}>
          {title}
        </BodyText>
        <CaptionText style={{ color: "#6B7280" }}>
          {description}
        </CaptionText>
      </View>

      {selected && (
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#F7B500",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={12} color="#1C1C1C" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#121212" }}>
        <StatusBar style="light" />

        <Animated.View style={{ paddingBottom: paddingAnimation }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: insets.top + 20,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <IconButton onPress={() => router.back()}>
                <ArrowLeft size={24} color="#FFFFFF" />
              </IconButton>

              <View style={{ flex: 1, marginLeft: 16 }}>
                <HeaderText style={{ fontSize: 20 }}>
                  Withdraw Funds
                </HeaderText>
                <CaptionText style={{ color: "#6B7280" }}>
                  Transfer money from your Kiota wallet
                </CaptionText>
              </View>
            </View>

            {/* Available Balance */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <CaptionText style={{ color: "#6B7280", marginBottom: 8 }}>
                AVAILABLE BALANCE
              </CaptionText>
              <NumberText style={{ fontSize: 24 }}>
                KES {user.walletBalance.toLocaleString()}
              </NumberText>
            </View>

            {/* Amount Input */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <BodyText style={{ fontSize: 16, marginBottom: 12 }}>
                Withdrawal Amount
              </BodyText>

              <View
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: !isValidAmount && amount ? "#EF4444" : "#374151",
                }}
              >
                <CaptionText style={{ color: "#6B7280", marginRight: 8 }}>
                  KES
                </CaptionText>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    color: "#FFFFFF",
                    fontSize: 18,
                  }}
                />
              </View>

              {!isValidAmount && amount && (
                <CaptionText style={{ color: "#EF4444", marginTop: 8 }}>
                  {withdrawalAmount > user.walletBalance 
                    ? "Insufficient balance" 
                    : "Enter a valid amount"
                  }
                </CaptionText>
              )}

              {/* Quick Amount Buttons */}
              <View style={{ flexDirection: "row", marginTop: 12, marginHorizontal: -4 }}>
                <QuickAmount value={1000} label="KES" />
                <QuickAmount value={5000} label="KES" />
                <QuickAmount value={10000} label="KES" />
                <QuickAmount value={Math.min(user.walletBalance, 25000)} label="MAX" />
              </View>
            </View>

            {/* Withdrawal Method */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <BodyText style={{ fontSize: 16, marginBottom: 16 }}>
                Withdrawal Method
              </BodyText>

              <WithdrawalMethod
                method="mpesa"
                icon={Smartphone}
                title="M-Pesa"
                description="Instant transfer to your M-Pesa account"
                selected={selectedMethod === "mpesa"}
                onPress={() => setSelectedMethod("mpesa")}
              />

              <WithdrawalMethod
                method="bank"
                icon={Building}
                title="Bank Transfer"
                description="Transfer to your bank account (2-3 business days)"
                selected={selectedMethod === "bank"}
                onPress={() => setSelectedMethod("bank")}
              />
            </View>

            {/* Account Details */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <BodyText style={{ fontSize: 16, marginBottom: 12 }}>
                {selectedMethod === "mpesa" ? "M-Pesa Number" : "Account Details"}
              </BodyText>

              <View
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  marginBottom: 12,
                }}
              >
                <TextInput
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder={selectedMethod === "mpesa" ? "0712345678" : "Account Number"}
                  placeholderTextColor="#6B7280"
                  keyboardType={selectedMethod === "mpesa" ? "phone-pad" : "default"}
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                  }}
                />
              </View>

              {selectedMethod === "bank" && (
                <View
                  style={{
                    backgroundColor: "#1C1C1C",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  <TextInput
                    value={bankName}
                    onChangeText={setBankName}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Bank Name (e.g., KCB Bank)"
                    placeholderTextColor="#6B7280"
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                    }}
                  />
                </View>
              )}
            </View>

            {/* Processing Info */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <HeaderText style={{ fontSize: 16, marginBottom: 12 }}>
                Processing Information
              </HeaderText>

              <View style={{ marginBottom: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    Processing Time
                  </CaptionText>
                  <BodyText>
                    {selectedMethod === "mpesa" ? "Instant" : "2-3 business days"}
                  </BodyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    Processing Fee
                  </CaptionText>
                  <BodyText>Free</BodyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: "#374151",
                  }}
                >
                  <BodyText style={{ fontWeight: "600" }}>You'll Receive</BodyText>
                  <NumberText style={{ fontSize: 18 }}>
                    KES {withdrawalAmount.toFixed(2)}
                  </NumberText>
                </View>
              </View>
            </View>

            {/* Withdraw Button */}
            <View style={{ paddingHorizontal: 20 }}>
              <PrimaryButton
                title="WITHDRAW FUNDS"
                onPress={handleWithdraw}
                disabled={
                  withdrawMutation.isPending || 
                  !isValidAmount || 
                  !isValidAccount || 
                  !isValidBank
                }
                style={{
                  opacity: (
                    withdrawMutation.isPending || 
                    !isValidAmount || 
                    !isValidAccount || 
                    !isValidBank
                  ) ? 0.6 : 1,
                }}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}