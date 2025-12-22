import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";

function HelpSection({
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

function HelpItem({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between px-4 py-4"
    >
      <View className="flex-row items-center gap-3">
        <Feather name={icon} size={18} color="#6B7280" />
        <Text className="text-base text-gray-700">{label}</Text>
      </View>

      <Feather name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

export default function HelpScreen() {
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER */}
        <View className="mt-10 mb-6">
          <Text className="text-2xl font-semibold">Ajuda</Text>
          <Text className="text-gray-500">Como podemos te ajudar hoje?</Text>
        </View>

        {/* SEARCH */}
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-2 mb-6">
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Pesquisar dúvidas"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-base"
          />
        </View>

        {/* FAQ */}
        <HelpSection title="Dúvidas frequentes">
          <HelpItem
            icon="target"
            label="Como criar uma meta?"
            onPress={() => {}}
          />
          <HelpItem
            icon="plus-circle"
            label="Como funciona o aporte?"
            onPress={() => {}}
          />
          <HelpItem
            icon="minus-circle"
            label="Posso remover dinheiro de uma meta?"
            onPress={() => {}}
          />
          <HelpItem
            icon="star"
            label="Como funcionam os planos?"
            onPress={() => {}}
          />
          <HelpItem
            icon="lock"
            label="Meus dados estão seguros?"
            onPress={() => {}}
          />
        </HelpSection>

        {/* SUPORTE */}
        <HelpSection title="Suporte">
          <HelpItem
            icon="message-circle"
            label="Falar com o suporte"
            onPress={() => {}}
          />
          <HelpItem icon="mail" label="Enviar e-mail" onPress={() => {}} />
          <HelpItem
            icon="alert-circle"
            label="Reportar um problema"
            onPress={() => {}}
          />
        </HelpSection>

        {/* SOBRE */}
        <HelpSection title="Sobre o app">
          <HelpItem icon="file-text" label="Termos de uso" onPress={() => {}} />
          <HelpItem
            icon="shield"
            label="Política de privacidade"
            onPress={() => {}}
          />
          <View className="px-4 py-4 flex-row items-center justify-between">
            <Text className="text-base text-gray-700">Versão do app</Text>
            <Text className="text-gray-400 text-sm">1.0.0</Text>
          </View>
        </HelpSection>
      </ScrollView>
    </Container>
  );
}
