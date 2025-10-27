import { IconButton, PrimaryButton } from "@/components/Button";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { BodyText, CaptionText, HeaderText, NumberText } from "@/components/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TradeSharesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  
  const [transactionType, setTransactionType] = useState("BUY");
  const [shares, setShares] = useState("1");
  const [customAmount, setCustomAmount] = useState("");
  const [useCustomAmount, setUseCustomAmount] = useState(false);

  // Mock user ID - in real app this would come from auth
  const userId = 1;

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

  // Fetch stock details
  const { data: stockData, isLoading: stockLoading } = useQuery({
    queryKey: ['stock', id],
    queryFn: async () => {
      const response = await fetch(`/api/stocks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch stock');
      return response.json();
    },
  });

  // Fetch user portfolio for this stock
  const { data: portfolioData } = useQuery({
    queryKey: ['portfolio', userId, id],
    queryFn: async () => {
      const response = await fetch(`/api/portfolio/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch portfolio');
      const data = await response.json();
      return data.portfolio.find(p => p.stock_id == id) || null;
    },
  });

  // Execute trade mutation
  const tradeMutation = useMutation({
    mutationFn: async (tradeData) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tradeData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Trade failed');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio']);
      queryClient.invalidateQueries(['transactions']);
      Alert.alert(
        "Trade Successful",
        `Your ${transactionType.toLowerCase()} order has been executed successfully.`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    },
    onError: (error) => {
      Alert.alert("Trade Failed", error.message);
    },
  });

  const stock = stockData?.stock;
  const portfolio = portfolioData;
  
  const numShares = parseFloat(shares) || 0;
  const pricePerShare = useCustomAmount ? parseFloat(customAmount) || 0 : parseFloat(stock?.current_price || 0);
  const totalAmount = numShares * pricePerShare;
  const fees = totalAmount * 0.01;
  const finalAmount = totalAmount + fees;

  const maxSellShares = portfolio ? parseFloat(portfolio.shares_owned) : 0;

  const handleTrade = () => {
    if (!stock) return;
    
    if (numShares <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of shares");
      return;
    }

    if (transactionType === "SELL" && numShares > maxSellShares) {
      Alert.alert("Insufficient Shares", `You only own ${maxSellShares} shares`);
      return;
    }

    Alert.alert(
      "Confirm Trade",
      `${transactionType} ${numShares} shares of ${stock.ticker} at KES ${pricePerShare.toFixed(2)} per share?\n\nTotal: KES ${finalAmount.toFixed(2)} (including fees)`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            tradeMutation.mutate({
              userId,
              stockId: stock.id,
              transactionType,
              shares: numShares,
              pricePerShare,
            });
          },
        },
      ]
    );
  };

  const QuickAmount = ({ amount, label }) => (
    <TouchableOpacity
      onPress={() => setShares(amount.toString())}
      style={{
        backgroundColor: shares === amount.toString() ? "#F7B500" : "#1C1C1C",
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
          color: shares === amount.toString() ? "#1C1C1C" : "#FFFFFF",
          fontSize: 16,
        }}
      >
        {amount}
      </NumberText>
      <CaptionText
        style={{
          color: shares === amount.toString() ? "#1C1C1C" : "#6B7280",
          fontSize: 10,
          marginTop: 2,
        }}
      >
        {label}
      </CaptionText>
    </TouchableOpacity>
  );

  if (stockLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" }}>
        <StatusBar style="light" />
        <CaptionText style={{ color: "#6B7280" }}>Loading stock details...</CaptionText>
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={{ flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" }}>
        <StatusBar style="light" />
        <CaptionText style={{ color: "#6B7280" }}>Stock not found</CaptionText>
      </View>
    );
  }

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
                  Trade {stock.ticker}
                </HeaderText>
                <CaptionText style={{ color: "#6B7280" }}>
                  {stock.name}
                </CaptionText>
              </View>
            </View>

            {/* Stock Info */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <NumberText style={{ fontSize: 24 }}>
                    KES {parseFloat(stock.current_price).toFixed(2)}
                  </NumberText>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                    {parseFloat(stock.change_percent) >= 0 ? (
                      <ArrowUpRight size={16} color="#A6D49F" />
                    ) : (
                      <ArrowDownRight size={16} color="#EF4444" />
                    )}
                    <BodyText
                      style={{
                        color: parseFloat(stock.change_percent) >= 0 ? "#A6D49F" : "#EF4444",
                        marginLeft: 4,
                      }}
                    >
                      {parseFloat(stock.change_percent) > 0 ? "+" : ""}{parseFloat(stock.change_percent).toFixed(1)}%
                    </BodyText>
                  </View>
                </View>

                {portfolio && (
                  <View style={{ alignItems: "flex-end" }}>
                    <CaptionText style={{ color: "#6B7280" }}>YOU OWN</CaptionText>
                    <NumberText style={{ fontSize: 18 }}>
                      {parseFloat(portfolio.shares_owned).toFixed(4)} shares
                    </NumberText>
                  </View>
                )}
              </View>
            </View>

            {/* Trade Type Toggle */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  padding: 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => setTransactionType("BUY")}
                  style={{
                    flex: 1,
                    backgroundColor: transactionType === "BUY" ? "#A6D49F" : "transparent",
                    borderRadius: 8,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                  activeOpacity={0.8}
                >
                  <BodyText
                    style={{
                      color: transactionType === "BUY" ? "#1C1C1C" : "#FFFFFF",
                      fontWeight: "600",
                    }}
                  >
                    BUY
                  </BodyText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTransactionType("SELL")}
                  style={{
                    flex: 1,
                    backgroundColor: transactionType === "SELL" ? "#EF4444" : "transparent",
                    borderRadius: 8,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                  activeOpacity={0.8}
                >
                  <BodyText
                    style={{
                      color: transactionType === "SELL" ? "#FFFFFF" : "#FFFFFF",
                      fontWeight: "600",
                    }}
                  >
                    SELL
                  </BodyText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Shares Input */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <BodyText style={{ fontSize: 16, marginBottom: 12 }}>
                Number of Shares
              </BodyText>

              <View
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const newValue = Math.max(1, numShares - 1);
                    setShares(newValue.toString());
                  }}
                  style={{ padding: 8 }}
                >
                  <Minus size={20} color="#6B7280" />
                </TouchableOpacity>

                <TextInput
                  value={shares}
                  onChangeText={setShares}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="0"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  style={{
                    flex: 1,
                    color: "#FFFFFF",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    const newValue = numShares + 1;
                    setShares(newValue.toString());
                  }}
                  style={{ padding: 8 }}
                >
                  <Plus size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Quick Amount Buttons */}
              <View style={{ flexDirection: "row", marginTop: 12, marginHorizontal: -4 }}>
                <QuickAmount amount={1} label="SHARES" />
                <QuickAmount amount={5} label="SHARES" />
                <QuickAmount amount={10} label="SHARES" />
                <QuickAmount amount={25} label="SHARES" />
              </View>
            </View>

            {/* Price Toggle */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                <TouchableOpacity
                  onPress={() => setUseCustomAmount(!useCustomAmount)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#F7B500",
                    backgroundColor: useCustomAmount ? "#F7B500" : "transparent",
                    marginRight: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {useCustomAmount && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#1C1C1C",
                      }}
                    />
                  )}
                </TouchableOpacity>
                <BodyText style={{ fontSize: 16 }}>
                  Use custom price (limit order)
                </BodyText>
              </View>

              {useCustomAmount && (
                <View
                  style={{
                    backgroundColor: "#1C1C1C",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  <TextInput
                    value={customAmount}
                    onChangeText={setCustomAmount}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder={`${parseFloat(stock.current_price).toFixed(2)}`}
                    placeholderTextColor="#6B7280"
                    keyboardType="numeric"
                    style={{
                      color: "#FFFFFF",
                      fontSize: 18,
                    }}
                  />
                </View>
              )}
            </View>

            {/* Order Summary */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
                Order Summary
              </HeaderText>

              <View style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    {numShares} shares × KES {pricePerShare.toFixed(2)}
                  </CaptionText>
                  <BodyText>KES {totalAmount.toFixed(2)}</BodyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    Transaction fees (1%)
                  </CaptionText>
                  <BodyText>KES {fees.toFixed(2)}</BodyText>
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
                  <BodyText style={{ fontWeight: "600" }}>Total</BodyText>
                  <NumberText style={{ fontSize: 18 }}>
                    KES {finalAmount.toFixed(2)}
                  </NumberText>
                </View>
              </View>
            </View>

            {/* Execute Trade Button */}
            <View style={{ paddingHorizontal: 20 }}>
              <PrimaryButton
                title={`${transactionType} ${stock.ticker}`}
                onPress={handleTrade}
                disabled={tradeMutation.isPending || numShares <= 0}
                style={{
                  backgroundColor: transactionType === "BUY" ? "#A6D49F" : "#EF4444",
                  opacity: tradeMutation.isPending || numShares <= 0 ? 0.6 : 1,
                }}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}