import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, Play, Clock, CheckCircle, Star, ArrowUpRight, Award, TrendingUp } from 'lucide-react-native';

export default function AcademyScreen() {
  const insets = useSafeAreaInsets();

  const courses = [
    {
      title: 'Investing Basics',
      description: 'Learn the fundamentals of stock investing',
      lessons: 8,
      duration: '45 min',
      progress: 75,
      completed: true,
      difficulty: 'Beginner',
      color: '#2D5016'
    },
    {
      title: 'Understanding the NSE',
      description: 'How the Nairobi Securities Exchange works',
      lessons: 6,
      duration: '30 min',
      progress: 50,
      completed: false,
      difficulty: 'Beginner',
      color: '#059669'
    },
    {
      title: 'Reading Financial Statements',
      description: 'Analyze company performance like a pro',
      lessons: 10,
      duration: '60 min',
      progress: 0,
      completed: false,
      difficulty: 'Intermediate',
      color: '#7C3AED'
    }
  ];

  const quickLessons = [
    {
      title: 'What is a Stock?',
      duration: '3 min',
      type: 'Video',
      completed: true
    },
    {
      title: 'How Stock Prices Move',
      duration: '5 min',
      type: 'Article',
      completed: false
    },
    {
      title: 'Dividends Explained',
      duration: '4 min',
      type: 'Video',
      completed: false
    },
    {
      title: 'Risk vs Return',
      duration: '6 min',
      type: 'Interactive',
      completed: false
    }
  ];

  const achievements = [
    { title: 'First Investment', icon: '🎯', unlocked: true },
    { title: 'Learning Streak', icon: '🔥', unlocked: true },
    { title: 'Portfolio Builder', icon: '📈', unlocked: false },
    { title: 'Market Expert', icon: '🏆', unlocked: false }
  ];

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
            <Text style={{ color: '#FFFFFF', fontSize: 16, opacity: 0.9 }}>Kiota Academy</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>
              Learn & Grow
            </Text>
          </View>
          <View style={{ 
            backgroundColor: 'rgba(255,255,255,0.15)', 
            borderRadius: 20, 
            padding: 12 
          }}>
            <BookOpen color="#FFFFFF" size={24} />
          </View>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
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
            <View>
              <Text style={{ color: '#6B7280', fontSize: 14 }}>Learning Progress</Text>
              <Text style={{ color: '#1F2937', fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>
                42% Complete
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Award color="#F59E0B" size={32} />
              <Text style={{ color: '#F59E0B', fontSize: 12, fontWeight: '600', marginTop: 4 }}>
                Level 2
              </Text>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#F3F4F6', borderRadius: 8, height: 8, marginBottom: 12 }}>
            <View style={{ 
              backgroundColor: '#2D5016', 
              borderRadius: 8, 
              height: 8, 
              width: '42%' 
            }} />
          </View>
          
          <Text style={{ color: '#6B7280', fontSize: 12 }}>
            Keep learning to unlock new investment strategies!
          </Text>
        </View>

        {/* Quick Lessons */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Quick Lessons
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0, marginBottom: 24 }}
          >
            {quickLessons.map((lesson, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  marginRight: 12,
                  width: 200,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ 
                    backgroundColor: lesson.completed ? '#D1FAE5' : '#FEF3C7', 
                    borderRadius: 8, 
                    padding: 8 
                  }}>
                    {lesson.completed ? 
                      <CheckCircle color="#059669" size={16} /> :
                      <Play color="#F59E0B" size={16} />
                    }
                  </View>
                  <Text style={{ fontSize: 10, color: '#6B7280', fontWeight: '600' }}>
                    {lesson.type.toUpperCase()}
                  </Text>
                </View>
                
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 4 }}>
                  {lesson.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Clock color="#6B7280" size={12} />
                  <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
                    {lesson.duration}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Courses */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
              Full Courses
            </Text>
            <TouchableOpacity>
              <Text style={{ color: '#2D5016', fontSize: 14, fontWeight: '600' }}>View All</Text>
            </TouchableOpacity>
          </View>

          {courses.map((course, index) => (
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
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ 
                  backgroundColor: course.color, 
                  borderRadius: 12, 
                  padding: 12,
                  marginRight: 16
                }}>
                  <BookOpen color="#FFFFFF" size={20} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {course.title}
                    </Text>
                    <Text style={{ 
                      fontSize: 10, 
                      color: course.difficulty === 'Beginner' ? '#059669' : '#7C3AED',
                      fontWeight: '600',
                      backgroundColor: course.difficulty === 'Beginner' ? '#D1FAE5' : '#EDE9FE',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 8
                    }}>
                      {course.difficulty.toUpperCase()}
                    </Text>
                  </View>
                  
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    {course.description}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>
                      {course.lessons} lessons • {course.duration}
                    </Text>
                  </View>
                  
                  {course.progress > 0 && (
                    <View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Progress</Text>
                        <Text style={{ fontSize: 12, color: course.color, fontWeight: '600' }}>
                          {course.progress}%
                        </Text>
                      </View>
                      <View style={{ backgroundColor: '#F3F4F6', borderRadius: 4, height: 4 }}>
                        <View style={{ 
                          backgroundColor: course.color, 
                          borderRadius: 4, 
                          height: 4, 
                          width: `${course.progress}%` 
                        }} />
                      </View>
                    </View>
                  )}
                </View>
              </View>
              
              <TouchableOpacity style={{
                backgroundColor: course.color,
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 16
              }}>
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Achievements */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Your Achievements
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {achievements.map((achievement, index) => (
              <TouchableOpacity key={index} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                width: '48%',
                marginBottom: 12,
                alignItems: 'center',
                opacity: achievement.unlocked ? 1 : 0.5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2
              }}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>{achievement.icon}</Text>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: achievement.unlocked ? '#1F2937' : '#6B7280',
                  textAlign: 'center'
                }}>
                  {achievement.title}
                </Text>
                {achievement.unlocked && (
                  <CheckCircle color="#059669" size={16} style={{ marginTop: 4 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Tips */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
            Today's Tip
          </Text>
          <View style={{
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View style={{ 
              backgroundColor: '#F59E0B', 
              borderRadius: 10, 
              padding: 10,
              marginRight: 16
            }}>
              <TrendingUp color="#FFFFFF" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#92400E', marginBottom: 4 }}>
                Start Small, Think Big
              </Text>
              <Text style={{ fontSize: 14, color: '#92400E', opacity: 0.8 }}>
                Even KES 50 invested regularly can grow into something meaningful over time. Consistency beats timing!
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}