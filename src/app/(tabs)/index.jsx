import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  Wallet,
  BookOpen,
} from "lucide-react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = React.useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FDF8" }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            paddingBottom: 24,
            backgroundColor: "#2D5016",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: 16, opacity: 0.9 }}>
                Habari, Investor!
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: "bold",
                  marginTop: 4,
                }}
              >
                Welcome to Kiota
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: 12,
              }}
            >
              <Wallet color="#FFFFFF" size={24} />
            </View>
          </View>
        </View>

        {/* Balance Card */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: -20,
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#6B7280", fontSize: 14, marginBottom: 4 }}>
                Total Portfolio Value
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#1F2937",
                    fontSize: 28,
                    fontWeight: "bold",
                    marginRight: 8,
                  }}
                >
                  {balanceVisible ? "KES 2,450" : "••••••"}
                </Text>
                <TouchableOpacity
                  onPress={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? (
                    <Eye color="#6B7280" size={20} />
                  ) : (
                    <EyeOff color="#6B7280" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{ color: "#059669", fontSize: 14, fontWeight: "600" }}
              >
                +12.5%
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 12 }}>This month</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#2D5016",
                borderRadius: 12,
                padding: 16,
                marginRight: 8,
                alignItems: "center",
              }}
            >
              <Plus color="#FFFFFF" size={24} />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                  marginTop: 8,
                }}
              >
                Add Money
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  opacity: 0.8,
                  marginTop: 2,
                }}
              >
                Via M-Pesa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                marginLeft: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <TrendingUp color="#2D5016" size={24} />
              <Text
                style={{
                  color: "#2D5016",
                  fontSize: 14,
                  fontWeight: "600",
                  marginTop: 8,
                }}
              >
                Start Investing
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>
                From KES 10
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Market Highlights */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#1F2937" }}
            >
              Market Highlights
            </Text>
            <TouchableOpacity onPress={() => router.push("/stocks")}>
              <Text
                style={{ color: "#2D5016", fontSize: 14, fontWeight: "600" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stock Cards */}
          {[
            {
              name: "Safaricom",
              symbol: "SCOM",
              price: "KES 15.50",
              change: "+2.3%",
              positive: true,
            },
            {
              name: "Equity Bank",
              symbol: "EQTY",
              price: "KES 52.75",
              change: "+1.8%",
              positive: true,
            },
            {
              name: "KCB Group",
              symbol: "KCB",
              price: "KES 14.25",
              change: "-0.5%",
              positive: false,
            },
            {
              name: "Co-operative Bank",
              symbol: "COOP",
              price: "KES 12.80",
              change: "+0.8%",
              positive: true,
            },
            {
              name: "NCBA Group",
              symbol: "NCBA",
              price: "KES 28.50",
              change: "+1.2%",
              positive: true,
            },
          ].map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#1F2937" }}
                >
                  {stock.name}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                  {stock.symbol}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#1F2937" }}
                >
                  {stock.price}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: stock.positive ? "#059669" : "#DC2626",
                    marginTop: 2,
                  }}
                >
                  {stock.change}
                </Text>
              </View>
              <ArrowUpRight
                color="#6B7280"
                size={16}
                style={{ marginLeft: 12 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Continue Learning
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FEF3C7",
              borderRadius: 12,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#F59E0B",
                borderRadius: 10,
                padding: 10,
                marginRight: 16,
              }}
            >
              <BookOpen color="#FFFFFF" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#92400E" }}
              >
                Understanding Stock Prices
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#92400E",
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                Learn how stock prices move • 5 min read
              </Text>
            </View>
            <ArrowUpRight color="#92400E" size={20} />
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
