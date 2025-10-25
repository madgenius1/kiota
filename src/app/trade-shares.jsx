import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, TrendingDown, Plus, Minus, DollarSign } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function TradeSharesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [activeTab, setActiveTab] = React.useState('buy');
  const [shares, setShares] = React.useState('1');
  const [investmentAmount, setInvestmentAmount] = React.useState('');

  // Parse stock data from params
  const stockData = params.stockData ? JSON.parse(params.stockData) : {};
  const userShares = parseInt(params.userShares) || 0;
  
  // Extract price number for calculations
  const stockPrice = parseFloat(stockData.price?.replace('KES ', '') || '0');
  const sharesNumber = parseInt(shares) || 0;
  const totalValue = stockPrice * sharesNumber;

  // Set initial tab based on whether user owns shares
  React.useEffect(() => {
    if (userShares > 0) {
      setActiveTab('sell');
    }
  }, [userShares]);

  const handleSharesChange = (value) => {
    const numValue = parseInt(value) || 0;
    if (activeTab === 'sell' && numValue > userShares) {
      Alert.alert('Error', `You only own ${userShares} shares of ${stockData.symbol}`);
      return;
    }
    setShares(value);
    setInvestmentAmount((stockPrice * numValue).toFixed(2));
  };

  const handleAmountChange = (value) => {
    const numValue = parseFloat(value) || 0;
    const calculatedShares = Math.floor(numValue / stockPrice);
    
    if (activeTab === 'sell' && calculatedShares > userShares) {
      Alert.alert('Error', `You only own ${userShares} shares of ${stockData.symbol}`);
      return;
    }
    
    setInvestmentAmount(value);
    setShares(calculatedShares.toString());
  };

  const handleTrade = () => {
    const action = activeTab === 'buy' ? 'buy' : 'sell';
    const sharesCount = parseInt(shares) || 0;
    
    if (sharesCount === 0) {
      Alert.alert('Error', 'Please enter a valid number of shares');
      return;
    }

    if (activeTab === 'sell' && sharesCount > userShares) {
      Alert.alert('Error', `You only own ${userShares} shares`);
      return;
    }

    Alert.alert(
      'Confirm Trade',
      `Are you sure you want to ${action} ${sharesCount} share${sharesCount > 1 ? 's' : ''} of ${stockData.name} for KES ${totalValue.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            Alert.alert('Success', `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${sharesCount} share${sharesCount > 1 ? 's' : ''} of ${stockData.name}!`);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', flex: 1 }}>
              Trade {stockData.symbol}
            </Text>
          </View>
          
          {/* Stock Info */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
                {stockData.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                {stockData.symbol} • {stockData.category}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>
                {stockData.price}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                {stockData.positive ? 
                  <TrendingUp color="#059669" size={12} /> : 
                  <TrendingDown color="#DC2626" size={12} />
                }
                <Text style={{ 
                  fontSize: 12, 
                  color: stockData.positive ? '#059669' : '#DC2626',
                  marginLeft: 4,
                  fontWeight: '600'
                }}>
                  {stockData.change}
                </Text>
              </View>
            </View>
          </View>

          {userShares > 0 && (
            <View style={{
              backgroundColor: '#D1FAE5',
              borderRadius: 8,
              padding: 12,
              marginTop: 16
            }}>
              <Text style={{ fontSize: 12, color: '#059669', fontWeight: '600' }}>
                You own {userShares} share{userShares > 1 ? 's' : ''} of {stockData.symbol}
              </Text>
            </View>
          )}
        </View>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Buy/Sell Tabs */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <View style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 4,
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2
            }}>
              <TouchableOpacity
                onPress={() => setActiveTab('buy')}
                style={{
                  flex: 1,
                  backgroundColor: activeTab === 'buy' ? '#2D5016' : 'transparent',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: activeTab === 'buy' ? '#FFFFFF' : '#6B7280',
                  fontSize: 16,
                  fontWeight: '600'
                }}>
                  Buy Shares
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setActiveTab('sell')}
                disabled={userShares === 0}
                style={{
                  flex: 1,
                  backgroundColor: activeTab === 'sell' ? '#F59E0B' : 'transparent',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  opacity: userShares === 0 ? 0.5 : 1
                }}
              >
                <Text style={{
                  color: activeTab === 'sell' ? '#FFFFFF' : '#6B7280',
                  fontSize: 16,
                  fontWeight: '600'
                }}>
                  Sell Shares
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Trade Form */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <View style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2
            }}>
              {/* Number of Shares */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Number of Shares
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  padding: 12
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      const newShares = Math.max(0, parseInt(shares) - 1);
                      handleSharesChange(newShares.toString());
                    }}
                    style={{
                      backgroundColor: '#F3F4F6',
                      borderRadius: 6,
                      padding: 8
                    }}
                  >
                    <Minus color="#6B7280" size={16} />
                  </TouchableOpacity>
                  
                  <TextInput
                    value={shares}
                    onChangeText={handleSharesChange}
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1F2937'
                    }}
                  />
                  
                  <TouchableOpacity
                    onPress={() => {
                      const newShares = parseInt(shares) + 1;
                      handleSharesChange(newShares.toString());
                    }}
                    style={{
                      backgroundColor: '#F3F4F6',
                      borderRadius: 6,
                      padding: 8
                    }}
                  >
                    <Plus color="#6B7280" size={16} />
                  </TouchableOpacity>
                </View>
                {activeTab === 'sell' && (
                  <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                    Maximum: {userShares} shares
                  </Text>
                )}
              </View>

              {/* Investment Amount */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  {activeTab === 'buy' ? 'Investment' : 'Sale'} Amount
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 8,
                  padding: 12
                }}>
                  <Text style={{ fontSize: 16, color: '#6B7280', marginRight: 8 }}>KES</Text>
                  <TextInput
                    value={investmentAmount}
                    onChangeText={handleAmountChange}
                    keyboardType="numeric"
                    placeholder="0.00"
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1F2937'
                    }}
                  />
                </View>
              </View>

              {/* Order Summary */}
              <View style={{
                backgroundColor: '#F8FDF8',
                borderRadius: 8,
                padding: 16,
                marginBottom: 24
              }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Order Summary
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Shares:</Text>
                  <Text style={{ fontSize: 12, color: '#1F2937', fontWeight: '600' }}>{shares}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Price per share:</Text>
                  <Text style={{ fontSize: 12, color: '#1F2937', fontWeight: '600' }}>KES {stockPrice.toFixed(2)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>Transaction fee:</Text>
                  <Text style={{ fontSize: 12, color: '#1F2937', fontWeight: '600' }}>KES 2.50</Text>
                </View>
                <View style={{ 
                  borderTopWidth: 1, 
                  borderTopColor: '#E5E7EB', 
                  paddingTop: 8, 
                  marginTop: 8,
                  flexDirection: 'row', 
                  justifyContent: 'space-between' 
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937' }}>Total:</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1F2937' }}>
                    KES {(totalValue + 2.50).toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* Trade Button */}
              <TouchableOpacity
                onPress={handleTrade}
                style={{
                  backgroundColor: activeTab === 'buy' ? '#2D5016' : '#F59E0B',
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {shares} Share{parseInt(shares) !== 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>

              {/* Payment Method */}
              {activeTab === 'buy' && (
                <View style={{ marginTop: 16 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
                    Payment will be processed via M-Pesa
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Market Info */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <View style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 12,
              padding: 16
            }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#92400E', marginBottom: 4 }}>
                💡 Trading Tips
              </Text>
              <Text style={{ fontSize: 11, color: '#92400E', opacity: 0.8 }}>
                {activeTab === 'buy' 
                  ? `Start small and invest only what you can afford to lose. Single share trading allows you to begin with as little as ${stockData.minInvestment}.`
                  : 'Consider the timing of your sale. Market prices fluctuate throughout the day during trading hours.'
                }
              </Text>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}