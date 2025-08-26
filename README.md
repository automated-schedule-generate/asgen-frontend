# ASGen Frontend

Interface web para o Sistema de Geração Automática de Horários Acadêmicos do Instituto Federal de Pernambuco (IFPE).

## 📋 Sobre o Projeto

O ASGen Frontend é uma aplicação web moderna desenvolvida com Nuxt 3 e Vue.js que fornece uma interface intuitiva e responsiva para o sistema de geração automática de horários acadêmicos. A aplicação permite que coordenadores, professores e administradores gerenciem cursos, disciplinas, professores, salas e gerem horários de forma automatizada.

## 🚀 Tecnologias Utilizadas

### Core Technologies
- **Framework**: Nuxt 3 (v4.0+)
- **Frontend Framework**: Vue.js (latest)
- **Linguagem**: TypeScript
- **UI Framework**: Vuetify 3.9
- **Estado Global**: Pinia
- **Build Tool**: Vite

### Bibliotecas Principais
- **HTTP Client**: Axios
- **Icons**: Material Design Icons (@mdi/font)
- **Notifications**: SweetAlert2
- **Real-time**: Socket.io Client
- **Drag & Drop**: SortableJS
- **Input Masking**: Vue The Mask
- **Styling**: SCSS/Sass

### Ferramentas de Desenvolvimento
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript + Vue TSC
- **Package Manager**: Yarn
- **Containerização**: Docker

## 🏗️ Arquitetura do Sistema

### Estrutura de Diretórios

```
asgen-frontend/
├── app/
│   ├── assets/              # Assets estáticos (SCSS, imagens)
│   ├── components/          # Componentes Vue reutilizáveis
│   ├── layouts/            # Layouts da aplicação
│   ├── pages/              # Páginas da aplicação (file-based routing)
│   ├── plugins/            # Plugins do Nuxt
│   ├── services/           # Serviços de API e lógica de negócio
│   ├── stores/             # Stores do Pinia para gerenciamento de estado
│   ├── types/              # Definições de tipos TypeScript
│   └── app.vue             # Componente raiz da aplicação
├── public/                 # Assets públicos
├── server/                 # API routes do Nuxt
├── docker/                 # Configurações Docker
├── nuxt.config.ts         # Configuração do Nuxt
├── vuetify.config.ts      # Configuração do Vuetify
└── package.json           # Dependências e scripts
```

### Principais Funcionalidades

#### 🏠 Dashboard
- Painel principal com visão geral do sistema
- Acesso rápido às principais funcionalidades
- Estatísticas e indicadores

#### 👤 Autenticação e Autorização
- **Login/Logout**: Sistema de autenticação completo
- **Registro**: Cadastro de novos usuários
- **Verificação**: Verificação por código via email
- **Níveis de Acesso**: 
  - DEN (Diretoria de Ensino)
  - CRADT (Coordenação)
  - Professor
  - Coordenador

#### 🎓 Gestão Acadêmica
- **Cursos**: CRUD completo de cursos
- **Disciplinas**: Gerenciamento de disciplinas
- **Professores**: Cadastro e gerenciamento de professores
- **Turmas**: Gestão de turmas/classes
- **Salas**: Gerenciamento de salas de aula

#### 📅 Geração de Horários
- **Gerador Automático**: Interface para geração automática de horários
- **Visualização**: Exibição de horários em formato de grade
- **Edição Manual**: Possibilidade de ajustes manuais
- **Preferências**: Sistema de preferências de professores

#### 🛠️ Ferramentas Administrativas
- Ferramentas específicas para cada tipo de usuário
- Relatórios e exportações
- Configurações do sistema

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- Yarn (recomendado)
- Docker & Docker Compose (opcional)

### Instalação Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd asgen-frontend
   ```

2. **Configuração do ambiente**
   ```bash
   cp .env.example .env
   ```

3. **Configure as variáveis de ambiente**
   ```env
   # URL da API REST (backend)
   VITE_API_URL=http://localhost

   # URL do microsserviço de geração de horários  
   VITE_MICROSERVICE_URL=http://localhost:9000

   # Configurações do Docker (se usando)
   USER_ID=1000
   GROUP_ID=1000
   ```

4. **Instale as dependências**
   ```bash
   yarn install
   
   # ou com npm
   npm install
   ```

5. **Execute a aplicação**
   ```bash
   yarn dev
   
   # ou com npm
   npm run dev
   ```

6. **Acesse a aplicação**
   - Desenvolvimento: `http://localhost:3000`

### Instalação com Docker

1. **Configure o ambiente**
   ```bash
   cp .env.example .env
   # Edite as variáveis conforme necessário
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🚀 Comandos de Execução

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
yarn dev
npm run dev

# Servidor de desenvolvimento com hot reload
# Acesse: http://localhost:3000
```

### Build e Deploy

