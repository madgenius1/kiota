import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText, NumberText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton, IconButton } from "@/components/Button";

export default function StocksScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch stocks data
  const { data: stocksData, isLoading, refetch } = useQuery({
    queryKey: ['stocks', searchQuery, selectedFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedFilter !== 'all') params.append('filter', selectedFilter);
      
      const response = await fetch(`/api/stocks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch stocks');
      return response.json();
    },
  });

  const stocks = stocksData?.stocks || [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const StockCard = ({ stock }) => {
    const changePercent = parseFloat(stock.change_percent || 0);
    const isPositive = changePercent >= 0;

    return (
      <TouchableOpacity
        onPress={() => router.push(`/stock-details/${stock.id}`)}
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 8 }}>
            <BodyText style={{ fontSize: 16, marginBottom: 2 }}>
              {stock.name}
            </BodyText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CaptionText style={{ color: "#6B7280" }}>
                {stock.ticker}
              </CaptionText>
              {stock.sector && (
                <>
                  <CaptionText style={{ color: "#6B7280", marginHorizontal: 8 }}>
                    •
                  </CaptionText>
                  <CaptionText style={{ color: "#6B7280" }}>
                    {stock.sector}
                  </CaptionText>
                </>
              )}
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <NumberText style={{ fontSize: 18 }}>
              KES {parseFloat(stock.current_price).toFixed(2)}
            </NumberText>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {isPositive ? (
                <TrendingUp size={16} color="#A6D49F" />
              ) : (
                <TrendingDown size={16} color="#EF4444" />
              )}
              <BodyText
                style={{
                  fontSize: 14,
                  color: isPositive ? "#A6D49F" : "#EF4444",
                  marginLeft: 4,
                }}
              >
                {changePercent > 0 ? "+" : ""}{changePercent.toFixed(1)}%
              </BodyText>
            </View>
          </View>

          {stock.market_cap && (
            <CaptionText style={{ color: "#6B7280", marginTop: 4 }}>
              Market Cap: KES {(stock.market_cap / 1000000).toFixed(0)}M
            </CaptionText>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/trade-shares/${stock.id}`)}
          style={{
            backgroundColor: "#F7B500",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginLeft: 12,
          }}
          activeOpacity={0.8}
        >
          <BodyText style={{ color: "#1C1C1C", fontSize: 12, fontWeight: "600" }}>
            TRADE
          </BodyText>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const FilterButton = ({ title, value, active }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(value)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: active ? "#F7B500" : "#1C1C1C",
        marginRight: 12,
        minWidth: 80,
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
        {title}
      </CaptionText>
    </TouchableOpacity>
  );

  const MarketSummary = () => {
    const gainers = stocks.filter(s => parseFloat(s.change_percent || 0) > 0).length;
    const losers = stocks.filter(s => parseFloat(s.change_percent || 0) < 0).length;
    
    return (
      <View
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
          Market Summary
        </HeaderText>
        
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <NumberText style={{ fontSize: 20, color: "#A6D49F" }}>
              {gainers}
            </NumberText>
            <CaptionText style={{ color: "#6B7280" }}>GAINERS</CaptionText>
          </View>
          
          <View style={{ alignItems: "center" }}>
            <NumberText style={{ fontSize: 20, color: "#EF4444" }}>
              {losers}
            </NumberText>
            <CaptionText style={{ color: "#6B7280" }}>LOSERS</CaptionText>
          </View>
          
          <View style={{ alignItems: "center" }}>
            <NumberText style={{ fontSize: 20 }}>
              {stocks.length}
            </NumberText>
            <CaptionText style={{ color: "#6B7280" }}>TOTAL</CaptionText>
          </View>
        </View>
      </View>
    );
  };

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
            <HeaderText style={{ fontSize: 24 }}>
              All Stocks
            </HeaderText>
            <CaptionText style={{ color: "#6B7280" }}>
              Nairobi Securities Exchange
            </CaptionText>
          </View>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
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
              placeholder="Search stocks or companies..."
              placeholderTextColor="#6B7280"
              style={{
                flex: 1,
                color: "#FFFFFF",
                fontSize: 16,
              }}
            />
          </View>
        </View>

        {/* Market Summary */}
        {!searchQuery && (
          <View style={{ paddingHorizontal: 20 }}>
            <MarketSummary />
          </View>
        )}

        {/* Filters */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            <FilterButton
              title="ALL"
              value="all"
              active={selectedFilter === "all"}
            />
            <FilterButton
              title="GAINERS"
              value="top_gainers"
              active={selectedFilter === "top_gainers"}
            />
            <FilterButton
              title="LOSERS"
              value="top_losers"
              active={selectedFilter === "top_losers"}
            />
            <FilterButton
              title="BANKING"
              value="banking"
              active={selectedFilter === "banking"}
            />
            <FilterButton
              title="TELECOM"
              value="telecom"
              active={selectedFilter === "telecom"}
            />
            <FilterButton
              title="DIVIDEND"
              value="dividend_stocks"
              active={selectedFilter === "dividend_stocks"}
            />
          </ScrollView>
        </View>

        {/* Stocks List */}
        <View style={{ paddingHorizontal: 20 }}>
          {isLoading ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <CaptionText style={{ color: "#6B7280" }}>
                Loading stocks...
              </CaptionText>
            </View>
          ) : stocks.length === 0 ? (
            <View style={{ padding: 40, alignItems: "center" }}>
              <CaptionText style={{ color: "#6B7280", textAlign: "center" }}>
                {searchQuery 
                  ? "No stocks found matching your search" 
                  : "No stocks available"
                }
              </CaptionText>
            </View>
          ) : (
            <>
              {stocks.map((stock) => (
                <StockCard key={stock.id} stock={stock} />
              ))}
              
              {stocks.length > 0 && (
                <View style={{ paddingVertical: 20, alignItems: "center" }}>
                  <CaptionText style={{ color: "#6B7280" }}>
                    Showing {stocks.length} stocks
                  </CaptionText>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}