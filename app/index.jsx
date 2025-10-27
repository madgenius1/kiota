import { Redirect } from "expo-router";

export default function Index() {
  // In a real app, this would check if user is authenticated
  // For demo purposes, redirect to home tabs
  return <Redirect href="/(tabs)" />;
}