```bash
# Build para produção
yarn build
npm run build

# Preview da build de produção
yarn preview
npm run preview

# Gerar site estático (SSG)
yarn generate
npm run generate
```

### Qualidade de Código

```bash
# Executar linter
yarn lint
npm run lint

# Corrigir problemas de lint automaticamente
yarn lint:fix
npm run lint:fix

# Formatação de código com Prettier
yarn format
npm run format

# Type checking
yarn typecheck
npm run typecheck
```

### Docker

```bash
# Executar com Docker
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Executar comandos dentro do container
docker-compose exec app yarn dev
```

## 🎨 Componentes e Arquitetura

### Componentes Principais

#### 🏠 Layout Components
- **AppHeader**: Cabeçalho da aplicação com navegação
- **AppHeaderHome**: Cabeçalho específico da home
- **AppFooter**: Rodapé da aplicação
- **BackButton**: Botão de voltar

#### 🔐 Authentication Components
- **AuthComponent**: Componente principal de autenticação
- **Home**: Página inicial com opções de login/registro

#### 📚 Academic Management Components
- **CreateSubject**: Formulário de criação de disciplinas
- **Tools**: Ferramentas administrativas

#### 📅 Timetable Components
- **timetable-generator/index**: Interface principal do gerador
- **timetable-generator/OfCourse**: Geração por curso
- **timetable-generator/OfSemester**: Geração por semestre
- **course-timetable/render**: Renderização de horários

### Gerenciamento de Estado (Pinia Stores)

#### User Store
```typescript path=/home/guilherme/projects/ifpe/asgen/asgen-frontend/app/stores/use-user-store.ts start=3
export default defineStore('user', () => {
    const user = ref({
        name: '',
        email: '',
        id: 0,
    });
    const permiss = ref({
        isDen: false,
        isCradt: false,
        isTeacher: false,
        isCoordinator: false,
    });
    
    async function getPermiss() {
        // Lógica para obter permissões do usuário
    }
    
    function resetDatas() {
        // Reset dos dados do usuário
    }
    
    return { user, resetDatas, permiss, getPermiss };
});
```

### Services (Camada de API)

#### Estrutura dos Services
```typescript path=null start=null
// authService.ts - Autenticação
class AuthService {
    async register(name, email, registration, cpf, password) {}
    async login(email, password) {}
    async logout() {}
    async verify(code) {}
}

// coursesService.ts - Cursos
class CoursesService {
    async getCourses() {}
    async createCourse(course) {}
    async updateCourse(id, course) {}
    async deleteCourse(id) {}
}

// timetableGeneratorService.ts - Geração de Horários
class TimetableGeneratorService {
    async generateTimetable(params) {}
    async getTimetables() {}
    async saveTimetable(timetable) {}
}
```

### Layouts

- **default.vue**: Layout padrão com header, footer e navegação
- **empty.vue**: Layout vazio para páginas como login/registro

### Pages (Roteamento)

```
pages/
├── index.vue              # Página inicial
├── dashboard.vue          # Dashboard principal
├── adm/                   # Páginas administrativas
├── courses/               # Gestão de cursos
│   ├── index.vue         # Lista de cursos
│   └── [id].vue          # Detalhes do curso
├── subjects/             # Gestão de disciplinas
├── teachers/             # Gestão de professores
├── classes/              # Gestão de turmas
├── den/                  # Páginas específicas da DEN
└── timetable-generator/  # Gerador de horários
```

## 🎨 Estilos e Temas

### Configuração do Vuetify

```typescript path=/home/guilherme/projects/ifpe/asgen/asgen-frontend/nuxt.config.ts start=48
vuetify: {
    moduleOptions: {
        ssrClientHints: {
            reloadOnFirstRequest: false,
            viewportSize: true,
            prefersColorScheme: false,
        },
        styles: {
            configFile: 'assets/settings.scss',
        },
    },
}
```

### Customização de Estilos

- **Global Styles**: `app/assets/settings.scss`
- **Vuetify Customization**: Cores, tipografia e componentes
- **Responsive Design**: Mobile-first approach
- **Acessibilidade**: Suporte ao VLibras integrado

## 🔌 Integrações

### API REST (Backend)
- **Base URL**: Configurada via `VITE_API_URL`
- **Autenticação**: Bearer token via Axios interceptors
- **Endpoints**: Services organizados por domínio

### Microsserviço de Horários
- **URL**: Configurada via `VITE_MICROSERVICE_URL`
- **Funcionalidade**: Geração automática de horários
- **Comunicação**: HTTP REST API

### WebSockets (Socket.io)
- **Real-time Updates**: Atualizações em tempo real
- **Notifications**: Sistema de notificações

## 📱 Responsividade e UX

### Breakpoints (Vuetify)
- **xs**: < 600px (Mobile)
- **sm**: 600px - 960px (Tablet)
- **md**: 960px - 1264px (Desktop pequeno)
- **lg**: 1264px - 1904px (Desktop)
- **xl**: > 1904px (Desktop grande)

