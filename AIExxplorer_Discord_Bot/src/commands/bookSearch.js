const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('booksearch')
    .setDescription('Busca livros e materiais nos acervos do AIExxplorer.')
    .addStringOption(option => 
      option.setName('acervo')
        .setDescription('Escolha o acervo desejado')
        .setRequired(true)
        .addChoices(
          { name: 'Tecnologia', value: 'ACERVO_DE_TECNOLOGIA' },
          { name: 'Psicologia', value: 'ACERVO_DE_PSICOLOGIA' },
          { name: 'Medicina Veterinária', value: 'ACERVO_DE_MEDICINA_VETERINARIA' }
        ))
    .addStringOption(option => 
      option.setName('pasta')
        .setDescription('Informe a pasta ou subcategoria desejada (deixe em branco para buscar na raiz)')
        .setRequired(false))
    .addStringOption(option => 
      option.setName('termo')
        .setDescription('Termo de busca para filtrar os arquivos')
        .setRequired(false)),
  
  async execute(interaction) {
    const acervo = interaction.options.getString('acervo');
    const pasta = interaction.options.getString('pasta') || ''; // pasta opcional
    const termo = interaction.options.getString('termo') || '';

    // Define a URL base para o repositório escolhido
    const baseUrl = `https://api.github.com/repos/AIExxplorer/${acervo}/contents`;
    let url = baseUrl;
    if (pasta) {
      // Constrói o caminho considerando a pasta/subcategoria (codificada para URL)
      url += `/${encodeURIComponent(pasta)}`;
    }

    try {
      // Consulta o GitHub pela listagem de arquivos na URL especificada
      const response = await axios.get(url, {
        headers: {
          // Se possuir GITHUB_TOKEN (armazenado no .env), inclua-o para aumentar os limites de requisição.
          Authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined,
        },
      });

      // Define as extensões válidas para os arquivos
      const validExtensions = ['.pdf', '.epub', '.jpg', '.jpeg', '.png', '.gif'];
      const files = response.data.filter(file => {
        // Filtra apenas os arquivos (ignora diretórios)
        if (file.type !== 'file') return false;
        // Se o usuário forneceu um termo, filtra os arquivos que contenham esse termo (case insensitive)
        if (termo && !file.name.toLowerCase().includes(termo.toLowerCase())) return false;
        // Retorna true se o arquivo tiver uma extensão válida
        return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
      });

      if (files.length === 0) {
        await interaction.reply(`Nenhum arquivo encontrado no acervo **${acervo}**${pasta ? ` na pasta "${pasta}"` : ''}${termo ? ` com o termo "${termo}"` : ''}.`);
        return;
      }

      let message = `**Arquivos encontrados no acervo ${acervo}${pasta ? `, pasta "${pasta}"` : ''}:**\n`;
      files.forEach(file => {
        message += `• [${file.name}](${file.download_url})\n`;
      });

      await interaction.reply(message);
    } catch (error) {
      console.error(error);
      await interaction.reply(`Erro ao buscar arquivos no acervo **${acervo}**${pasta ? ` na pasta "${pasta}"` : ''}. Verifique se o caminho informado está correto.`);
    }
  },
};
