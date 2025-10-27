import { TouchableOpacity } from "react-native";
import { LabelText } from "./Typography";

export const PrimaryButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  style = {},
  textStyle = {},
  children,
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#3A3A3A" : "#F7B500",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      activeOpacity={disabled ? 1 : 0.8}
      {...props}
    >
      {children ? (
        children
      ) : (
        <LabelText
          style={{
            color: disabled ? "#6B7280" : "#1C1C1C",
            fontSize: 16,
            ...textStyle,
          }}
        >
          {title}
        </LabelText>
      )}
    </TouchableOpacity>
  );
};

export const SecondaryButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  style = {},
  textStyle = {},
  children,
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#2A2A2A" : "#1C1C1C",
        borderWidth: 1,
        borderColor: disabled ? "#3A3A3A" : "#4B5563",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      {children ? (
        children
      ) : (
        <LabelText
          style={{
            color: disabled ? "#6B7280" : "#FFFFFF",
            fontSize: 16,
            ...textStyle,
          }}
        >
          {title}
        </LabelText>
      )}
    </TouchableOpacity>
  );
};

export const AccentButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  style = {},
  textStyle = {},
  children,
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#3A3A3A" : "#A6D49F",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      activeOpacity={disabled ? 1 : 0.8}
      {...props}
    >
      {children ? (
        children
      ) : (
        <LabelText
          style={{
            color: disabled ? "#6B7280" : "#1C1C1C",
            fontSize: 16,
            ...textStyle,
          }}
        >
          {title}
        </LabelText>
      )}
    </TouchableOpacity>
  );
};

export const IconButton = ({ 
  onPress, 
  disabled = false, 
  style = {},
  children,
  ...props 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#1C1C1C",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};