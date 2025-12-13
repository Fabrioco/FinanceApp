# 📱 React Native Template com NativeWind

Este repositório é um **template inicial para projetos React Native** utilizando o [NativeWind](https://www.nativewind.dev/) — uma biblioteca que traz o poder do Tailwind CSS para o React Native.

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Tailwind CSS (estilo via classes utilitárias)](https://tailwindcss.com/)
- [Expo](https://expo.dev/)

## 📦 Como Usar

### 1. Clone o repositório

```bash
git clone https://github.com/Fabrioco/Template-React-Native-com-NativeWind.git
cd nome-do-repositorio
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Inicie o projeto

```bash
npx react-native run-android
# ou
npx react-native run-ios
# ou, se estiver usando Expo:
npx expo start
```

# 🎨 Exemplo de Uso do NativeWind

```bash
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">Hello NativeWind!</Text>
    </View>
  );
}
```

# 📁 Estrutura do Projeto

```bash
📦 nome-do-projeto
├── App.tsx
├── tailwind.config.js
├── babel.config.js
├── package.json
└── ...
```

# 🛠 Configuração do NativeWind

Certifique-se de que o arquivo **tailwind.config.js** está corretamente configurado:

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

E o **babel.config.js** também deve conter:

```bash
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

## 🤝 Contribuição
Sinta-se à vontade para abrir issues ou pull requests para melhorias ou sugestões


Desenvolvido por [Fabrício Oliveira Lopes](github.com/Fabrioco)
