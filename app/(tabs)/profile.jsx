import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  User,
  Edit,
  ArrowRight,
  Star,
  Award,
  Target,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText } from "@/components/Typography";
import { SecondaryButton, IconButton } from "@/components/Button";

const profileStats = [
  {
    label: "Portfolio Value",
    value: "KES 34,251",
    color: "#F7B500",
  },
  {
    label: "Total Gains",
    value: "+12.3%",
    color: "#A6D49F",
  },
  {
    label: "Courses Completed",
    value: "1/4",
    color: "#8B5CF6",
  },
];

const menuSections = [
  {
    title: "Account",
    items: [
      {
        id: "edit_profile",
        title: "Edit Profile",
        description: "Update your personal information",
        icon: Edit,
        action: "navigate",
        route: "/edit-profile",
      },
      {
        id: "notifications",
        title: "Notifications",
        description: "Manage your notification preferences",
        icon: Bell,
        action: "navigate",
        route: "/notifications",
      },
      {
        id: "security",
        title: "Security & Privacy",
        description: "Password, 2FA, and privacy settings",
        icon: Shield,
        action: "navigate",
        route: "/security",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "help",
        title: "Help & Support",
        description: "Get help or contact support",
        icon: HelpCircle,
        action: "navigate",
        route: "/help",
      },
      {
        id: "feedback",
        title: "Send Feedback",
        description: "Help us improve Kiota",
        icon: Star,
        action: "feedback",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        id: "terms",
        title: "Terms of Service",
        description: "Read our terms and conditions",
        icon: Shield,
        action: "navigate",
        route: "/terms",
      },
      {
        id: "privacy",
        title: "Privacy Policy",
        description: "How we handle your data",
        icon: Shield,
        action: "navigate",
        route: "/privacy",
      },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 712 345 678",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    memberSince: "October 2025",
  };

  const handleMenuAction = (item) => {
    switch (item.action) {
      case "navigate":
        if (item.route) {
          router.push(item.route);
        }
        break;
      case "feedback":
        Alert.alert(
          "Send Feedback",
          "Thank you for your feedback! We're always working to improve Kiota.",
          [{ text: "OK" }],
        );
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => router.replace("/onboarding"),
      },
    ]);
  };

  const StatCard = ({ stat }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginHorizontal: 4,
      }}
    >
      <HeaderText
        style={{
          fontSize: 20,
          color: stat.color,
          marginBottom: 4,
        }}
      >
        {stat.value}
      </HeaderText>
      <CaptionText
        style={{
          color: "#6B7280",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {stat.label}
      </CaptionText>
    </View>
  );

  const MenuItem = ({ item }) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        onPress={() => handleMenuAction(item)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: "#1C1C1C",
          borderRadius: 12,
          marginBottom: 8,
        }}
        activeOpacity={0.7}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#2A2A2A",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <IconComponent size={20} color="#F7B500" />
        </View>

        <View style={{ flex: 1 }}>
          <BodyText style={{ marginBottom: 4 }}>{item.title}</BodyText>
          <CaptionText style={{ color: "#6B7280" }}>
            {item.description}
          </CaptionText>
        </View>

        <ArrowRight size={16} color="#6B7280" />
      </TouchableOpacity>
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
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <HeaderText style={{ fontSize: 24 }}>Profile</HeaderText>

          <IconButton>
            <Settings size={24} color="#F7B500" />
          </IconButton>
        </View>

        {/* User Info Card */}
        <View
          style={{
            backgroundColor: "#1C1C1C",
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#2A2A2A",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                overflow: "hidden",
              }}
            >
              {user.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                />
              ) : (
                <User size={32} color="#F7B500" />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <HeaderText style={{ fontSize: 20, marginBottom: 4 }}>
                {user.name}
              </HeaderText>
              <BodyText style={{ color: "#9CA3AF", marginBottom: 2 }}>
                {user.email}
              </BodyText>
              <CaptionText style={{ color: "#6B7280" }}>
                Member since {user.memberSince}
              </CaptionText>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/edit-profile")}
              style={{
                backgroundColor: "#F7B500",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
              activeOpacity={0.8}
            >
              <CaptionText
                style={{
                  color: "#1C1C1C",
                  fontSize: 12,
                }}
              >
                EDIT
              </CaptionText>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: -4,
            }}
          >
            {profileStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </View>
        </View>

        {/* Menu Sections */}
        <View style={{ paddingHorizontal: 20 }}>
          {menuSections.map((section, sectionIndex) => (
            <View key={section.title} style={{ marginBottom: 32 }}>
              <HeaderText
                style={{
                  fontSize: 18,
                  marginBottom: 16,
                }}
              >
                {section.title}
              </HeaderText>

              {section.items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          ))}

          {/* Logout Button */}
          <SecondaryButton
            title="SIGN OUT"
            onPress={handleLogout}
            style={{
              borderColor: "#EF4444",
              marginTop: 20,
            }}
            textStyle={{ color: "#EF4444" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogOut size={16} color="#EF4444" style={{ marginRight: 8 }} />
              <BodyText style={{ color: "#EF4444", fontWeight: "600" }}>
                SIGN OUT
              </BodyText>
            </View>
          </SecondaryButton>
        </View>
      </ScrollView>
    </View>
  );
}
