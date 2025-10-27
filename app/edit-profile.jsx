import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Animated,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  CreditCard,
  Save,
} from "lucide-react-native";
import {
  HeaderText,
  BodyText,
  CaptionText,
  NumberText,
} from "@/components/Typography";
import {
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from "@/components/Button";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mock user ID - in real app this would come from auth
  const userId = 1;

  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding),
  ).current;

  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
  });

  const user = userData?.user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    national_id: "",
  });

  // Update form data when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        national_id: user.national_id || "",
      });
    }
  }, [user]);

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    if (Platform.OS === "web") return;
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === "web") return;
    animateTo(insets.bottom + focusedPadding);
  };

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: async (updateData) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Update failed");
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    },
    onError: (error) => {
      Alert.alert("Update Failed", error.message);
    },
  });

  const handleSave = () => {
    // Basic validation
    if (!formData.name.trim()) {
      Alert.alert("Validation Error", "Name is required");
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert("Validation Error", "Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      Alert.alert("Validation Error", "Phone number is required");
      return;
    }

    // Check if anything has changed
    const hasChanges =
      formData.name !== user?.name ||
      formData.email !== user?.email ||
      formData.phone !== user?.phone ||
      formData.national_id !== user?.national_id;

    if (!hasChanges) {
      Alert.alert("No Changes", "No changes were made to save.");
      return;
    }

    // Only send changed fields
    const changes = {};
    if (formData.name !== user?.name) changes.name = formData.name.trim();
    if (formData.email !== user?.email) changes.email = formData.email.trim();
    if (formData.phone !== user?.phone) changes.phone = formData.phone.trim();
    if (formData.national_id !== user?.national_id)
      changes.national_id = formData.national_id.trim();

    updateMutation.mutate(changes);
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    icon: Icon,
  }) => (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Icon size={16} color="#F7B500" style={{ marginRight: 8 }} />
        <CaptionText style={{ color: "#6B7280" }}>{label}</CaptionText>
      </View>
      <View
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          keyboardType={keyboardType}
          style={{
            color: "#FFFFFF",
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#121212",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />
        <CaptionText style={{ color: "#6B7280" }}>
          Loading profile...
        </CaptionText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#121212" }}>
        <StatusBar style="light" />

        <Animated.View style={{ paddingBottom: paddingAnimation }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: insets.top + 20,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
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
                <HeaderText style={{ fontSize: 20 }}>Edit Profile</HeaderText>
                <CaptionText style={{ color: "#6B7280" }}>
                  Update your account information
                </CaptionText>
              </View>
            </View>

            {/* Profile Picture */}
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#1C1C1C",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {user?.avatar_url ? (
                  <Image
                    source={{ uri: user.avatar_url }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                    }}
                    contentFit="cover"
                  />
                ) : (
                  <User size={40} color="#6B7280" />
                )}
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F7B500",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                <Camera size={16} color="#1C1C1C" style={{ marginRight: 8 }} />
                <BodyText
                  style={{ color: "#1C1C1C", fontSize: 14, fontWeight: "600" }}
                >
                  Change Photo
                </BodyText>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={{ paddingHorizontal: 20 }}>
              <InputField
                label="FULL NAME"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Enter your full name"
                icon={User}
              />

              <InputField
                label="EMAIL ADDRESS"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, email: text }))
                }
                placeholder="Enter your email address"
                keyboardType="email-address"
                icon={Mail}
              />

              <InputField
                label="PHONE NUMBER"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, phone: text }))
                }
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                icon={Phone}
              />

              <InputField
                label="NATIONAL ID"
                value={formData.national_id}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, national_id: text }))
                }
                placeholder="Enter your national ID"
                icon={CreditCard}
              />
            </View>

            {/* Account Information */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
              }}
            >
              <HeaderText style={{ fontSize: 16, marginBottom: 16 }}>
                Account Information
              </HeaderText>

              <View style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    Account Created
                  </CaptionText>
                  <BodyText>
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </BodyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    Last Updated
                  </CaptionText>
                  <BodyText>
                    {user?.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : "N/A"}
                  </BodyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CaptionText style={{ color: "#6B7280" }}>
                    User ID
                  </CaptionText>
                  <BodyText>#{user?.id}</BodyText>
                </View>
              </View>
            </View>

            {/* Security Notice */}
            <View
              style={{
                backgroundColor: "#1C1C1C",
                borderRadius: 16,
                padding: 20,
                marginHorizontal: 20,
                marginBottom: 24,
                borderLeftWidth: 4,
                borderLeftColor: "#F7B500",
              }}
            >
              <HeaderText style={{ fontSize: 14, marginBottom: 8 }}>
                Security Notice
              </HeaderText>
              <CaptionText style={{ color: "#6B7280", lineHeight: 18 }}>
                Changing your email or phone number may require additional
                verification. Make sure you have access to your new contact
                information before saving changes.
              </CaptionText>
            </View>

            {/* Save Button */}
            <View style={{ paddingHorizontal: 20 }}>
              <PrimaryButton
                title="SAVE CHANGES"
                onPress={handleSave}
                disabled={updateMutation.isPending}
                style={{
                  opacity: updateMutation.isPending ? 0.6 : 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />

              <View style={{ height: 12 }} />

              <SecondaryButton
                title="CANCEL"
                onPress={() => router.back()}
                disabled={updateMutation.isPending}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
