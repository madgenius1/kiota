import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function StocksScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Mock user holdings to determine if they own shares
  const userHoldings = {
    'SCOM': 12,
    'EQTY': 3,
    'KCB': 8
  };

  const stocks = [
    { 
      name: 'Safaricom', 
      symbol: 'SCOM', 
      price: 'KES 15.50', 
      change: '+2.3%', 
      changeValue: '+0.35',
      positive: true,
      category: 'Telecom',
      description: 'Leading telecommunications company',
      marketCap: 'KES 622B'
    },
    { 
      name: 'Equity Bank', 
      symbol: 'EQTY', 
      price: 'KES 52.75', 
      change: '+1.8%', 
      changeValue: '+0.93',
      positive: true,
      category: 'Banking',
      description: 'Pan-African financial services',
      marketCap: 'KES 200B'
    },
    { 
      name: 'KCB Group', 
      symbol: 'KCB', 
      price: 'KES 14.25', 
      change: '-0.5%', 
      changeValue: '-0.07',
      positive: false,
      category: 'Banking',
      description: 'Commercial banking services',
      marketCap: 'KES 150B'
    },
    { 
      name: 'Co-operative Bank', 
      symbol: 'COOP', 
      price: 'KES 12.80', 
      change: '+0.8%', 
      changeValue: '+0.10',
      positive: true,
      category: 'Banking',
      description: 'Cooperative financial services',
      marketCap: 'KES 51B'
    },
    { 
      name: 'NCBA Group', 
      symbol: 'NCBA', 
      price: 'KES 28.50', 
      change: '+1.2%', 
      changeValue: '+0.34',
      positive: true,
      category: 'Banking',
      description: 'Commercial banking and financial services',
      marketCap: 'KES 85B'
    },
    { 
      name: 'East African Breweries', 
      symbol: 'EABL', 
      price: 'KES 145.00', 
      change: '+3.2%', 
      changeValue: '+4.50',
      positive: true,
      category: 'Manufacturing',
      description: 'Alcoholic beverages manufacturer',
      marketCap: 'KES 340B'
    },
    { 
      name: 'Kenya Power', 
      symbol: 'KPLC', 
      price: 'KES 2.85', 
      change: '+1.1%', 
      changeValue: '+0.03',
      positive: true,
      category: 'Energy',
      description: 'Electricity transmission & distribution',
      marketCap: 'KES 57B'
    },
    { 
      name: 'Nation Media Group', 
      symbol: 'NMG', 
      price: 'KES 18.75', 
      change: '-1.8%', 
      changeValue: '-0.34',
      positive: false,
      category: 'Media',
      description: 'Media and publishing company',
      marketCap: 'KES 19B'
    }
  ];

  const hasShares = (symbol) => {
    return userHoldings[symbol] && userHoldings[symbol] > 0;
  };

  const handleStockPress = (stock) => {
    router.push({
      pathname: '/trade-shares',
      params: { 
        stockData: JSON.stringify(stock),
        userShares: userHoldings[stock.symbol] || 0
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FDF8' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 20, 
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <ArrowLeft color="#1F2937" size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', flex: 1 }}>
            All Stocks
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <Search color="#6B7280" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Filter color="#6B7280" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={{ fontSize: 14, color: '#6B7280' }}>
          {stocks.length} stocks available • NSE Listed
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stock List */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {stocks.map((stock, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleStockPress(stock)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {stock.name}
                    </Text>
                    {hasShares(stock.symbol) && (
                      <View style={{
                        backgroundColor: '#D1FAE5',
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        marginLeft: 8
                      }}>
                        <Text style={{ fontSize: 10, color: '#059669', fontWeight: '600' }}>
                          OWNED
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>
                    {stock.symbol} • {stock.category}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    {stock.description}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#9CA3AF' }}>
                    Market Cap: {stock.marketCap}
                  </Text>
                </View>
                
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                    {stock.price}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    {stock.positive ? 
                      <TrendingUp color="#059669" size={12} /> : 
                      <TrendingDown color="#DC2626" size={12} />
                    }
                    <Text style={{ 
                      fontSize: 12, 
                      color: stock.positive ? '#059669' : '#DC2626',
                      marginLeft: 4,
                      fontWeight: '600'
                    }}>
                      {stock.change}
                    </Text>
                  </View>
                  <Text style={{ 
                    fontSize: 10, 
                    color: stock.positive ? '#059669' : '#DC2626',
                    marginTop: 2
                  }}>
                    {stock.changeValue}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                onPress={() => handleStockPress(stock)}
                style={{
                  backgroundColor: hasShares(stock.symbol) ? '#F59E0B' : '#2D5016',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginTop: 16
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
                  {hasShares(stock.symbol) ? 'Sell Shares' : 'Buy Shares'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Market Info */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <View style={{
            backgroundColor: '#EEF2FF',
            borderRadius: 12,
            padding: 16
          }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#4338CA', marginBottom: 4 }}>
              📊 Market Information
            </Text>
            <Text style={{ fontSize: 12, color: '#4338CA', opacity: 0.8 }}>
              Prices update every 15 minutes during market hours (9:00 AM - 3:00 PM EAT). 
              All stocks listed on the Nairobi Securities Exchange.
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}