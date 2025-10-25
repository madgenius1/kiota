import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Eye, EyeOff, Plus, ArrowUpRight, PieChart } from 'lucide-react-native';

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  const [balanceVisible, setBalanceVisible] = React.useState(true);

  const holdings = [
    {
      name: 'Safaricom',
      symbol: 'SCOM',
      shares: 12,
      currentPrice: 'KES 15.50',
      totalValue: 'KES 186.00',
      gainLoss: '+KES 18.60',
      gainLossPercent: '+11.1%',
      positive: true,
      avgBuyPrice: 'KES 13.95'
    },
    {
      name: 'Equity Bank',
      symbol: 'EQTY',
      shares: 3,
      currentPrice: 'KES 52.75',
      totalValue: 'KES 158.25',
      gainLoss: '+KES 8.25',
      gainLossPercent: '+5.5%',
      positive: true,
      avgBuyPrice: 'KES 50.00'
    },
    {
      name: 'KCB Group',
      symbol: 'KCB',
      shares: 8,
      currentPrice: 'KES 14.25',
      totalValue: 'KES 114.00',
      gainLoss: '-KES 6.00',
      gainLossPercent: '-5.0%',
      positive: false,
      avgBuyPrice: 'KES 15.00'
    }
  ];

  const totalPortfolioValue = 458.25;
  const totalGainLoss = 20.85;
  const totalGainLossPercent = 4.8;

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FDF8' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 20, 
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#2D5016'
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 16, opacity: 0.9 }}>Your Portfolio</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>
              Growing Your Nest
            </Text>
          </View>
          <TouchableOpacity style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)', 
            borderRadius: 20, 
            padding: 12 
          }}>
            <PieChart color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Summary Card */}
        <View style={{ 
          marginHorizontal: 20, 
          marginTop: -20, 
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>Total Portfolio Value</Text>
            <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
              {balanceVisible ? 
                <Eye color="#6B7280" size={20} /> : 
                <EyeOff color="#6B7280" size={20} />
              }
            </TouchableOpacity>
          </View>
          
          <Text style={{ 
            color: '#1F2937', 
            fontSize: 32, 
            fontWeight: 'bold',
            marginBottom: 8
          }}>
            {balanceVisible ? `KES ${totalPortfolioValue.toFixed(2)}` : '••••••'}
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TrendingUp color="#059669" size={16} />
            <Text style={{ color: '#059669', fontSize: 16, fontWeight: '600', marginLeft: 4 }}>
              +KES {totalGainLoss.toFixed(2)} (+{totalGainLossPercent}%)
            </Text>
          </View>
          <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }}>
            All time performance
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: '#2D5016',
              borderRadius: 12,
              padding: 16,
              marginRight: 8,
              alignItems: 'center'
            }}>
              <Plus color="#FFFFFF" size={24} />
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginTop: 8 }}>
                Add Money
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginLeft: 8,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB'
            }}>
              <TrendingUp color="#2D5016" size={24} />
              <Text style={{ color: '#2D5016', fontSize: 14, fontWeight: '600', marginTop: 8 }}>
                Buy More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Holdings */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
              Your Holdings ({holdings.length})
            </Text>
            <TouchableOpacity>
              <Text style={{ color: '#2D5016', fontSize: 14, fontWeight: '600' }}>View All</Text>
            </TouchableOpacity>
          </View>

          {holdings.map((holding, index) => (
            <TouchableOpacity key={index} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                    {holding.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    {holding.symbol} • {holding.shares} shares
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                    Avg. buy price: {holding.avgBuyPrice}
                  </Text>
                </View>
                
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>
                    {holding.totalValue}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                    @ {holding.currentPrice}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    {holding.positive ? 
                      <TrendingUp color="#059669" size={12} /> : 
                      <TrendingDown color="#DC2626" size={12} />
                    }
                    <Text style={{ 
                      fontSize: 12, 
                      color: holding.positive ? '#059669' : '#DC2626',
                      marginLeft: 4,
                      fontWeight: '600'
                    }}>
                      {holding.gainLoss}
                    </Text>
                  </View>
                  <Text style={{ 
                    fontSize: 10, 
                    color: holding.positive ? '#059669' : '#DC2626',
                    marginTop: 2
                  }}>
                    {holding.gainLossPercent}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Performance Chart Placeholder */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Performance Overview
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2
          }}>
            <PieChart color="#2D5016" size={48} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginTop: 16 }}>
              Portfolio Breakdown
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4, textAlign: 'center' }}>
              Visual chart showing your investment distribution across different stocks
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Recent Activity
          </Text>
          
          {[
            { action: 'Bought', stock: 'Safaricom', shares: '2 shares', amount: 'KES 31.00', date: 'Today' },
            { action: 'Bought', stock: 'Equity Bank', shares: '1 share', amount: 'KES 52.75', date: 'Yesterday' },
            { action: 'Dividend', stock: 'KCB Group', shares: '', amount: 'KES 4.80', date: '3 days ago' }
          ].map((activity, index) => (
            <View key={index} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937' }}>
                  {activity.action} {activity.stock}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                  {activity.shares} • {activity.date}
                </Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937' }}>
                {activity.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}