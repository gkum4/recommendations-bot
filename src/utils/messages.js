const User = require("../models/User");

const firstEntrance = `Olá, sou seu bot de lembretes de leitura acadêmica! 
A partir de palavras chave e com um horário programado, lhe enviarei mensagens ` +
`com recomendações de artigos científicos super interessantes do site do Scielo!
É só digitar a senha para continuar.`;

const firstWelcome = 'Tudo certo! Seja bem vindo! Para receber recomendações ' +
'programadas, salve as palavras chave/expressões que tem interesse. Além disso' +
', configure o horário e os dias da semana em que deseja receber a notificação' +
'(digite /ajuda para mostrar a lista de comandos)';

const incorrectPassword = 'Senha incorreta, tente novamente.';

const welcomeBack = `Bem vindo de volta!
Em que posso lhe ajudar? (digite /ajuda para mostrar a lista de comandos)`;

const commandList = `Lista de comandos:
/meusDados - mostra todos os seus dados salvos (id, nome, lista de expressões` +
` de busca, horário de envio e dias da semana para envio);
/addNovaBusca - adiciona uma nova expressão de busca;
/removerBusca - remove uma expressão de busca;
/programarNumeroDeSugestoes - programa o número de sugestões que serão enviadas` +
` (o padrão é 5 e o máximo é 10);
/programarHorario - adiciona um novo horário para o envio das sugestões` +
`(exclui o registro antigo);
/programarDias - adiciona os dias da semana em que as sugestões serão` +
`enviadas (exclui o registro antigo);
/queroSugestaoAgora - irei lhe sugerir artigos agora mesmo;
/excluir - seus registros são apagados e vc tem de digitar /start ` +
`para voltar a utilizar o bot;`;

const showUserData = (user = User) => `Aqui estão seus dados:
id: ${!!user.getId() ? user.getId() : 'não definido'}
nome: ${!!user.getName() ? user.getName() : 'não definido'}
expressões de busca: ${user.getWordsToSearch().length !== 0 ?
  user.getWordsToSearch().join(', ') :
  'não definido'
}
horário do envio: ${!!user.getTimeToSendMessage() ?
  user.getTimeToSendMessage() :
  'não definido'
}
dias para enviar:
  dom - ${user.getDaysToSendMessage()[0] ? 'sim' : 'não'}
  seg - ${user.getDaysToSendMessage()[1] ? 'sim' : 'não'}
  ter - ${user.getDaysToSendMessage()[2] ? 'sim' : 'não'}
  qua - ${user.getDaysToSendMessage()[3] ? 'sim' : 'não'}
  qui - ${user.getDaysToSendMessage()[4] ? 'sim' : 'não'}
  sex - ${user.getDaysToSendMessage()[5] ? 'sim' : 'não'}
  sáb - ${user.getDaysToSendMessage()[6] ? 'sim' : 'não'}`

const addNewSearch = `Digite o nome de uma palavra chave ou de uma frase para` +
` ser pesquisada no site do Scielo:`

const removeSearch = `Digite o nome da palavra ou da expressão que deseja remover.`;

const programNumberOfSuggestions = 'Digite o número de sugestões que deseja receber.'

const programTime = `Envie o horário em que deseja receber sugestões no seguinte` +
` formato: 00:00 (por exemplo 21:05):`

const programDays = `Envie a seguinte tabela preenchida com [x] para ` +
`adicionar os dias da semana que deseja receber sugestões:`

const programDaysTable = `dom - sim[] não[]
seg - sim[] não[]
ter - sim[] não[]
qua - sim[] não[]
qui - sim[] não[]
sex - sim[] não[]
sab - sim[] não[]`;

const successSet = 'Dados salvos com sucesso!';

const errorSet = 'Algum erro ocorreu... Verifique os dados e tente' +
' enviar novamente.';

const emptySearchWords = `Você ainda não tem expressões salvas. Digite ` +
`/addNovaBusca para adicionar.`;

const searchResult = `Aqui vão suas sugestões de leitura:`;

const errorSearch = 'Algum erro ocorreu ao pesquisar pelos artigos. Tente novamente.';

const successExclude = 'Seus dados foram excluídos com sucesso!';

const invalidCommand = 'Comando inválido. Digite /ajuda para ver a lista do que' +
' você pode fazer.';

const dontUnderstand = 'Não entendi... Digite /ajuda para ver a lista do que' +
' você pode fazer.';


module.exports = {
  firstEntrance,
  firstWelcome,
  incorrectPassword,
  welcomeBack,
  commandList,
  showUserData,
  addNewSearch,
  removeSearch,
  programNumberOfSuggestions,
  programTime,
  programDays,
  programDaysTable,
  successSet,
  errorSet,
  emptySearchWords,
  searchResult,
  errorSearch,
  successExclude,
  invalidCommand,
  dontUnderstand,
};