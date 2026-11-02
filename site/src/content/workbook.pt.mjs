export default {
  lang: 'pt',
  title: 'Mise en Place',
  subtitle: 'O Caderno de Trabalho',
  tagline: 'Um método de planejamento para quem vive várias vidas ao mesmo tempo',
  owner: 'Este caderno pertence a',
  started: 'Comecei em',
  contents: 'Sumário',
  module: 'Módulo',
  idea: 'A ideia',
  keys: 'Para lembrar',
  exercise: 'Exercício',
  practice: 'Prática da semana',
  tools: 'Ferramentas',
  toolsIntro: 'Copie estas páginas quantas vezes precisar. São as peças que fazem o método funcionar.',
  scaleLow: 'raramente',
  scaleHigh: 'quase sempre',
  intro: {
    title: 'Antes de começar',
    body: [
      'Toda boa cozinha começa do mesmo jeito. Antes do serviço, o cozinheiro deixa pronto tudo o que a noite vai pedir: facas afiadas, molhos reduzidos, bancada limpa. Quando o movimento aperta, ele não pensa em logística. Pensa no prato.',
      'Este caderno leva essa disciplina para a vida profissional. Ele se apoia em três perguntas, feitas antes de qualquer ação: <b>Resultado</b> — o que eu realmente quero? <b>Razão</b> — por que isso importa para mim? <b>Rota</b> — qual é o caminho mais simples até lá?',
      'Escreva nele. Os exercícios são curtos de propósito, e é na escrita que a mudança acontece. Um módulo por semana é o ritmo certo para a maioria das pessoas.',
    ],
  },
  modules: [
    {
      n: 0, title: 'Orientação',
      idea: 'Saiba de onde você está partindo.',
      body: ['Responda rápido. Aqui, o primeiro instinto vale mais do que a resposta pensada. Você vai se avaliar de novo no fim do Módulo 7.'],
      exercises: [
        { title: 'Seu ponto de partida', intro: 'Dê uma nota de 1 (raramente verdade) a 5 (quase sempre verdade) para cada frase.', fields: [
          { t: 'scale', items: [
            'No início da maioria dos dias, sei quais são as três coisas mais importantes.',
            'No fim da maioria das semanas, sinto que fiz algo importante avançar.',
            'Minha agenda reflete o que digo serem minhas prioridades.',
            'Passo a maior parte do meu tempo de trabalho em tarefas que só eu posso fazer.',
            'Tenho tempo regular para as pessoas e as coisas que me recarregam.',
            'Quando meus planos desmoronam, consigo refazê-los rápido.',
            'Sei por que meus principais objetivos de hoje importam para mim.',
          ] },
          { t: 'lines', label: 'Total (de 35)', n: 1 },
        ] },
        { title: 'Complete as frases', fields: [
          { t: 'lines', label: 'A área da minha vida que recebe menos atenção intencional é…', n: 2 },
          { t: 'lines', label: 'Aquilo que vivo dizendo que vou fazer é…', n: 2 },
          { t: 'lines', label: 'Fico no meu melhor quando…', n: 2 },
          { t: 'lines', label: 'Meu motivo específico para fazer este curso é…', n: 2 },
        ] },
      ],
      practice: 'Durante três dias, repare nos momentos em que você se sente ocupado, mas não útil. Anote uma palavra a cada vez.',
    },
    {
      n: 1, title: 'Planejar é Projetar',
      idea: 'Um plano não é uma lista do que você vai fazer. É uma decisão sobre que tipo de vida você está construindo.',
      body: [
        'A maior parte do planejamento mantém você organizado dentro da vida que já tem. Projetar começa em outro lugar: na experiência que você quer criar, voltando até os detalhes que vão produzi-la.',
        'Por isso, toda sessão de planejamento começa com outra pergunta. Não “o que eu preciso fazer?”, e sim “o que eu quero que seja verdade?”.',
      ],
      keys: ['Estar ocupado não é o mesmo que avançar.', 'O “deveria” raramente acontece. A mudança começa quando um padrão deixa de ser aceitável — quando o “deveria” vira “preciso”.', 'Dê nomes próprios às áreas da sua vida. Nomes com a sua cara prendem a sua atenção.'],
      exercises: [
        { title: 'A lista longa', intro: 'Doze minutos, sem parar. Tudo o que você gostaria de ser, fazer, ter, aprender, viver ou oferecer. Depois, ao lado de cada item, um prazo: 1, 3, 5, 10 ou 20 anos. Circule os quatro ou cinco itens de um ano que mais empolgam você.', fields: [{ t: 'lines', n: 14 }] },
        { title: 'Seu Mapa de Vida', intro: 'De cinco a sete áreas. Escreva a visão no presente, como se já fosse verdade.', fields: [{ t: 'table', cols: ['Área', 'Visão', 'Padrão atual', 'Papel no meu melhor', 'Nota /10'], rows: 7, tall: true }] },
        { title: 'A distância', fields: [
          { t: 'lines', label: 'Qual área, se melhorasse dois pontos, elevaria todas as outras? (Esta é sua área-guia.)', n: 2 },
          { t: 'lines', label: 'Qual área venho deixando de lado, em silêncio, porque outra grita mais alto?', n: 2 },
          { t: 'lines', label: 'Qual padrão atual já não é aceitável para mim?', n: 2 },
        ] },
      ],
      practice: 'Leia seu Mapa de Vida toda manhã, antes de abrir qualquer mensagem. Noventa segundos.',
    },
    {
      n: 2, title: 'Por que as Listas Falham',
      idea: 'Uma lista diz o que fazer. Não diz por quê — e, por isso, não diz o que importa.',
      body: [
        'Listas guardam tarefas, não resultados. Crescem mais rápido do que você consegue zerar, favorecem quem pediu por último e não trazem nenhum motivo para agir hoje em vez de na semana que vem.',
        'O tempo também é sentido, não só medido. Uma hora de clareza e uma hora de ansiedade são iguais no relógio e muito diferentes na vida. Clareza cria tempo.',
      ],
      keys: ['A sobrecarga é um sinal de que você está tentando resolver tudo ao mesmo tempo. A saída é escolher.', '“Não tenho tempo” muitas vezes é um estado, não um fato. Experimente “isso não é prioridade agora”.', 'O jeito mais rápido de fazer mais é fazer menos. Decida de antemão o que você não vai fazer.'],
      exercises: [
        { title: 'Autópsia da lista', intro: 'Marque cada item da sua lista atual: R (faz uma visão avançar), M (manutenção), O (prioridade de outra pessoa), ? (já não lembro por quê).', fields: [{ t: 'table', cols: ['R', 'M', 'O', '?', 'Total'], rows: 1 }] },
        { title: 'Diário da reatividade — cinco noites', fields: [{ t: 'table', cols: ['Dia', 'O mais importante que avancei', 'Tempo que não precisava ser meu', 'Quando me senti no controle'], rows: 5, tall: true }, { t: 'lines', label: 'Três padrões que percebo', n: 3 }] },
        { title: 'Sua lista do que não fazer', intro: 'Pelo menos sete coisas que você decidiu parar de fazer.', fields: [{ t: 'list', n: 7 }] },
      ],
      practice: 'Toda manhã, antes de olhar sua lista, escreva: “Hoje vai ser um bom dia se…”. Faça primeiro o item que corresponde.',
    },
    {
      n: 3, title: 'As Três Perguntas',
      idea: 'Decida o que você quer e por quê antes de decidir o que fazer. O plano fica mais curto, mais claro e mais fácil de seguir.',
      body: [
        '<b>Resultado</b> é um desfecho, não uma atividade: algo que dá para ver e confirmar que foi feito. <b>Razão</b> é o combustível — pessoal, emocional e escrita em mais de uma camada. <b>Rota</b> é a lista curta de ações, com as poucas essenciais marcadas como inegociáveis.',
        'Uma Razão completa olha os dois lados: o que você ganha se fizer e quanto custa se tudo continuar como está. Comece pelo que você quer; use o custo como empurrão quando a vontade não bastar.',
      ],
      keys: ['Cinco testes de um Resultado: é um desfecho, é específico, depende de você, tem o tamanho certo — e puxa você?', 'Se só pudesse fazer duas ações da Rota, quais seriam?', 'Antes de toda reunião, combine primeiro o resultado.'],
      exercises: [
        { title: 'Um plano completo', intro: 'Escreva um para sua área-guia. Copie esta página para um plano de trabalho e um pessoal.', fields: [
          { t: 'lines', label: 'Resultado', n: 2 },
          { t: 'lines', label: 'O que eu ganho', n: 3 },
          { t: 'lines', label: 'Quanto me custa não fazer', n: 2 },
          { t: 'lines', label: 'Quais dos meus valores isso atende', n: 1 },
          { t: 'table', cols: ['Ação', 'Essencial', 'Tempo', 'Quem', 'Quando'], rows: 7 },
        ] },
        { title: 'Traduzindo tarefas', intro: 'Pegue dez itens da sua lista. Pergunte “a que resultado isso serve?” até chegar a algo que importe — ou a nada.', fields: [{ t: 'table', cols: ['Tarefa', 'O resultado por trás', 'Manter / Manutenção / Apagar'], rows: 10 }] },
      ],
      practice: 'Antes de qualquer bloco de trabalho com mais de 30 minutos, escreva na margem: Resultado, Razão, Rota. Uma linha para cada.',
    },
    {
      n: 4, title: 'Do Registro ao Compromisso',
      idea: 'Uma vez por semana, esvazie a cabeça, agrupe tudo pelo resultado que serve e se comprometa com o essencial.',
      body: [
        'A Mise en Place Semanal leva sessenta minutos e tem cinco etapas: registrar, agrupar, planejar, comprometer, preparar. Se você guardar um único hábito deste curso, que seja este.',
        'Antes de agrupar, decida uma vez sobre cada item: descartar, delegar, fazer (se levar menos de dois minutos), agendar, arquivar ou impedir que volte. Um terço da maioria das listas some aqui.',
      ],
      keys: ['Dê às tarefas essenciais as suas melhores horas, antes da caixa de entrada.', 'Proteja todos os dias pelo menos uma tarefa importante e não urgente. É ali que o futuro é construído.', 'Um “não” claro e cordial gera mais confiança do que um “sim” que você não consegue cumprir.'],
      exercises: [
        { title: 'Sua primeira sessão semanal', intro: 'Use a ferramenta Mise en Place Semanal, no fim do caderno. Depois, reflita.', fields: [
          { t: 'table', cols: ['Itens registrados', 'Grupos formados', 'Horas essenciais antes do corte', 'Depois do corte'], rows: 1 },
          { t: 'lines', label: 'Como me senti no início — e no fim', n: 3 },
        ] },
        { title: 'Triagem', intro: 'P1: consequência séria se não for hoje. P2: alto valor, sem urgência. P3: alguém vai se decepcionar um dia. P4: não faz diferença.', fields: [{ t: 'table', cols: ['P1', 'P2', 'P3', 'P4'], rows: 5 }] },
        { title: 'Um “não” que preciso dizer', fields: [{ t: 'lines', label: 'O pedido', n: 1 }, { t: 'lines', label: 'O que vou dizer — cordial, claro, em menos de sessenta palavras', n: 3 }] },
      ],
      practice: 'Preencha o Cartão do Dia toda manhã, antes de abrir os e-mails. Proteja um bloco de tempo essencial em todo dia útil.',
    },
    {
      n: 5, title: 'Alavancagem',
      idea: 'Seu tempo deve ir para onde só você agrega valor. O resto pode ser cortado, simplificado, sistematizado, delegado — ou aprendido com quem já fez.',
      body: [
        'Cada hora gasta num trabalho que outra pessoa poderia fazer é uma hora a menos para as relações, decisões e padrões que só você pode oferecer.',
        'Comece com um mapa 80/20: quais poucos clientes, produtos ou atividades geram a maior parte dos seus resultados — e quais tomam a maior parte do seu tempo? É nos desencontros que a alavancagem se esconde.',
      ],
      keys: ['Delegue um Resultado com a sua Razão, não uma tarefa.', 'Uma boa delegação tem cinco partes: resultado, razão, limites, recursos e acompanhamento.', 'Decida por escrito o que vai fazer com as horas liberadas, ou elas voltam a se encher.'],
      exercises: [
        { title: 'Seu mapa 80/20', fields: [{ t: 'grid', cols: ['Gera muito', 'Gera pouco'], rows: ['Toma muito do meu tempo', 'Toma pouco do meu tempo'] }] },
        { title: 'Seu Livro de Alavancagem', intro: 'Cinco itens em que uma alavanca liberaria mais tempo ou energia.', fields: [{ t: 'table', cols: ['Atividade', 'H/sem', 'Alavanca', 'Primeiro passo', 'Até quando', 'H liberadas'], rows: 5 }, { t: 'lines', label: 'O que vou fazer com as horas liberadas', n: 2 }] },
        { title: 'Uma delegação bem feita', fields: [
          { t: 'lines', label: 'Resultado — como é “bem feito”', n: 2 },
          { t: 'lines', label: 'Razão — por que importa', n: 2 },
          { t: 'lines', label: 'Limites — orçamento, prazo, o que a pessoa decide sozinha', n: 2 },
          { t: 'lines', label: 'Recursos — modelos, contatos, exemplos', n: 1 },
          { t: 'lines', label: 'Acompanhamento — data e o que vamos revisar', n: 1 },
        ] },
      ],
      practice: 'Sempre que começar uma tarefa, pergunte: “isto é trabalho que só eu posso fazer?”. Se não for, anote no Livro.',
    },
    {
      n: 6, title: 'Tempo, Foco e Estado',
      idea: 'Sua agenda mostra o que você realmente prioriza. Seu estado decide a qualidade da execução. Projete os dois de propósito.',
      body: [
        'Metas de tempo invertem a ordem de sempre: decida quanto de cada semana cada área da sua vida merece e reserve esses mínimos primeiro.',
        'Seu estado é um ativo de trabalho. Sono, alimentação e movimento vêm primeiro. Depois, três alavancas: o corpo, as perguntas que você se faz e a respiração.',
      ],
      keys: ['Trabalhe numa coisa só, em rodadas de 45 minutos. Tenha uma lista de tarefas de dez minutos para os intervalos.', 'Quando algo dá errado, pergunte: o que há de útil aqui? o que ainda não está certo? o que vou fazer — e parar de fazer? como posso gostar de resolver?', 'Respiração do coração, dois minutos: atenção no peito, cinco segundos para inspirar, cinco para expirar, um sentimento real de gratidão. Dez respirações.'],
      exercises: [
        { title: 'Metas de tempo', fields: [{ t: 'table', cols: ['Área', 'Mínimo / semana', 'Ideal / semana', 'Onde na semana'], rows: 7 }] },
        { title: 'Seu Cardápio de Recarga', intro: 'As pequenas coisas que, com certeza, trazem você de volta ao seu melhor.', fields: [
          { t: 'lines', label: 'Entradas · 1 a 5 minutos', n: 5 },
          { t: 'lines', label: 'Pratos principais · 15 a 60 minutos', n: 3 },
          { t: 'lines', label: 'Menus degustação · meio dia ou mais', n: 2 },
        ] },
        { title: 'Meu dia de trabalho ideal', fields: [{ t: 'table', cols: ['Horário', 'O que acontece'], rows: 10 }] },
      ],
      practice: 'Viva por cinco dias de acordo com suas metas de tempo. Use uma entrada antes de cada bloco essencial.',
    },
    {
      n: 7, title: 'O Jogo Longo',
      idea: 'Um sistema vale o quanto valem os rituais que o mantêm vivo. Crie poucos, mantenha-os simples e use-os por anos.',
      body: [
        'Escreva suas próprias regras para ganhar — regras que você consegue cumprir com frequência, que tornam fácil se sentir bem e difícil se sentir mal. Depois, mantenha o ritmo: um cartão por dia, uma hora por semana, uma revisão por trimestre.',
        'Toda manhã, ensaie. Imagine os três Resultados do dia bem feitos, e você no seu melhor dentro deles. Sinta antes de acontecer e leve isso para a primeira tarefa essencial.',
      ],
      keys: ['Quando se perder, não recomece com um sistema novo. Faça a retomada de 20 minutos: registrar, escolher três, uma tarefa essencial.', 'Quando o problema for o seu estado, faça a retomada de dez dias: nada de remoer, soluções primeiro, recomece se escorregar.'],
      exercises: [
        { title: 'Minhas regras para ganhar', fields: [{ t: 'list', n: 6, prefix: 'Eu ganho quando…' }] },
        { title: 'Meus valores, em ordem', fields: [{ t: 'table', cols: ['Estados que mais quero sentir', 'Estados que mais quero evitar'], rows: 6 }] },
        { title: 'Seu ponto de partida, de novo', intro: 'Volte ao Módulo 0 e dê novas notas às sete frases.', fields: [
          { t: 'table', cols: ['Nota antes', 'Nota agora'], rows: 1 },
          { t: 'lines', label: 'O que mais mudou', n: 2 },
          { t: 'lines', label: 'A parte do método que vou me esforçar mais para manter', n: 2 },
        ] },
      ],
      practice: 'Agende o ritmo agora: 13 sessões semanais, três revisões mensais e sua primeira Revisão Trimestral.',
    },
  ],
  toolPages: [
    { title: 'Mise en Place Semanal', sub: 'Sessenta minutos, sempre no mesmo horário.', fields: [
      { t: 'lines', label: '1 · Registrar — tudo o que está na minha cabeça (10 min)', n: 8 },
      { t: 'lines', label: '2 · Decidir e agrupar — descartar, delegar, fazer, agendar, arquivar, impedir (10 min)', n: 3 },
      { t: 'table', cols: ['Resultado da semana', 'Razão', 'Essenciais', 'Horas'], rows: 5 },
      { t: 'table', cols: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], rows: 1, label: '4 · Blocos essenciais agendados' },
      { t: 'check', items: ['O essencial cabe no tempo que realmente tenho', 'Metas de tempo conferidas', 'Uma recarga agendada', 'Cartão de amanhã preenchido'] },
    ] },
    { title: 'Cartão do Dia', sub: 'Dez minutos de manhã. Dois à noite.', fields: [
      { t: 'lines', label: 'Perguntas da manhã — sou grato por · estou ansioso por · tenho orgulho de · quem eu amo · com o que me comprometo', n: 3 },
      { t: 'lines', label: 'Hoje vai ser um bom dia se…', n: 1 },
      { t: 'table', cols: ['Resultado', 'Essenciais, em ordem', 'P1–P4', 'Feito'], rows: 3 },
      { t: 'lines', label: 'Bloco protegido · horários de mensagens · se o dia virar, abro mão de', n: 2 },
      { t: 'lines', label: 'Noite — o que ofereci · o que aprendi · uma vitória · primeira ação de amanhã', n: 4 },
    ] },
    { title: 'Revisão Trimestral', sub: 'Duas a três horas, a cada treze semanas.', fields: [
      { t: 'lines', label: 'Celebrar — tudo o que deu certo', n: 4 },
      { t: 'table', cols: ['O que não saiu como planejado', 'O que isso me ensinou'], rows: 3 },
      { t: 'table', cols: ['Área', 'Nota antes', 'Nota agora', 'Resultado do próximo trimestre'], rows: 7 },
      { t: 'check', items: ['Metas de tempo ajustadas', 'Livro de Alavancagem revisado', 'Cardápio de Recarga atualizado', 'Regras para ganhar ainda valem', 'Próxima revisão agendada'] },
      { t: 'lines', label: 'Uma frase para o próximo trimestre', n: 1 },
    ] },
  ],
  closing: 'O método é simples de propósito. O que faz ele funcionar é o mesmo que faz funcionar um grande hotel ou um grande café: constância nos detalhes, feita com cuidado, até virar simplesmente o jeito como as coisas são feitas. Arrume a bancada. Depois, cozinhe.',
};
