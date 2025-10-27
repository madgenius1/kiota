import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Eye,
  EyeOff,
  Smartphone,
  X,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

const mockTransactions = [
  {
    id: "1",
    type: "DEPOSIT",
    amount: 5000.00,
    reference: "MPesa-ABC123",
    status: "COMPLETED",
    date: "2025-10-27T10:30:00Z",
  },
  {
    id: "2",
    type: "TRADE_BUY",
    amount: -1200.00,
    reference: "SCOM - 30 shares",
    status: "COMPLETED",
    date: "2025-10-27T09:15:00Z",
  },
  {
    id: "3",
    type: "DEPOSIT",
    amount: 10000.00,
    reference: "MPesa-DEF456",
    status: "COMPLETED",
    date: "2025-10-26T14:45:00Z",
  },
  {
    id: "4",
    type: "WITHDRAWAL",
    amount: -3000.00,
    reference: "MPesa-GHI789",
    status: "COMPLETED",
    date: "2025-10-25T16:20:00Z",
  },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [addMoneyModalVisible, setAddMoneyModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("+254 712 345 678");
  const [loading, setLoading] = useState(false);

  // Mock wallet data
  const walletBalance = 15420.50;

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    
    // Simulate M-Pesa STK Push
    setTimeout(() => {
      setLoading(false);
      setAddMoneyModalVisible(false);
      setAmount("");
      alert("✅ Money Added Successfully! Check your phone for M-Pesa confirmation.");
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "DEPOSIT":
        return <ArrowDownLeft size={20} color="#A6D49F" />;
      case "WITHDRAWAL":
        return <ArrowUpRight size={20} color="#EF4444" />;
      case "TRADE_BUY":
        return <ArrowUpRight size={20} color="#EF4444" />;
      case "TRADE_SELL":
        return <ArrowDownLeft size={20} color="#A6D49F" />;
      default:
        return <ArrowUpRight size={20} color="#6B7280" />;
    }
  };

  const getTransactionTitle = (type, reference) => {
    switch (type) {
      case "DEPOSIT":
        return "Money Added";
      case "WITHDRAWAL":
        return "Money Withdrawn";
      case "TRADE_BUY":
        return "Stock Purchase";
      case "TRADE_SELL":
        return "Stock Sale";
      default:
        return "Transaction";
    }
  };

  const TransactionItem = ({ transaction }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#374151",
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#1C1C1C",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        {getTransactionIcon(transaction.type)}
      </View>

      <View style={{ flex: 1 }}>
        <BodyText style={{ marginBottom: 4 }}>
          {getTransactionTitle(transaction.type, transaction.reference)}
        </BodyText>
        <CaptionText style={{ color: "#6B7280" }}>
          {transaction.reference} • {formatDate(transaction.date)}
        </CaptionText>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <NumberText
          style={{
            fontSize: 16,
            color: transaction.amount >= 0 ? "#A6D49F" : "#FFFFFF",
          }}
        >
          {transaction.amount >= 0 ? "+" : ""}KES {Math.abs(transaction.amount).toLocaleString()}
        </NumberText>
        <CaptionText
          style={{
            color: transaction.status === "COMPLETED" ? "#A6D49F" : "#F7B500",
          }}
        >
          {transaction.status}
        </CaptionText>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
      }}
    >
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F7B500"
            colors={["#F7B500"]}
          />
        }
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <HeaderText style={{ fontSize: 24, marginBottom: 8 }}>
            My Wallet
          </HeaderText>
          <CaptionText style={{ color: "#6B7280" }}>
            Manage your funds for trading
          </CaptionText>
        </View>

        {/* Wallet Balance Card */}
        <View
          style={{
            backgroundColor: "#1C1C1C",
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <CaptionText style={{ color: "#9CA3AF" }}>
              AVAILABLE BALANCE
            </CaptionText>
            <TouchableOpacity
              onPress={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? (
                <Eye size={20} color="#6B7280" />
              ) : (
                <EyeOff size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>

          <NumberText style={{ fontSize: 36, marginBottom: 24 }}>
            {balanceVisible 
              ? `KES ${walletBalance.toLocaleString()}`
              : "••••••••"
            }
          </NumberText>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <PrimaryButton
              title="ADD MONEY"
              onPress={() => setAddMoneyModalVisible(true)}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={16} color="#1C1C1C" style={{ marginRight: 8 }} />
                <BodyText style={{ color: "#1C1C1C", fontWeight: "600" }}>
                  ADD MONEY
                </BodyText>
              </View>
            </PrimaryButton>

            <SecondaryButton
              title="WITHDRAW"
              onPress={() => router.push("/withdraw")}
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
            Quick Actions
          </HeaderText>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#1C1C1C",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F7B500",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Smartphone size={20} color="#1C1C1C" />
            </View>

            <View style={{ flex: 1 }}>
              <BodyText style={{ marginBottom: 4 }}>
                Link M-Pesa Account
              </BodyText>
              <CaptionText style={{ color: "#6B7280" }}>
                {phone} • Connected
              </CaptionText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={{ paddingHorizontal: 20 }}>
          <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
            Recent Transactions
          </HeaderText>

          <View
            style={{
              backgroundColor: "#1C1C1C",
              borderRadius: 12,
              paddingHorizontal: 16,
            }}
          >
            {mockTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Money Modal */}
      <Modal
        visible={addMoneyModalVisible}
        transparent
        animationType="slide"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#121212",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 20,
                paddingBottom: insets.bottom + 20,
                paddingHorizontal: 20,
              }}
            >
              {/* Modal Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <HeaderText style={{ fontSize: 20 }}>
                  Add Money
                </HeaderText>
                <IconButton
                  onPress={() => setAddMoneyModalVisible(false)}
                  style={{ backgroundColor: "#1C1C1C" }}
                >
                  <X size={20} color="#FFFFFF" />
                </IconButton>
              </View>

              {/* Amount Input */}
              <View style={{ marginBottom: 20 }}>
                <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                  AMOUNT (KES)
                </CaptionText>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Enter amount"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  style={{
                    backgroundColor: "#1C1C1C",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    color: "#FFFFFF",
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                />
              </View>

              {/* Phone Number */}
              <View style={{ marginBottom: 24 }}>
                <CaptionText style={{ marginBottom: 8, color: "#9CA3AF" }}>
                  M-PESA PHONE NUMBER
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

              {/* Submit Button */}
              <PrimaryButton
                title={loading ? "PROCESSING..." : "ADD MONEY"}
                onPress={handleAddMoney}
                disabled={loading || !amount || !phone}
              />

              <BodyText
                style={{
                  textAlign: "center",
                  color: "#6B7280",
                  fontSize: 14,
                  marginTop: 16,
                }}
              >
                You'll receive an M-Pesa prompt on your phone
              </BodyText>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}