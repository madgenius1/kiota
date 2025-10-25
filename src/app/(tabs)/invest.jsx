import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

export default function InvestScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", "Banking", "Telecom", "Manufacturing", "Energy"];

  // Mock user holdings to determine if they own shares
  const userHoldings = {
    SCOM: 12,
    EQTY: 3,
    KCB: 8,
  };

  const stocks = [
    {
      name: "Safaricom",
      symbol: "SCOM",
      price: "KES 15.50",
      change: "+2.3%",
      changeValue: "+0.35",
      positive: true,
      category: "Telecom",
      description: "Leading telecommunications company",
      minInvestment: "KES 16",
    },
    {
      name: "Equity Bank",
      symbol: "EQTY",
      price: "KES 52.75",
      change: "+1.8%",
      changeValue: "+0.93",
      positive: true,
      category: "Banking",
      description: "Pan-African financial services",
      minInvestment: "KES 53",
    },
    {
      name: "KCB Group",
      symbol: "KCB",
      price: "KES 14.25",
      change: "-0.5%",
      changeValue: "-0.07",
      positive: false,
      category: "Banking",
      description: "Commercial banking services",
      minInvestment: "KES 15",
    },
    {
      name: "East African Breweries",
      symbol: "EABL",
      price: "KES 145.00",
      change: "+3.2%",
      changeValue: "+4.50",
      positive: true,
      category: "Manufacturing",
      description: "Alcoholic beverages manufacturer",
      minInvestment: "KES 145",
    },
    {
      name: "Kenya Power",
      symbol: "KPLC",
      price: "KES 2.85",
      change: "+1.1%",
      changeValue: "+0.03",
      positive: true,
      category: "Energy",
      description: "Electricity transmission & distribution",
      minInvestment: "KES 3",
    },
    {
      name: "Co-operative Bank",
      symbol: "COOP",
      price: "KES 12.80",
      change: "+0.8%",
      changeValue: "+0.10",
      positive: true,
      category: "Banking",
      description: "Cooperative financial services",
      minInvestment: "KES 13",
    },
    {
      name: "NCBA Group",
      symbol: "NCBA",
      price: "KES 28.50",
      change: "+1.2%",
      changeValue: "+0.34",
      positive: true,
      category: "Banking",
      description: "Commercial banking and financial services",
      minInvestment: "KES 29",
    },
    {
      name: "Nation Media Group",
      symbol: "NMG",
      price: "KES 18.75",
      change: "-1.8%",
      changeValue: "-0.34",
      positive: false,
      category: "Media",
      description: "Media and publishing company",
      minInvestment: "KES 19",
    },
  ];

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || stock.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasShares = (symbol) => {
    return userHoldings[symbol] && userHoldings[symbol] > 0;
  };

  const handleTradeShares = (stock) => {
    router.push({
      pathname: "/trade-shares",
      params: {
        stockData: JSON.stringify(stock),
        userShares: userHoldings[stock.symbol] || 0,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FDF8" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#1F2937",
            marginBottom: 16,
          }}
        >
          Invest in Kenya
        </Text>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 12,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Search color="#6B7280" size={20} style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Search stocks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, fontSize: 16, color: "#1F2937" }}
            placeholderTextColor="#6B7280"
          />
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Filter color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(category)}
              style={{
                backgroundColor:
                  selectedCategory === category ? "#2D5016" : "#FFFFFF",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 12,
                borderWidth: 1,
                borderColor:
                  selectedCategory === category ? "#2D5016" : "#E5E7EB",
              }}
            >
              <Text
                style={{
                  color: selectedCategory === category ? "#FFFFFF" : "#6B7280",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Investment Themes */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Investment Themes
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0, marginBottom: 24 }}
          >
            {[
              {
                title: "Top Kenyan Brands",
                subtitle: "5 companies",
                color: "#2D5016",
              },
              {
                title: "Banking Giants",
                subtitle: "3 companies",
                color: "#059669",
              },
              {
                title: "Future of Tech",
                subtitle: "4 companies",
                color: "#7C3AED",
              },
            ].map((theme, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: theme.color,
                  borderRadius: 12,
                  padding: 16,
                  marginRight: 12,
                  width: 160,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
                >
                  {theme.title}
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    opacity: 0.8,
                    marginTop: 4,
                  }}
                >
                  {theme.subtitle}
                </Text>
                <ArrowUpRight
                  color="#FFFFFF"
                  size={16}
                  style={{ alignSelf: "flex-end", marginTop: 8 }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stock List */}
        <View style={{ paddingHorizontal: 20 }}>
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
              All Stocks ({filteredStocks.length})
            </Text>
            <TouchableOpacity onPress={() => router.push("/stocks")}>
              <Text
                style={{ color: "#2D5016", fontSize: 14, fontWeight: "600" }}
              >
                More Stocks
              </Text>
            </TouchableOpacity>
          </View>

          {filteredStocks.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1F2937",
                      }}
                    >
                      {stock.name}
                    </Text>
                    <TouchableOpacity style={{ marginLeft: 8 }}>
                      <Star color="#D1D5DB" size={16} />
                    </TouchableOpacity>
                    {hasShares(stock.symbol) && (
                      <View
                        style={{
                          backgroundColor: "#D1FAE5",
                          borderRadius: 8,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          marginLeft: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#059669",
                            fontWeight: "600",
                          }}
                        >
                          OWNED
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}
                  >
                    {stock.symbol} • {stock.category}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}
                  >
                    {stock.description}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>
                      Min. investment:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#2D5016",
                        fontWeight: "600",
                        marginLeft: 4,
                      }}
                    >
                      {stock.minInvestment}
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#1F2937",
                    }}
                  >
                    {stock.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    {stock.positive ? (
                      <TrendingUp color="#059669" size={12} />
                    ) : (
                      <TrendingDown color="#DC2626" size={12} />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        color: stock.positive ? "#059669" : "#DC2626",
                        marginLeft: 4,
                        fontWeight: "600",
                      }}
                    >
                      {stock.change}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: stock.positive ? "#059669" : "#DC2626",
                      marginTop: 2,
                    }}
                  >
                    {stock.changeValue}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleTradeShares(stock)}
                style={{
                  backgroundColor: "#2D5016",
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}
                >
                  Trade Shares
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
