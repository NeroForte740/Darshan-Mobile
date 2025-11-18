# Darshan Mobile

O aplicativo mobile foi desenvolvido com Expo + React Native (TypeScript) para gestão de pedidos, contendo listagem, adição, edição, cancelamento, finalização e, também, autenticação.

## 🚀 Executando o projeto

### Pré-requisitos

- Node.js 20+
- Yarn
- Expo CLI global

```bash
yarn global add @expo/cli
```

### Instalação

```bash
yarn install
```

### Rodando

- Iniciar servidor: `yarn start`
- Android: `yarn android`
- iOS: `yarn ios`
- Web: `yarn web`

### Configuração de API

O arquivo `services/api.ts` define a `baseURL` da API. Para desenvolvimento, ajuste para o IP da sua rede ou do emulador:

- Emulador Android: `http://10.0.2.2:<porta>`
- iOS Simulator / dispositivo na mesma rede: `http://<seu-ip-local>:<porta>`

## 🧪 Testes

- Rodar testes: `yarn test`

Stack de testes:
- Jest (via `jest-expo`)
- Testing Library React Native + Jest Native
- `jest.setup.js` inclui mocks para navegação, ícones e libs nativas necessárias

## 📁 Estrutura do projeto

```
Darshan-Mobile/
├── 📱 App & Config
│   ├── App.tsx
│   ├── index.ts
│   └── app.json
├── 🎨 Components & UI
│   ├── components/         # Componentes reutilizáveis
│   ├── screens/            # Telas da aplicação
│   └── styles/             # Sistema de design
├── 🔧 Services & Logic
│   ├── services/           # Integrações com API
│   ├── hooks/              # Custom hooks
│   └── models/             # Modelos de dados
├── 🧭 Navigation
│   └── navigation/         # Configuração de rotas
├── 🛠️ Utils & Assets
│   ├── utils/              # Funções auxiliares
│   └── assets/             # Recursos estáticos
└── ✅ Tests
    └── __tests__/          # Testes unitários
```

## 📱 Funcionalidades

- Autenticação (login)
- Lista de pedidos com abas: Hoje e Outros
- Seleção de pedido e ações: cancelar, finalizar, editar, adicionar
- Criação e edição de pedido
- Cancelamento e finalização de pedido
- Componentes reutilizáveis (input, picker, botão, modal)

## 🛠️ Tecnologias

- Expo SDK 54
- React Native 0.81
- React 19
- TypeScript
- Axios
- Testing Library React Native, Jest Native, Jest Expo

## 🔄 CI

CI com GitHub Actions roda os testes em `push`/`pull_request` para `main` (Node 20.x e 22.x). Workflow em `.github/workflows/ci.yml`.