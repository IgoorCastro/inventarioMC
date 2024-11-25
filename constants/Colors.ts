const tintColorLight = '#FF7043'; // Cor vibrante para destacar no tema claro
const tintColorDark = '#FFA726'; // Cor laranja suave para tema escuro

export default {
  light: {
    text: '#4E342E',               // Cor do texto principal
    background: '#FFF3E0',         // Cor de fundo clara
    backgroundModal: 'rgba(250,250,250,1.00)',
    tint: tintColorLight,          // Cor principal para elementos destacados
    tabIconDefault: '#FFF3E0',     // Cor de ícone padrão para harmonizar com o fundo
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFA726',               // Cor de texto para tema escuro
    background: '#1B1B1B',         // Fundo escuro suave
    backgroundModal: '#1B1B1B',
    tint: tintColorDark,           // Laranja vibrante para destaque no tema escuro
    tabIconDefault: '#333',        // Ícone padrão com contraste no fundo escuro
    tabIconSelected: tintColorDark,
  },
};
