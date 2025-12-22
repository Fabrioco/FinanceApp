import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import NotificationModal from "@/src/components/profile/NotificationModal";
import CurrencyModal from "@/src/components/profile/CurrencyModal";
import ThemeModal from "@/src/components/profile/ThemeModal";
import PinModal from "@/src/components/profile/PinModal";
import ExportModal from "@/src/components/profile/ExportModal";
import LogOutModal from "@/src/components/profile/LogOutModal";
import * as LocalAuthentication from "expo-local-authentication";
import EditProfileModal from "@/src/components/profile/EditProfileModal";
import { router } from "expo-router";

/* =======================
   COMPONENTES AUXILIARES
======================= */

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="text-gray-400 text-xs mb-2 uppercase">{title}</Text>
      <View className="bg-white rounded-xl divide-y">{children}</View>
    </View>
  );
}

function ProfileItem({
  icon,
  label,
  value,
  onPress,
  danger,
  right,
}: {
  icon: keyof typeof Feather.glyphMap | "fingerprint";
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-4"
    >
      <View className="flex-row items-center gap-3">
        {icon === "fingerprint" ? (
          <FontAwesome5 name="fingerprint" size={18} />
        ) : (
          <Feather
            name={icon}
            size={18}
            color={danger ? "#DC2626" : "#6B7280"}
          />
        )}

        <Text
          className={`text-base ${danger ? "text-red-600" : "text-gray-700"}`}
        >
          {label}
        </Text>
      </View>

      {right ? (
        right
      ) : value ? (
        <Text className="text-gray-400 text-sm">{value}</Text>
      ) : (
        <FontAwesome5 name="chevron-right" size={18} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

/* =======================
   SCREEN
======================= */

export default function ProfileScreen() {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [currency, setCurrency] = useState("BRL");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [pin, setPin] = useState("");

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const [biometryEnabled, setBiometryEnabled] = useState(false);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [name, setName] = useState("Fabricio");

  async function checkBiometrySupport() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    return hasHardware && isEnrolled;
  }

  async function authenticateBiometry() {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirmar identidade",
      fallbackLabel: "Usar PIN",
      cancelLabel: "Cancelar",
    });

    return result.success;
  }

  async function toggleBiometry(value: boolean) {
    if (value) {
      const supported = await checkBiometrySupport();
      if (!supported) {
        Alert.alert(
          "Biometria indisponível",
          "Seu dispositivo não possui biometria configurada."
        );
        return;
      }

      const success = await authenticateBiometry();
      if (!success) return;

      setBiometryEnabled(true);
    } else {
      setBiometryEnabled(false);
    }
  }

  return (
    <Container>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="items-center mt-8 mb-10">
          <TouchableOpacity
            className="items-center mt-8 mb-10"
            onPress={() => setShowEditProfileModal(true)}
          >
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-3">
              <Feather name="user" size={32} color="#2563EB" />
            </View>

            <Text className="text-xl font-semibold">Fabricio</Text>
            <Text className="text-gray-500 text-sm">fabricio@email.com</Text>
          </TouchableOpacity>

          <View className="mt-2 px-3 py-1 bg-gray-100 rounded-full">
            <TouchableOpacity
              onPress={() => router.push("/payments/plans")}
              activeOpacity={0.7}
              className="flex-row items-center gap-1"
            >
              <Text className="text-xs text-gray-600">Plano gratuito</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PREFERÊNCIAS */}
        <ProfileSection title="Preferências">
          <ProfileItem
            icon="dollar-sign"
            label="Moeda"
            value="BRL"
            onPress={() => setShowCurrencyModal(true)}
          />
          <ProfileItem
            icon="bell"
            label="Notificações"
            onPress={() => setShowNotificationsModal(true)}
          />
          <ProfileItem
            icon="moon"
            label="Tema"
            value="Claro"
            onPress={() => setShowThemeModal(true)}
          />
        </ProfileSection>

        {/* SEGURANÇA */}
        <ProfileSection title="Segurança">
          <ProfileItem
            icon="lock"
            label="PIN de acesso"
            onPress={() => setShowPinModal(true)}
          />
          <ProfileItem
            icon="fingerprint"
            label="Biometria"
            right={
              <Switch value={biometryEnabled} onValueChange={toggleBiometry} />
            }
          />

          <ProfileItem icon="key" label="Alterar senha" />
        </ProfileSection>

        {/* DADOS */}
        <ProfileSection title="Dados financeiros">
          <ProfileItem
            icon="download"
            label="Exportar dados"
            onPress={() => setShowExportModal(true)}
          />
          <ProfileItem icon="trash-2" label="Resetar metas" danger />
        </ProfileSection>

        {/* CONTA */}
        <ProfileSection title="Conta">
          <ProfileItem icon="help-circle" label="Ajuda" onPress={() =>router.push("/help")} />
          <ProfileItem
            icon="log-out"
            label="Sair da conta"
            danger
            onPress={() => setShowLogoutModal(true)}
          />
        </ProfileSection>
      </ScrollView>

      <NotificationModal
        setShowNotificationsModal={() => setShowNotificationsModal(false)}
        showNotificationsModal={showNotificationsModal}
      />

      <CurrencyModal
        setShowCurrencyModal={() => setShowCurrencyModal(false)}
        showCurrencyModal={showCurrencyModal}
        currency={currency}
        setCurrency={setCurrency}
      />

      <ThemeModal
        setShowThemeModal={() => setShowThemeModal(false)}
        showThemeModal={showThemeModal}
        theme={theme}
        setTheme={setTheme}
      />

      <PinModal
        pin={pin}
        setPin={setPin}
        showPinModal={showPinModal}
        setShowPinModal={setShowPinModal}
      />

      <ExportModal
        setShowExportModal={() => setShowExportModal(false)}
        showExportModal={showExportModal}
      />

      <LogOutModal
        setShowLogoutModal={() => setShowLogoutModal(false)}
        showLogoutModal={showLogoutModal}
      />

      <EditProfileModal
        visible={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        name={name}
        email="fabricio@email.com"
        onSave={setName}
      />
    </Container>
  );
}
