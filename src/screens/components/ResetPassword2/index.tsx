import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./styles";

interface ResetPasswordForm2Props {
  codigoOtp: number;
  setCodigoOtp: (codigoOtp: number) => void;
  handleVerificarCodigoOtp: () => void;
  handleEnvioCodigoOtp2: () => void;
  loading: boolean;
}

const RESET_TIMEOUT = 2 * 60 * 1000; // 2 minutes in milliseconds

export default function ResetPasswordForm2({
  codigoOtp,
  setCodigoOtp,
  handleVerificarCodigoOtp,
  handleEnvioCodigoOtp2,
  loading,
}: ResetPasswordForm2Props) {
  const { theme } = useTheme();
  const inputRefs = useRef<TextInput[]>([]);
  const [countdown, setCountdown] = useState(RESET_TIMEOUT);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1000);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const resetTimeout = () => {
    setCountdown(RESET_TIMEOUT);
    handleEnvioCodigoOtp2();
  };

  const handleChangeDigit = (index: number, digit: string) => {
    let newOtpDigits = [...codigoOtp.toString()];
    newOtpDigits[index] = digit;
    const newOtp = Number(newOtpDigits.join(""));
    setCodigoOtp(newOtp);

    if (digit && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
        Verifique o código OTP
      </Text>
      <View style={styles.otpContainer}>
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.otpDigit,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
                borderColor: theme.COLORS.PRIMARY,
              },
            ]}
            maxLength={1}
            keyboardType="numeric"
            value={codigoOtp.toString()[index] || ""}
            onChangeText={(text) => handleChangeDigit(index, text)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleVerificarCodigoOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
            Verificar Código OTP
          </Text>
        )}
      </TouchableOpacity>
      {countdown > 0 && (
        <Text style={{ color: theme.COLORS.TEXT }}>
          Tempo restante para reenvio: {formatTime(countdown)}
        </Text>
      )}
      {countdown === 0 && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={resetTimeout}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
            Reenviar OTP
          </Text>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}
