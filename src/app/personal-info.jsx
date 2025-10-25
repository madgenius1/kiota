import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function PersonalInfoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    firstName: 'John',
    lastName: 'Mwangi',
    email: 'john.mwangi@email.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    dateOfBirth: '15/03/1990'
  });

  const handleSave = () => {
    // Handle save logic here
    router.back();
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginRight: 16 }}
            >
              <ArrowLeft color="#1F2937" size={24} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', flex: 1 }}>
              Personal Information
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={{ color: '#2D5016', fontSize: 16, fontWeight: '600' }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            {/* Profile Picture */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <View style={{
                backgroundColor: '#2D5016',
                borderRadius: 50,
                width: 100,
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: 'bold' }}>
                  JM
                </Text>
              </View>
              <TouchableOpacity style={{
                backgroundColor: '#2D5016',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20
              }}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={{ gap: 20 }}>
              {/* First Name */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  First Name
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <User color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({...formData, firstName: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="Enter first name"
                  />
                </View>
              </View>

              {/* Last Name */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Last Name
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <User color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({...formData, lastName: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="Enter last name"
                  />
                </View>
              </View>

              {/* Email */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Email Address
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <Mail color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.email}
                    onChangeText={(text) => setFormData({...formData, email: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Phone */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Phone Number
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <Phone color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.phone}
                    onChangeText={(text) => setFormData({...formData, phone: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Location */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Location
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <MapPin color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.location}
                    onChangeText={(text) => setFormData({...formData, location: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="Enter location"
                  />
                </View>
              </View>

              {/* Date of Birth */}
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>
                  Date of Birth
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }}>
                  <Calendar color="#6B7280" size={20} style={{ marginRight: 12 }} />
                  <TextInput
                    value={formData.dateOfBirth}
                    onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
                    style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                    placeholder="DD/MM/YYYY"
                  />
                </View>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              style={{
                backgroundColor: '#2D5016',
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                marginTop: 32
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}