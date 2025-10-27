import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { 
  BookOpen, 
  Play, 
  Award, 
  TrendingUp,
  PieChart,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react-native";
import { HeaderText, BodyText, CaptionText } from "@/components/Typography";
import { PrimaryButton, SecondaryButton } from "@/components/Button";

const { width } = Dimensions.get("window");

const courses = [
  {
    id: "stock_basics",
    title: "How the Stock Market Works",
    description: "Learn the fundamentals of stock investing",
    duration: "3 min",
    lessons: 4,
    completed: 0,
    level: "Beginner",
    icon: TrendingUp,
    color: "#F7B500",
  },
  {
    id: "dividends",
    title: "What Dividends Mean",
    description: "Understanding dividend payments and yields",
    duration: "2 min",
    lessons: 3,
    completed: 0,
    level: "Beginner",
    icon: PieChart,
    color: "#A6D49F",
  },
  {
    id: "reading_charts",
    title: "How to Read a Chart",
    description: "Analyze stock price movements and trends",
    duration: "4 min",
    lessons: 5,
    completed: 2,
    level: "Intermediate",
    icon: Target,
    color: "#8B5CF6",
  },
  {
    id: "portfolio_building",
    title: "Building Your Portfolio",
    description: "Diversification and risk management strategies",
    duration: "5 min",
    lessons: 6,
    completed: 0,
    level: "Intermediate",
    icon: Award,
    color: "#EF4444",
  },
];

const achievements = [
  {
    id: "first_lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    earned: false,
    icon: BookOpen,
  },
  {
    id: "course_completion",
    title: "Knowledge Seeker",
    description: "Complete an entire course",
    earned: false,
    icon: Award,
  },
  {
    id: "streak_7",
    title: "Consistent Learner",
    description: "Learn for 7 days in a row",
    earned: false,
    icon: Target,
  },
];

export default function AcademyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("courses");

  const CourseCard = ({ course }) => {
    const IconComponent = course.icon;
    const progress = course.lessons > 0 ? (course.completed / course.lessons) * 100 : 0;
    
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: course.color + "20",
        }}
        activeOpacity={0.8}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: course.color + "20",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <IconComponent size={24} color={course.color} />
          </View>
          
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <BodyText style={{ fontSize: 16, marginRight: 8 }}>
                {course.title}
              </BodyText>
              <View
                style={{
                  backgroundColor: course.color + "20",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 12,
                }}
              >
                <CaptionText
                  style={{
                    color: course.color,
                    fontSize: 10,
                  }}
                >
                  {course.level}
                </CaptionText>
              </View>
            </View>
            
            <BodyText
              style={{
                color: "#9CA3AF",
                fontSize: 14,
                lineHeight: 20,
                marginBottom: 8,
              }}
            >
              {course.description}
            </BodyText>
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Clock size={14} color="#6B7280" style={{ marginRight: 4 }} />
              <CaptionText style={{ color: "#6B7280", marginRight: 12 }}>
                {course.duration}
              </CaptionText>
              <BookOpen size={14} color="#6B7280" style={{ marginRight: 4 }} />
              <CaptionText style={{ color: "#6B7280" }}>
                {course.lessons} lessons
              </CaptionText>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        {course.completed > 0 && (
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <CaptionText style={{ color: "#9CA3AF" }}>
                PROGRESS
              </CaptionText>
              <CaptionText style={{ color: course.color }}>
                {Math.round(progress)}%
              </CaptionText>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: "#374151",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: course.color,
                }}
              />
            </View>
          </View>
        )}

        <PrimaryButton
          title={course.completed > 0 ? "CONTINUE" : "START COURSE"}
          style={{
            backgroundColor: course.color,
            paddingVertical: 12,
          }}
          textStyle={{ color: "#1C1C1C" }}
        />
      </TouchableOpacity>
    );
  };

  const AchievementCard = ({ achievement }) => {
    const IconComponent = achievement.icon;
    
    return (
      <View
        style={{
          backgroundColor: "#1C1C1C",
          borderRadius: 12,
          padding: 16,
          marginRight: 16,
          width: width * 0.7,
          opacity: achievement.earned ? 1 : 0.6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: achievement.earned ? "#F7B500" : "#374151",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            {achievement.earned ? (
              <CheckCircle size={20} color="#1C1C1C" />
            ) : (
              <IconComponent size={20} color="#6B7280" />
            )}
          </View>
          
          <View style={{ flex: 1 }}>
            <BodyText style={{ marginBottom: 4 }}>
              {achievement.title}
            </BodyText>
            <CaptionText style={{ color: "#6B7280" }}>
              {achievement.description}
            </CaptionText>
          </View>
        </View>
      </View>
    );
  };

  const TabButton = ({ title, value, active }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(value)}
      style={{
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: active ? "#F7B500" : "transparent",
      }}
      activeOpacity={0.7}
    >
      <CaptionText
        style={{
          color: active ? "#F7B500" : "#6B7280",
          fontSize: 14,
        }}
      >
        {title}
      </CaptionText>
    </TouchableOpacity>
  );

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
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <HeaderText style={{ fontSize: 24, marginBottom: 8 }}>
            Kiota Academy
          </HeaderText>
          <CaptionText style={{ color: "#6B7280" }}>
            Learn investing basics and build confidence
          </CaptionText>
        </View>

        {/* Progress Overview */}
        <View
          style={{
            backgroundColor: "#1C1C1C",
            borderRadius: 16,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <HeaderText style={{ fontSize: 24, color: "#F7B500" }}>
                2
              </HeaderText>
              <CaptionText style={{ color: "#9CA3AF" }}>
                LESSONS COMPLETED
              </CaptionText>
            </View>
            
            <View style={{ alignItems: "center" }}>
              <HeaderText style={{ fontSize: 24, color: "#A6D49F" }}>
                18
              </HeaderText>
              <CaptionText style={{ color: "#9CA3AF" }}>
                TOTAL LESSONS
              </CaptionText>
            </View>
            
            <View style={{ alignItems: "center" }}>
              <HeaderText style={{ fontSize: 24, color: "#8B5CF6" }}>
                0
              </HeaderText>
              <CaptionText style={{ color: "#9CA3AF" }}>
                BADGES EARNED
              </CaptionText>
            </View>
          </View>

          <PrimaryButton
            title="CONTINUE LEARNING"
            style={{ marginTop: 16 }}
          />
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginBottom: 24,
          }}
        >
          <TabButton
            title="COURSES"
            value="courses"
            active={selectedTab === "courses"}
          />
          <TabButton
            title="ACHIEVEMENTS"
            value="achievements"
            active={selectedTab === "achievements"}
          />
        </View>

        {/* Content */}
        {selectedTab === "courses" ? (
          <View style={{ paddingHorizontal: 20 }}>
            <HeaderText style={{ fontSize: 18, marginBottom: 16 }}>
              Learning Path
            </HeaderText>
            
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </View>
        ) : (
          <View>
            <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
              <HeaderText style={{ fontSize: 18 }}>
                Your Achievements
              </HeaderText>
            </View>
            
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </ScrollView>

            <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
              <View
                style={{
                  backgroundColor: "#1C1C1C",
                  borderRadius: 12,
                  padding: 20,
                  alignItems: "center",
                }}
              >
                <Award size={48} color="#F7B500" style={{ marginBottom: 16 }} />
                <HeaderText style={{ fontSize: 18, marginBottom: 8 }}>
                  Start Learning to Earn Badges
                </HeaderText>
                <BodyText
                  style={{
                    color: "#9CA3AF",
                    textAlign: "center",
                    lineHeight: 20,
                    marginBottom: 20,
                  }}
                >
                  Complete courses and lessons to unlock achievements and track your investing knowledge.
                </BodyText>
                <PrimaryButton
                  title="START FIRST COURSE"
                  onPress={() => setSelectedTab("courses")}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}