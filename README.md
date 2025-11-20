<h2 align="center">Giphy APP</h2>

<p align="center">
  <img src="https://github.com/user-attachments/assets/682a9d85-30c1-49ce-83e7-2cff9bef7a60" alt="meme" />
</p>


## 📋 Sobre o Projeto

Aplicação web desenvolvida com ReactJS para buscar e exibir GIFs animados da API do Giphy. Inclui funcionalidades de busca, tema dark/light e interface responsiva.

### ✨ Funcionalidades

- 🔍 **Busca de GIFs**: Pesquise GIFs por palavra-chave.
- 🌙 **Tema Dark/Light**: Alternância entre modos claro e escuro com persistência no localStorage.
- 📱 **Responsivo**: Interface adaptável para desktop e mobile.
- ⚡ **Carregamento Rápido**: Utiliza Vite para builds otimizados.

### 🛠️ Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org/) (v19.2.0)
- **Build Tool**: [Vite](https://vitejs.dev/) (v7.2.4)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Alerts**: [SweetAlert2](https://sweetalert2.github.io/)
- **API**: [Giphy API](https://developers.giphy.com/)

## 🚀 Como Rodar

### Pré-requisitos

- Node.js (v16 ou superior)
- Yarn ou npm

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/mvnulman/giphy-app.git
   cd giphy-app
   ```

2. Instale as dependências:

   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Copie `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Adicione sua chave da API do Giphy em `.env`:
     ```
     VITE_GIPHY_API_KEY=sua_chave_aqui
     ```

4. Rode o servidor de desenvolvimento:
   ```bash
   yarn dev
   # ou
   npm run dev
   ```
   Abra [http://localhost:5173](http://localhost:5173) no navegador.

## 📦 Build para Produção

```bash
yarn build
# ou
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

## 🌐 Deploy

O projeto pode ser deployado em plataformas como Vercel, Netlify ou GitHub Pages. Certifique-se de configurar as variáveis de ambiente na plataforma de deploy.

## 📁 Estrutura do Projeto

```
giphy-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Giphy.jsx
│   ├── App.jsx
│   ├── index.jsx
│   ├── index.css
│   └── App.css
├── .env
├── .env.example
├── vite.config.js
├── package.json
└── README.md
```

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE.txt` para mais informações.

<!-- LINKS -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/mvnulman/
[product-screenshot]: images/screenshot.png
