import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Calendar,
  Building,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

const { width } = Dimensions.get("window");

export default function StockDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  // Mock user ID - in real app this would come from auth
  const userId = 1;

  // Fetch stock details
  const { data: stockData, isLoading: stockLoading, refetch } = useQuery({
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

  const stock = stockData?.stock;
  const portfolio = portfolioData;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Mock price history data for chart
  const mockPriceHistory = [
    { time: "09:00", price: parseFloat(stock?.current_price || 0) * 0.98 },
    { time: "10:00", price: parseFloat(stock?.current_price || 0) * 1.01 },
    { time: "11:00", price: parseFloat(stock?.current_price || 0) * 0.99 },
    { time: "12:00", price: parseFloat(stock?.current_price || 0) * 1.02 },
    { time: "13:00", price: parseFloat(stock?.current_price || 0) * 1.00 },
    { time: "14:00", price: parseFloat(stock?.current_price || 0) * 1.03 },
    { time: "15:00", price: parseFloat(stock?.current_price || 0) },
  ];

  const TimeframeButton = ({ timeframe, active }) => (
    <TouchableOpacity
      onPress={() => setSelectedTimeframe(timeframe)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: active ? "#F7B500" : "#1C1C1C",
        marginRight: 12,
        minWidth: 50,
        alignItems: "center",
      }}
      activeOpacity={0.8}
    >
      <CaptionText
        style={{
          color: active ? "#1C1C1C" : "#9CA3AF",
          fontSize: 12,
          fontWeight: active ? "600" : "400",
        }}
      >
        {timeframe}
      </CaptionText>
    </TouchableOpacity>
  );

  const StatCard = ({ label, value, icon: Icon, color = "#FFFFFF" }) => (
    <View
      style={{
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginHorizontal: 6,
        alignItems: "center",
      }}
    >
      <Icon size={20} color={color} style={{ marginBottom: 8 }} />
      <NumberText style={{ fontSize: 16, marginBottom: 4, color }}>
        {value}
      </NumberText>
      <CaptionText style={{ color: "#6B7280", fontSize: 10 }}>
        {label}
      </CaptionText>
    </View>
  );

  const SimpleChart = ({ data }) => {
    const maxPrice = Math.max(...data.map(d => d.price));
    const minPrice = Math.min(...data.map(d => d.price));
    const priceRange = maxPrice - minPrice;
    const chartHeight = 150;

    return (
      <View
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
          <HeaderText style={{ fontSize: 18 }}>Price Chart</HeaderText>
          <View style={{ flexDirection: "row" }}>
            <TimeframeButton timeframe="1D" active={selectedTimeframe === "1D"} />
            <TimeframeButton timeframe="1W" active={selectedTimeframe === "1W"} />
            <TimeframeButton timeframe="1M" active={selectedTimeframe === "1M"} />
          </View>
        </View>

        <View style={{ height: chartHeight, flexDirection: "row", alignItems: "flex-end" }}>
          {data.map((point, index) => {
            const heightPercent = priceRange > 0 ? ((point.price - minPrice) / priceRange) : 0.5;
            const barHeight = Math.max(chartHeight * heightPercent, 10);
            
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: barHeight,
                  backgroundColor: "#F7B500",
                  marginHorizontal: 2,
                  borderRadius: 2,
                }}
              />
            );
          })}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <CaptionText style={{ color: "#6B7280" }}>{data[0]?.time}</CaptionText>
          <CaptionText style={{ color: "#6B7280" }}>{data[data.length - 1]?.time}</CaptionText>
        </View>
      </View>
    );
  };

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

  const changePercent = parseFloat(stock.change_percent || 0);
  const isPositive = changePercent >= 0;

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
              {stock.ticker}
            </HeaderText>
            <CaptionText style={{ color: "#6B7280" }}>
              {stock.name}
            </CaptionText>
          </View>
        </View>

        {/* Current Price */}
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
              <NumberText style={{ fontSize: 32, marginBottom: 8 }}>
                KES {parseFloat(stock.current_price).toFixed(2)}
              </NumberText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isPositive ? (
                  <ArrowUpRight size={16} color="#A6D49F" />
                ) : (
                  <ArrowDownRight size={16} color="#EF4444" />
                )}
                <BodyText
                  style={{
                    color: isPositive ? "#A6D49F" : "#EF4444",
                    marginLeft: 4,
                    fontSize: 16,
                  }}
                >
                  {changePercent > 0 ? "+" : ""}{changePercent.toFixed(1)}% today
                </BodyText>
              </View>
            </View>

            {portfolio && (
              <View style={{ alignItems: "flex-end" }}>
                <CaptionText style={{ color: "#6B7280" }}>YOUR POSITION</CaptionText>
                <NumberText style={{ fontSize: 18 }}>
                  {parseFloat(portfolio.shares_owned).toFixed(4)}
                </NumberText>
                <CaptionText style={{ color: "#6B7280" }}>shares</CaptionText>
              </View>
            )}
          </View>
        </View>

        {/* Price Chart */}
        <View style={{ paddingHorizontal: 20 }}>
          <SimpleChart data={mockPriceHistory} />
        </View>

        {/* Key Statistics */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
            Key Statistics
          </HeaderText>
          
          <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
            <StatCard
              label="PREV CLOSE"
              value={`KES ${parseFloat(stock.previous_close).toFixed(2)}`}
              icon={Calendar}
            />
            <StatCard
              label="MARKET CAP"
              value={stock.market_cap ? `${(stock.market_cap / 1000000).toFixed(0)}M` : "N/A"}
              icon={Building}
              color="#F7B500"
            />
          </View>

          <View style={{ flexDirection: "row", marginHorizontal: -6, marginTop: 12 }}>
            <StatCard
              label="P/E RATIO"
              value={stock.pe_ratio ? parseFloat(stock.pe_ratio).toFixed(1) : "N/A"}
              icon={BarChart3}
            />
            <StatCard
              label="DIVIDEND YIELD"
              value={stock.dividend_yield ? `${parseFloat(stock.dividend_yield).toFixed(2)}%` : "N/A"}
              icon={DollarSign}
              color="#A6D49F"
            />
          </View>
        </View>

        {/* Company Info */}
        <View
          style={{
            backgroundColor: "#1C1C1C",
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 24,
          }}
        >
          <HeaderText style={{ fontSize: 18, marginBottom: 12 }}>
            Company Information
          </HeaderText>

          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <CaptionText style={{ color: "#6B7280" }}>Sector</CaptionText>
              <BodyText>{stock.sector || "N/A"}</BodyText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <CaptionText style={{ color: "#6B7280" }}>Exchange</CaptionText>
              <BodyText>Nairobi Securities Exchange</BodyText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CaptionText style={{ color: "#6B7280" }}>Currency</CaptionText>
              <BodyText>KES</BodyText>
            </View>
          </View>
        </View>

        {/* Trading Actions */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
            <View style={{ flex: 1, marginHorizontal: 6 }}>
              <PrimaryButton
                title="BUY SHARES"
                onPress={() => router.push(`/trade-shares/${stock.id}`)}
                style={{ backgroundColor: "#A6D49F" }}
              />
            </View>
            
            {portfolio && parseFloat(portfolio.shares_owned) > 0 && (
              <View style={{ flex: 1, marginHorizontal: 6 }}>
                <SecondaryButton
                  title="SELL SHARES"
                  onPress={() => router.push(`/trade-shares/${stock.id}`)}
                  style={{ borderColor: "#EF4444" }}
                  textStyle={{ color: "#EF4444" }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}