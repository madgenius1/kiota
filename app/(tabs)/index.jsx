import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { 
  Bell, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  EyeOff,
  Wallet,
  GraduationCap,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

const { width } = Dimensions.get("window");

const mockStocks = [
  {
    id: "SCOM",
    name: "Safaricom",
    ticker: "SCOM",
    price: 42.50,
    change: 2.3,
    changePercent: 5.7,
  },
  {
    id: "EQTY",
    name: "Equity Group",
    ticker: "EQTY", 
    price: 68.75,
    change: -1.2,
    changePercent: -1.7,
  },
  {
    id: "KCB",
    name: "KCB Group",
    ticker: "KCB",
    price: 45.80,
    change: 0.9,
    changePercent: 2.0,
  },
  {
    id: "EABL",
    name: "EABL",
    ticker: "EABL",
    price: 156.25,
    change: 4.1,
    changePercent: 2.7,
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const scrollViewRef = useRef(null);

  // Mock user data
  const user = {
    name: "John",
    walletBalance: 15420.50,
    portfolioValue: 34250.75,
    dayChange: 1205.30,
    dayChangePercent: 3.6,
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const StockCard = ({ stock }) => (
    <TouchableOpacity
      onPress={() => router.push(`/stock-details/${stock.id}`)}
      style={{
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        marginRight: 16,
        width: 160,
      }}
      activeOpacity={0.8}
    >
      <View style={{ marginBottom: 12 }}>
        <BodyText style={{ fontSize: 16, marginBottom: 4 }}>
          {stock.name}
        </BodyText>
        <CaptionText style={{ color: "#6B7280" }}>
          {stock.ticker}
        </CaptionText>
      </View>

      <View style={{ marginBottom: 8 }}>
        <NumberText style={{ fontSize: 20 }}>
          KES {stock.price.toFixed(2)}
        </NumberText>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {stock.change >= 0 ? (
          <ArrowUpRight size={16} color="#A6D49F" />
        ) : (
          <ArrowDownRight size={16} color="#EF4444" />
        )}
        <BodyText
          style={{
            fontSize: 14,
            color: stock.change >= 0 ? "#A6D49F" : "#EF4444",
            marginLeft: 4,
          }}
        >
          {stock.changePercent > 0 ? "+" : ""}{stock.changePercent.toFixed(1)}%
        </BodyText>
      </View>
    </TouchableOpacity>
  );

  const QuickAction = ({ icon: Icon, title, onPress, variant = "primary" }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: variant === "primary" ? "#F7B500" : "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginHorizontal: 6,
      }}
      activeOpacity={0.8}
    >
      <Icon 
        size={24} 
        color={variant === "primary" ? "#1C1C1C" : "#F7B500"} 
        style={{ marginBottom: 8 }}
      />
      <CaptionText
        style={{
          color: variant === "primary" ? "#1C1C1C" : "#F7B500",
          fontSize: 12,
        }}
      >
        {title}
      </CaptionText>
    </TouchableOpacity>
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
        ref={scrollViewRef}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <View>
            <HeaderText style={{ fontSize: 24, marginBottom: 4 }}>
              {getGreeting()}, {user.name}
            </HeaderText>
            <CaptionText style={{ color: "#6B7280" }}>
              Welcome back to Kiota
            </CaptionText>
          </View>

          <IconButton>
            <Bell size={24} color="#F7B500" />
          </IconButton>
        </View>

        {/* Portfolio Snapshot */}
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
              PORTFOLIO VALUE
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

          <View style={{ marginBottom: 16 }}>
            <NumberText style={{ fontSize: 32, marginBottom: 4 }}>
              {balanceVisible 
                ? `KES ${user.portfolioValue.toLocaleString()}`
                : "••••••••"
              }
            </NumberText>
            
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {user.dayChange >= 0 ? (
                <ArrowUpRight size={16} color="#A6D49F" />
              ) : (
                <ArrowDownRight size={16} color="#EF4444" />
              )}
              <BodyText
                style={{
                  color: user.dayChange >= 0 ? "#A6D49F" : "#EF4444",
                  marginLeft: 4,
                }}
              >
                {balanceVisible 
                  ? `${user.dayChange >= 0 ? "+" : ""}${user.dayChange.toLocaleString()} (${user.dayChangePercent.toFixed(1)}%)`
                  : "••••••"
                } today
              </BodyText>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: "#374151",
            }}
          >
            <View>
              <CaptionText style={{ color: "#9CA3AF", marginBottom: 4 }}>
                WALLET BALANCE
              </CaptionText>
              <BodyText style={{ fontSize: 16 }}>
                {balanceVisible 
                  ? `KES ${user.walletBalance.toLocaleString()}`
                  : "••••••••"
                }
              </BodyText>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
            Quick Actions
          </HeaderText>
          
          <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
            <QuickAction
              icon={Plus}
              title="TRADE SHARES"
              onPress={() => router.push("/invest")}
              variant="primary"
            />
            <QuickAction
              icon={Wallet}
              title="ADD MONEY"
              onPress={() => router.push("/wallet")}
            />
            <QuickAction
              icon={GraduationCap}
              title="LEARN"
              onPress={() => router.push("/academy")}
            />
          </View>
        </View>

        {/* Market Highlights */}
        <View style={{ marginBottom: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 16,
            }}
          >
            <HeaderText style={{ fontSize: 18 }}>
              Market Highlights
            </HeaderText>
            
            <TouchableOpacity 
              onPress={() => router.push("/stocks")}
              activeOpacity={0.7}
            >
              <CaptionText style={{ color: "#F7B500" }}>
                VIEW ALL
              </CaptionText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
          >
            {mockStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}