### Acessibilidade
- **VLibras**: Integração com tradutor de Libras
- **Semantic HTML**: Estrutura semântica
- **ARIA Labels**: Labels para leitores de tela
- **Keyboard Navigation**: Navegação via teclado

## 🔒 Autenticação e Autorização

### Fluxo de Autenticação
1. **Login**: Email e senha
2. **Token**: JWT armazenado no localStorage
3. **Middleware**: Verificação automática de rotas protegidas
4. **Refresh**: Auto-renovação de tokens

### Níveis de Permissão
- **DEN**: Acesso total ao sistema
- **CRADT**: Coordenação acadêmica
- **Teacher**: Professores (preferências e horários)
- **Coordinator**: Coordenadores de curso

### Proteção de Rotas
```typescript path=null start=null
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    
    if (!userStore.isAuthenticated) {
        return navigateTo('/');
    }
    
    // Verificação de permissões específicas
    if (to.path.startsWith('/adm') && !userStore.permiss.isDen) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Acesso negado'
        });
    }
});
```

## 🧪 Testes e Qualidade

### Linting e Formatação
```bash
# ESLint com configuração customizada
yarn lint

# Prettier para formatação
yarn format

# Verificação de tipos TypeScript
yarn typecheck
```

### Estrutura de Qualidade
- **ESLint**: Regras de código JavaScript/TypeScript
- **Prettier**: Formatação consistente
- **TypeScript**: Tipagem estática
- **Vue TSC**: Verificação de tipos em componentes Vue

## 🚀 Deploy e Produção

### Build para Produção
```bash
# Build otimizada
yarn build

# Gerar arquivos estáticos (SSG)
yarn generate
```

### Variáveis de Ambiente (Produção)
```env
VITE_API_URL=https://api.exemplo.com
VITE_MICROSERVICE_URL=https://microservice.exemplo.com
NODE_ENV=production
```

### Docker em Produção
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "preview"]
```

### Otimizações
- **Code Splitting**: Divisão automática de código
- **Tree Shaking**: Remoção de código não utilizado
- **Image Optimization**: Otimização de imagens via @nuxt/image
- **SEO**: Meta tags e structured data

## 📊 Monitoramento e Performance

### Bundle Analysis
```bash
# Analisar tamanho do bundle
yarn build --analyze
```

### Performance Features
- **SSG**: Static Site Generation quando possível
- **Lazy Loading**: Carregamento sob demanda
- **Image Optimization**: @nuxt/image integration
- **PWA Ready**: Preparado para Progressive Web App

## 🤝 Contribuição

### Padrões de Desenvolvimento

#### Estrutura de Componentes
```vue
<template>
  <!-- HTML template -->
</template>

<script lang="ts" setup>
// Composition API
// Props, emits, computed, methods
</script>

<style lang="scss" scoped>
// Estilos com escopo
</style>
```

#### Nomenclatura
- **Componentes**: PascalCase (`MyComponent.vue`)
- **Páginas**: kebab-case (`user-profile.vue`)
- **Stores**: camelCase (`useUserStore`)
- **Services**: camelCase (`authService`)

#### Git Workflow
1. Fork o projeto
2. Crie uma branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Commits Convencionais
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, ponto e vírgula
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Tarefas de build, configurações

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## 🆘 Suporte

Para suporte e dúvidas:
- 📧 Entre em contato com a equipe de desenvolvimento
- 🐛 Abra uma issue no repositório
- 📚 Consulte a documentação:
  - [Nuxt 3](https://nuxt.com/docs)
  - [Vue.js](https://vuejs.org/guide/)
  - [Vuetify](https://vuetifyjs.com/en/)
  - [Pinia](https://pinia.vuejs.org/)

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Dark Mode**: Tema escuro
- [ ] **Offline Support**: Suporte offline com cache
- [ ] **Push Notifications**: Notificações push
- [ ] **Mobile App**: Versão mobile nativa
- [ ] **Multi-idioma**: Internacionalização (i18n)
- [ ] **Advanced Reports**: Relatórios avançados com gráficos
- [ ] **Calendar Integration**: Integração com calendários
- [ ] **Real-time Collaboration**: Colaboração em tempo real
- [ ] **Voice Commands**: Comandos por voz (acessibilidade)

### Melhorias Técnicas
- [ ] **Test Coverage**: Testes unitários e E2E
- [ ] **Performance**: Otimizações adicionais
- [ ] **Security**: Melhorias de segurança
- [ ] **Documentation**: Documentação técnica completa
- [ ] **CI/CD**: Pipeline de integração contínua
- [ ] **Monitoring**: Sistema de monitoramento
- [ ] **Error Tracking**: Rastreamento de erros

---

Desenvolvido com ❤️ pela equipe do IFPE

**Stack**: Nuxt 3 + Vue.js + TypeScript + Vuetify + Pinia
