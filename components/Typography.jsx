import { Text } from "react-native";

export const AppText = ({ 
  variant = "body", 
  color = "#FFFFFF", 
  style = {},
  children,
  ...props 
}) => {
  const getTypographyStyle = () => {
    switch (variant) {
      case "title":
        return {
          fontFamily: "Inter_700Bold",
          fontSize: 24,
          fontWeight: "700",
        };
      case "subtitle":
        return {
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          fontWeight: "600",
        };
      case "body":
        return {
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          fontWeight: "400",
        };
      case "caption":
        return {
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        };
      case "number":
        return {
          fontFamily: "Inter_700Bold",
          fontSize: 32,
          fontWeight: "700",
        };
      case "label":
        return {
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        };
      default:
        return {
          fontFamily: "Inter_400Regular",
          fontSize: 16,
          fontWeight: "400",
        };
    }
  };

  return (
    <Text
      style={{
        ...getTypographyStyle(),
        color,
        ...style,
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const HeaderText = ({ children, style = {}, ...props }) => (
  <AppText variant="title" style={style} {...props}>
    {children}
  </AppText>
);

export const SubtitleText = ({ children, style = {}, ...props }) => (
  <AppText variant="subtitle" style={style} {...props}>
    {children}
  </AppText>
);

export const BodyText = ({ children, style = {}, ...props }) => (
  <AppText variant="body" style={style} {...props}>
    {children}
  </AppText>
);

export const CaptionText = ({ children, style = {}, ...props }) => (
  <AppText variant="caption" color="#9CA3AF" style={style} {...props}>
    {children}
  </AppText>
);

export const NumberText = ({ children, style = {}, ...props }) => (
  <AppText variant="number" style={style} {...props}>
    {children}
  </AppText>
);

export const LabelText = ({ children, style = {}, ...props }) => (
  <AppText variant="label" style={style} {...props}>
    {children}
  </AppText>
);