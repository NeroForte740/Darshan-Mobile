# Darshan Mobile

Um aplicativo móvel desenvolvido com Expo e React Native.

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Yarn (gerenciador de pacotes)
- Expo CLI instalado globalmente:
  ```bash
  yarn global add @expo/cli
  ```

### Instalação

1. Clone o repositório ou navegue até a pasta do projeto
2. Instale as dependências:
   ```bash
   yarn install
   ```

### Executando o projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   yarn start
   ```

2. Para executar em dispositivos específicos:
   - **Android**: `yarn android`
   - **iOS**: `yarn ios`
   - **Web**: `yarn web`

### Testando no dispositivo

1. **Expo Go (Recomendado para desenvolvimento)**:
   - Instale o app Expo Go no seu celular
   - Escaneie o QR code que aparece no terminal ou navegador
   - O app será carregado automaticamente

2. **Simulador/Emulador**:
   - Para iOS: Xcode com iOS Simulator
   - Para Android: Android Studio com Android Emulator

## 📱 Funcionalidades

- **Interface moderna** com NativeWind (Tailwind CSS)
- **Integração com APIs** usando Axios
- **Navegação** entre telas com React Navigation
- **Componentes reutilizáveis** na pasta `components/`
- **Estrutura organizada** com separação de responsabilidades
- **Exemplo de requisição HTTP** carregando posts de API
- **SafeAreaProvider** para compatibilidade com diferentes dispositivos

## 🛠️ Tecnologias utilizadas

- **Expo** - Framework para desenvolvimento React Native
- **React Native** - Framework para desenvolvimento mobile
- **JavaScript** - Linguagem de programação
- **NativeWind (Tailwind CSS)** - Framework de estilização
- **Axios** - Cliente HTTP para integração com APIs
- **React Navigation** - Navegação entre telas
- **SafeAreaProvider** - Gerenciamento de áreas seguras
- **React Hooks** - Para gerenciamento de estado

## 📁 Estrutura do projeto

```
Darshan-Mobile/
├── App.js                    # Componente principal
├── index.js                  # Entry point com SafeAreaProvider
├── app.json                  # Configurações do Expo
├── package.json              # Dependências e scripts
├── tailwind.config.js        # Configuração do Tailwind CSS
├── metro.config.js           # Configuração do Metro para NativeWind
├── babel.config.js           # Configuração do Babel
├── global.css                # Estilos globais do Tailwind
├── components/               # Componentes reutilizáveis
│   └── Button.js
├── screens/                  # Telas da aplicação
│   └── HomeScreen.js
├── navigation/               # Configuração de navegação
│   └── AppNavigator.js
├── services/                 # Serviços e APIs
│   └── api.js
├── assets/                   # Imagens e recursos
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
└── node_modules/             # Dependências instaladas
```

## 🎨 Personalização

Para personalizar o app:

1. **Cores**: Edite as cores nos estilos em `App.js`
2. **Ícones**: Use outros ícones do Ionicons ou adicione seus próprios
3. **Layout**: Modifique a estrutura JSX e os estilos
4. **Funcionalidades**: Adicione novos componentes e lógica

## 📚 Recursos úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/)
- [Ionicons](https://icons.expo.fyi/)
- [Expo Snack](https://snack.expo.dev/) - Para testes rápidos online

## 🔧 Scripts disponíveis

- `yarn start` - Inicia o servidor de desenvolvimento
- `yarn android` - Executa no Android
- `yarn ios` - Executa no iOS
- `yarn web` - Executa no navegador

## 📝 Próximos passos

1. Configure navegação com Expo Router
2. Adicione gerenciamento de estado (Redux, Context API, etc.)
3. Implemente telas adicionais
4. Adicione testes
5. Configure CI/CD

---

Desenvolvido com ❤️ usando Expo e React Native
