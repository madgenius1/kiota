import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

const { width } = Dimensions.get("window");

const investmentThemes = [
  {
    id: "kenyan_brands",
    title: "Top Kenyan Brands",
    description: "Invest in companies you know and trust",
    icon: Shield,
    color: "#F7B500",
    stocks: ["SCOM", "EQTY", "KCB", "EABL"],
  },
  {
    id: "dividend_growers",
    title: "Dividend Growers",
    description: "Steady income from dividend-paying stocks",
    icon: TrendingUp,
    color: "#A6D49F",
    stocks: ["KCB", "COOP", "BAT", "DTBK"],
  },
  {
    id: "rising_tech",
    title: "Rising Tech",
    description: "Technology and innovation leaders",
    icon: Zap,
    color: "#8B5CF6",
    stocks: ["SCOM"],
  },
];

export default function InvestScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Fetch stocks data
  const { data: stocksData, isLoading } = useQuery({
    queryKey: ['stocks', searchQuery, selectedFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedFilter !== 'all') params.append('filter', selectedFilter);
      params.append('limit', '6');
      
      const response = await fetch(`/api/stocks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch stocks');
      return response.json();
    },
  });

  const stocks = stocksData?.stocks || [];

  const ThemeCard = ({ theme }) => {
    const IconComponent = theme.icon;
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 16,
          padding: 20,
          marginRight: 16,
          width: width * 0.75,
          borderWidth: 1,
          borderColor: theme.color + "20",
        }}
        activeOpacity={0.8}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.color + "20",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <IconComponent size={20} color={theme.color} />
          </View>
          
          <View style={{ flex: 1 }}>
            <BodyText style={{ fontSize: 16, marginBottom: 4 }}>
              {theme.title}
            </BodyText>
            <CaptionText style={{ color: "#6B7280" }}>
              {theme.stocks.length} stocks
            </CaptionText>
          </View>
        </View>

        <BodyText
          style={{
            color: "#9CA3AF",
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
          }}
        >
          {theme.description}
        </BodyText>

        <SecondaryButton
          title="EXPLORE THEME"
          textStyle={{ fontSize: 12 }}
          style={{ paddingVertical: 12 }}
        />
      </TouchableOpacity>
    );
  };

  const StockCard = ({ stock }) => (
    <TouchableOpacity
      onPress={() => router.push(`/stock-details/${stock.id}`)}
      style={{
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 8 }}>
            <BodyText style={{ fontSize: 16, marginBottom: 4 }}>
              {stock.name}
            </BodyText>
            <CaptionText style={{ color: "#6B7280" }}>
              {stock.ticker} • {stock.sector}
            </CaptionText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NumberText style={{ fontSize: 18 }}>
              KES {parseFloat(stock.current_price).toFixed(2)}
            </NumberText>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {parseFloat(stock.change_percent) >= 0 ? (
                <ArrowUpRight size={16} color="#A6D49F" />
              ) : (
                <ArrowDownRight size={16} color="#EF4444" />
              )}
              <BodyText
                style={{
                  fontSize: 14,
                  color: parseFloat(stock.change_percent) >= 0 ? "#A6D49F" : "#EF4444",
                  marginLeft: 4,
                }}
              >
                {parseFloat(stock.change_percent) > 0 ? "+" : ""}{parseFloat(stock.change_percent).toFixed(1)}%
              </BodyText>
            </View>
          </View>
        </View>

        <PrimaryButton
          title="TRADE"
          onPress={() => router.push(`/trade-shares/${stock.id}`)}
          style={{ paddingHorizontal: 16, paddingVertical: 8, marginLeft: 16 }}
          textStyle={{ fontSize: 12 }}
        />
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, value, active }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(value)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: active ? "#F7B500" : "#1C1C1C",
        marginRight: 12,
      }}
      activeOpacity={0.8}
    >
      <CaptionText
        style={{
          color: active ? "#1C1C1C" : "#9CA3AF",
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
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <HeaderText style={{ fontSize: 24, marginBottom: 8 }}>
            Invest & Trade
          </HeaderText>
          <CaptionText style={{ color: "#6B7280" }}>
            Build your portfolio with Kenya's top companies
          </CaptionText>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#1C1C1C",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Search size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search stocks..."
              placeholderTextColor="#6B7280"
              style={{
                flex: 1,
                color: "#FFFFFF",
                fontSize: 16,
              }}
            />
          </View>
        </View>

        {/* Investment Themes */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <HeaderText style={{ fontSize: 18 }}>
              Investment Themes
            </HeaderText>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {investmentThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </ScrollView>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <FilterButton
              title="ALL STOCKS"
              value="all"
              active={selectedFilter === "all"}
            />
            <FilterButton
              title="TOP GAINERS"
              value="top_gainers"
              active={selectedFilter === "top_gainers"}
            />
            <FilterButton
              title="TOP LOSERS"
              value="top_losers"
              active={selectedFilter === "top_losers"}
            />
            <FilterButton
              title="DIVIDEND STOCKS"
              value="dividend_stocks"
              active={selectedFilter === "dividend_stocks"}
            />
          </ScrollView>
        </View>

        {/* Featured Stocks */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <HeaderText style={{ fontSize: 18 }}>
              Featured Stocks
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

          {isLoading ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <CaptionText style={{ color: "#6B7280" }}>
                Loading stocks...
              </CaptionText>
            </View>
          ) : (
            stocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}