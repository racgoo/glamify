
import { StyleSheet } from "react-native";

const fontSize = {
  s28: { fontSize: 28 },
  s24: { fontSize: 24 },
  s20: { fontSize: 20 },
  s18: { fontSize: 18 },
  s16: { fontSize: 16 },
  s15: { fontSize: 15 },
  s14: { fontSize: 14 },
  s12: { fontSize: 12 },
  s10: { fontSize: 10 },
  s8: { fontSize: 8 },
};
const fontFamily = {
  bold: { fontFamily: "Pretendard-Bold"}, //700
  semibold: { fontFamily: "Pretendard-SemiBold" }, //600
  medium: { fontFamily: "Pretendard-Medium" }, //500
  regular: { fontFamily: "Pretendard-Regular" }, //400
};

const lineHeight = {
  l36: { lineHeight: 36 },
  l30: { lineHeight: 30 },
  l28: { lineHeight: 28 },
  l26: { lineHeight: 26 },
  l24: { lineHeight: 24 },
  l22: { lineHeight: 22 },
  l18: { lineHeight: 18 },
  l16: { lineHeight: 16 },
  l12: { lineHeight: 12 },
  l10: { lineHeight: 10 },
};
export default StyleSheet.create({
  TitleS28: {
    ...fontSize.s28,
    ...fontFamily.semibold,
    ...lineHeight.l36,
  },
  Title1B24: {
    ...fontSize.s24,
    ...fontFamily.bold,
    ...lineHeight.l30,
  },
  Title2B20: {
    ...fontSize.s20,
    ...fontFamily.bold,
    ...lineHeight.l28,
  },
  Title3B18: {
    ...fontSize.s18,
    ...fontFamily.bold,
    ...lineHeight.l22,
  },
  Title3S18: {
    ...fontSize.s18,
    ...fontFamily.semibold,
    ...lineHeight.l26,
  },
  Body1S16: {
    ...fontSize.s16,
    ...fontFamily.semibold,
    ...lineHeight.l24,
  },
  Body2M16: {
    ...fontSize.s16,
    ...fontFamily.medium,
    ...lineHeight.l24,
  },
  Body3S15: {
    ...fontSize.s15,
    ...fontFamily.semibold,
    ...lineHeight.l22,
  },
  Body4B14: {
    ...fontSize.s14,
    ...fontFamily.bold,
    ...lineHeight.l22,
  },
  Body5S14: {
    ...fontSize.s14,
    ...fontFamily.semibold,
    ...lineHeight.l22,
  },
  Body6M14: {
    ...fontSize.s14,
    ...fontFamily.medium,
    ...lineHeight.l22,
  },
  Caption1M12: {
    ...fontSize.s12,
    ...fontFamily.medium,
    ...lineHeight.l18,
  },
  Caption1M10: {
    ...fontSize.s10,
    ...fontFamily.medium,
    ...lineHeight.l12,
  },
  Caption1M8: {
    ...fontSize.s8,
    ...fontFamily.medium,
    ...lineHeight.l10,
  },
  Caption2B12: {
    ...fontSize.s12,
    ...fontFamily.bold,
    ...lineHeight.l18,
  },
});