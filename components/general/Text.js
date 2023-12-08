import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../styles/colors";

export const TextXsSecondary = ({ text }) => {
  return <Text style={styles.textXsSecondary}>{text}</Text>;
};

export const TextXsSecondaryUnderline = ({ text }) => {
  return (
    <View
      style={{ borderBottomColor: colors.textSecondary, borderBottomWidth: 1 }}
    >
      <Text style={styles.textXsSecondaryUnderline}>{text}</Text>
    </View>
  );
};
export const TextXsPrimary = ({ text }) => {
  return <Text style={styles.textXsPrimary}>{text}</Text>;
};
export const TextXsPrimaryBold = ({ text }) => {
  return <Text style={styles.textXsPrimaryBold}>{text}</Text>;
};
export const TextXsAccent = ({ text }) => {
  return <Text style={styles.textXsAccent}>{text}</Text>;
};
export const TextSmPrimary = ({ text }) => {
  return <Text style={styles.textSmPrimary}>{text}</Text>;
};
export const TextSmSecondary = ({ text }) => {
  return <Text style={styles.textSmSecondary}>{text}</Text>;
};
export const TextSmPrimaryBold = ({ text }) => {
  return <Text style={styles.textSmPrimaryBold}>{text}</Text>;
};
export const TextSmSecondaryBold = ({ text }) => {
  return <Text style={styles.textSmSecondaryBold}>{text}</Text>;
};
export const TextSmAccent = ({ text }) => {
  return <Text style={styles.textSmAccent}>{text}</Text>;
};
export const TextSmAccentBold = ({ text }) => {
  return <Text style={styles.textSmAccentBold}>{text}</Text>;
};
export const TextSmInverted = ({ text }) => {
  return <Text style={styles.textSmInverted}>{text}</Text>;
};
export const TextSmInvertedBold = ({ text }) => {
  return <Text style={styles.textSmInvertedBold}>{text}</Text>;
};
export const TextMedPrimary = ({ text }) => {
  return <Text style={styles.textMedPrimary}>{text}</Text>;
};
export const TextMedSecondary = ({ text }) => {
  return <Text style={styles.textMedSecondary}>{text}</Text>;
};

export const TextMedSecondaryBold = ({ text }) => {
  return <Text style={styles.textMedSecondaryBold}>{text}</Text>;
};

export const TextMedAccent = ({ text }) => {
  return <Text style={styles.textMedAccent}>{text}</Text>;
};

export const TextMedAccentBold = ({ text }) => {
  return <Text style={styles.textMedAccentBold}>{text}</Text>;
};

export const TextMedInverted = ({ text }) => {
  return <Text style={styles.textMedInverted}>{text}</Text>;
};

export const TextMedInvertedBold = ({ text }) => {
  return <Text style={styles.textMedInvertedBold}>{text}</Text>;
};

export const TextMedPrimaryBold = ({ text }) => {
  return <Text style={styles.textMedPrimaryBold}>{text}</Text>;
};

export const TextLgPrimary = ({ text }) => {
  return <Text style={styles.textLgPrimary}>{text}</Text>;
};
export const TextLgPrimaryBold = ({ text }) => {
  return <Text style={styles.textLgPrimaryBold}>{text}</Text>;
};
export const TextLgSecondaryBold = ({ text }) => {
  return <Text style={styles.textLgSecondaryBold}>{text}</Text>;
};

export const Title3Primary = ({ text }) => {
  return <Text style={styles.title3Primary}>{text}</Text>;
};
export const Title3PrimaryBold = ({ text }) => {
  return <Text style={styles.title3PrimaryBold}>{text}</Text>;
};

export const Title2Primary = ({ text }) => {
  return (
    <Text
      style={{
        fontFamily: "LobsterTwo_400Regular",
        fontSize: 32,
        lineHeight: 36,
      }}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textXsPrimary: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
  },
  textXsSecondary: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  textXsSecondaryUnderline: {
    fontSize: 12,
    lineHeight: 12,
    color: colors.textSecondary,
    textDecorationColor: colors.textSecondary,
  },
  textXsAccent: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.grapevine,
  },
  textXsPrimaryBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  textSmPrimary: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  textSmAccent: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.grapevine,
  },
  textSmAccentBold: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: colors.grapevine,
  },
  textSmInverted: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.textInverted,
  },
  textSmInvertedBold: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: colors.textInverted,
  },
  textSmSecondary: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  textSmPrimaryBold: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  textSmSecondaryBold: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  textMedPrimary: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  textMedSecondary: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  textMedAccent: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.grapevine,
  },
  textMedAccentBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.grapevine,
  },
  textMedInverted: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.textInverted,
  },
  textMedInvertedBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.textInverted,
  },
  textMedPrimaryBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  textMedSecondaryBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  textLgPrimary: {
    fontSize: 19,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  textLgPrimaryBold: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  textLgSecondaryBold: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  title3Primary: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  title3PrimaryBold: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});
