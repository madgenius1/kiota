import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Smartphone,
  CreditCard,
  TrendingUp,
  Award,
} from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const menuItems = [
    {
      section: "Account",
      items: [
        {
          icon: User,
          title: "Personal Information",
          subtitle: "Update your details",
          action: "navigate",
          route: "/personal-info",
        },
        {
          icon: Shield,
          title: "Security",
          subtitle: "Password & 2FA",
          action: "navigate",
          route: "/security",
        },
        {
          icon: CreditCard,
          title: "Payment Methods",
          subtitle: "M-Pesa & Bank accounts",
          action: "navigate",
          route: "/payment-methods",
        },
      ],
    },
    {
      section: "Investing",
      items: [
        {
          icon: TrendingUp,
          title: "Investment Preferences",
          subtitle: "Risk tolerance & goals",
          action: "navigate",
          route: "/investment-preferences",
        },
        {
          icon: FileText,
          title: "Tax Documents",
          subtitle: "Download statements",
          action: "navigate",
          route: "/tax-documents",
        },
        {
          icon: Award,
          title: "Referral Program",
          subtitle: "Invite friends & earn",
          action: "navigate",
          route: "/referral",
        },
      ],
    },
    {
      section: "App Settings",
      items: [
        {
          icon: Bell,
          title: "Notifications",
          subtitle: "Market alerts & updates",
          action: "toggle",
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: Smartphone,
          title: "App Preferences",
          subtitle: "Language & display",
          action: "navigate",
          route: "/app-preferences",
        },
      ],
    },
    {
      section: "Support",
      items: [
        {
          icon: HelpCircle,
          title: "Help Center",
          subtitle: "FAQs & support",
          action: "navigate",
          route: "/help",
        },
        {
          icon: FileText,
          title: "Terms & Privacy",
          subtitle: "Legal documents",
          action: "navigate",
          route: "/terms",
        },
      ],
    },
  ];

  const handleMenuItemPress = (item) => {
    if (item.action === "navigate" && item.route) {
      router.push(item.route);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FDF8" }}>
      <StatusBar style="dark" />

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
              Your Profile
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: "bold",
                marginTop: 4,
              }}
            >
              Account Settings
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 12,
            }}
          >
            <Settings color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#2D5016",
                borderRadius: 30,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold" }}
              >
                JM
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#1F2937" }}
              >
                John Mwangi
              </Text>
              <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 2 }}>
                john.mwangi@email.com
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                Member since January 2024
              </Text>
            </View>
            <TouchableOpacity>
              <ChevronRight color="#6B7280" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                flex: 1,
                marginRight: 8,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#2D5016" }}
              >
                3
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                Stocks Owned
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                flex: 1,
                marginLeft: 8,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#059669" }}
              >
                +4.8%
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                Total Return
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          {menuItems.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 32 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#1F2937",
                  marginBottom: 12,
                  marginLeft: 4,
                }}
              >
                {section.section}
              </Text>

              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={() => handleMenuItemPress(item)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                      borderBottomWidth:
                        itemIndex < section.items.length - 1 ? 1 : 0,
                      borderBottomColor: "#F3F4F6",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#F3F4F6",
                        borderRadius: 8,
                        padding: 8,
                        marginRight: 12,
                      }}
                    >
                      <item.icon color="#6B7280" size={20} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1F2937",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}
                      >
                        {item.subtitle}
                      </Text>
                    </View>

                    {item.action === "toggle" ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: "#E5E7EB", true: "#2D5016" }}
                        thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
                      />
                    ) : (
                      <ChevronRight color="#6B7280" size={20} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1F2937",
                marginBottom: 4,
              }}
            >
              Kiota - Investing Made Simple
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>
              Version 1.0.0 • Built with ❤️ for Kenya
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#FEE2E2",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <LogOut color="#DC2626" size={20} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#DC2626",
                marginLeft: 8,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
