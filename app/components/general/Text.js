import { Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const TextXsSecondary = ({ text }) => {
  return <Text style={styles.textXsSecondary}>{text}</Text>;
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
export const TextMedPrimary = ({ text }) => {
  return <Text style={styles.textMedPrimary}>{text}</Text>;
};
export const TextMedSecondary = ({ text }) => {
  return <Text style={styles.textMedSecondary}>{text}</Text>;
};
export const TextMedAccent = ({ text }) => {
  return <Text style={styles.textMedAccent}>{text}</Text>;
};
export const TextMedInverted = ({ text }) => {
  return <Text style={styles.textMedInverted}>{text}</Text>;
};
export const TextMedPrimaryBold = ({ text }) => {
  return <Text style={styles.textMedPrimaryBold}>{text}</Text>;
};
export const TextLgBold = ({ text }) => {
  return <Text style={styles.textLgPrimaryBold}>{text}</Text>;
};
export const Title3Primary = ({ text }) => {
  return <Text style={styles.title3Primary}>{text}</Text>;
};
export const Title3PrimaryBold = ({ text }) => {
  return <Text style={styles.title3PrimaryBold}>{text}</Text>;
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
  textMedInverted: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.textInverted,
  },
  textMedPrimaryBold: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  textLgPrimaryBold: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.textPrimary,
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
