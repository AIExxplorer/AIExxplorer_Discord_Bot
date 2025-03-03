# AIExxplorer_Discord_Bot# AIExxplorer Discord Bot 🚀

O **AIExxplorer Discord Bot** é uma solução inovadora para potencializar a organização e interatividade dos servidores do Discord. Com uma interface intuitiva e funcionalidades avançadas, o bot atua na automação de tarefas, controle de mensagens, integração com webhooks e, de forma diferenciada, na busca de materiais de estudo e livros 📚 de acervos especializados hospedados no GitHub.

## 🎯 Objetivos do Projeto

- **Automação e Organização:** Automatize a moderação e o gerenciamento do servidor, incluindo a remoção de spam e a contagem de mensagens.
- **Busca de Materiais:** Permite aos usuários buscar e acessar livros (PDF, EPUB, imagens) diretamente dos acervos:
  - **ACERVO DE TECNOLOGIA** (ex.: Concursos, Cursos de Programação, Redes Sociais, SEO, Soft Skills, Startup, TI e Desenvolvimento)
  - **ACERVO DE PSICOLOGIA**
  - **ACERVO DE MEDICINA VETERINÁRIA**
- **Integração com APIs e Escalabilidade:** Futuramente, o bot poderá se integrar a APIs externas e aplicações em Python para expandir suas funcionalidades e oferecer uma experiência ainda mais completa e interativa.

## 💡 Diferenciais

- **Integração Total com GitHub:** Busca eficiente e customizável nos repositórios dos acervos, permitindo a atualização contínua de materiais.
- **Futuro Escalável:** Estrutura preparada para integrar novas APIs e expandir as funcionalidades para outras áreas de estudo e serviços.
- **Automação Inteligente:** Controle de spam, contagem de mensagens e gestão de usuários para uma administração mais efetiva do servidor.
- **Experiência Inovadora:** Uso de comandos interativos (Slash Commands) e integrações web que trazem modernidade para o ambiente Discord.

## 🚀 Tecnologias Utilizadas

- **Node.js** com [discord.js](https://discord.js.org/) para comunicação com a API do Discord.
- **Axios** para requisições HTTP e integração com a API do GitHub.
- **dotenv** para gerenciamento seguro de variáveis de ambiente.

## 📂 Estrutura do Projeto

```plaintext
AIExxplorer_Discord_Bot
 ┣ src
 ┃ ┣ commands
 ┃ ┃ ┗ bookSearch.js        # Comando para buscar materiais nos acervos
 ┃ ┣ events
 ┃ ┃ ┣ interactionCreate.js # Gerencia interações de comandos
 ┃ ┃ ┗ ready.js             # Evento disparado ao bot estar online
 ┃ ┗ index.js               # Arquivo principal do bot
 ┣ deploy-commands.js         # Script para registrar os comandos no Discord
 ┣ .env                     # Variáveis de ambiente (não versionar)
 ┣ .gitignore               # Arquivo para ignorar arquivos/pastas desnecessárias
 ┣ package.json             # Configurações e dependências do projeto
 ┣ README.md                # Este arquivo
 ┗ ...
