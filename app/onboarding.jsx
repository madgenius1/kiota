import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TrendingUp, Shield, Smartphone } from "lucide-react-native";
import { HeaderText, BodyText, CaptionText } from "@/components/Typography";
import { PrimaryButton } from "@/components/Button";

const { width } = Dimensions.get("window");

const slides = [
  {
    icon: TrendingUp,
    title: "Start Small. Grow Big.",
    description: "Invest from as little as KES 10 and build your wealth over time.",
    backgroundColor: "#F7B500",
  },
  {
    icon: Shield,
    title: "Own Kenya's Top Companies",
    description: "Buy shares of brands you know and trust like Safaricom, Equity, and KCB.",
    backgroundColor: "#A6D49F",
  },
  {
    icon: Smartphone,
    title: "Investing Made Simple",
    description: "Integrated with M-Pesa for instant trading. As easy as sending money.",
    backgroundColor: "#360659",
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSlideChange = (event) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / slideWidth);
    setCurrentSlide(currentIndex);
  };

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentSlide + 1) * width,
        animated: true,
      });
    }
  };

  const handleGetStarted = () => {
    Animated.fadeOut(fadeAnim, {
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      router.replace("/signup");
    });
  };

  const handleSkip = () => {
    router.replace("/signup");
  };

  const SlideItem = ({ slide, index }) => {
    const IconComponent = slide.icon;
    
    return (
      <View
        style={{
          width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: slide.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
        >
          <IconComponent 
            size={48} 
            color={index === 2 ? "#FFFFFF" : "#1C1C1C"} 
          />
        </View>

        <HeaderText
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: 28,
          }}
        >
          {slide.title}
        </HeaderText>

        <BodyText
          style={{
            textAlign: "center",
            color: "#9CA3AF",
            lineHeight: 24,
            fontSize: 16,
          }}
        >
          {slide.description}
        </BodyText>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        opacity: fadeAnim,
      }}
    >
      <StatusBar style="light" />
      
      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Skip Button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
            <CaptionText style={{ color: "#9CA3AF" }}>SKIP</CaptionText>
          </TouchableOpacity>
        </View>

        {/* Slides */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleSlideChange}
          style={{ flex: 1 }}
        >
          {slides.map((slide, index) => (
            <SlideItem key={index} slide={slide} index={index} />
          ))}
        </ScrollView>

        {/* Progress Dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: currentSlide === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentSlide === index ? "#F7B500" : "#374151",
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Action Button */}
        <View style={{ paddingHorizontal: 20 }}>
          {currentSlide === slides.length - 1 ? (
            <PrimaryButton
              title="GET STARTED"
              onPress={handleGetStarted}
              style={{ marginBottom: 20 }}
            />
          ) : (
            <PrimaryButton
              title="NEXT"
              onPress={goToNextSlide}
              style={{ marginBottom: 20 }}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
}