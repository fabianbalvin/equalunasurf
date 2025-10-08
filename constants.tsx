
import React from 'react';
import type { Week } from './types';
import InteractiveGraph from './components/InteractiveGraph';
// import GeoGebraSimulator from './components/GeoGebraSimulator'; // This was not an actual component file
// import SystemsGraph from './components/SystemsGraph'; // This was not an actual component file

// FIX: Moved GeoGebraSimulator and SystemsGraph component declarations before their usage in LESSON_PLAN.
// Dummy components for lesson content
const GeoGebraSimulator: React.FC = () => {
    const [slope, setSlope] = React.useState(1);
    const [intercept, setIntercept] = React.useState(2);

    return (
        <div className="bg-white p-4 rounded-lg shadow-inner mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <div>
                    <label htmlFor="slope" className="block text-sm font-medium text-gray-700">Inclinação (a): <span className="font-bold text-sky-600">{slope.toFixed(1)}</span></label>
                    <input id="slope" type="range" min="-5" max="5" step="0.1" value={slope} onChange={e => setSlope(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                 <div>
                    <label htmlFor="intercept" className="block text-sm font-medium text-gray-700">Corte em Y (b): <span className="font-bold text-sky-600">{intercept.toFixed(1)}</span></label>
                    <input id="intercept" type="range" min="-10" max="10" step="0.5" value={intercept} onChange={e => setIntercept(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
             <p className="text-center text-xl font-bold font-mono text-gray-700 mb-4">y = {slope.toFixed(1)}x + {intercept.toFixed(1)}</p>
            <InteractiveGraph lines={[{ formula: (x) => slope * x + intercept, color: '#8884d8' }]} key={`${slope}-${intercept}`} />
        </div>
    );
};

const SystemsGraph: React.FC = () => (
    <InteractiveGraph
        lines={[
            { formula: (x) => x + 2, color: '#3b82f6', name: 'Você' }, // blue
            { formula: (x) => 2 * x, color: '#ec4899', name: 'Amiga' }  // pink
        ]}
        points={[{ x: 2, y: 4, name: 'Encontro (2,4)' }]}
    />
);


export const LESSON_PLAN: Week[] = [
  {
    week: 1,
    title: "Pegando a Onda da Álgebra",
    lessons: [
      {
        day: 1,
        title: "O que é uma equação?",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Ei, futura campeã! Pronta pra começar?</h3>
            <p className="mb-4">Pense numa equação como a sua prancha de surf. Para você ficar em pé e surfar a onda, a prancha precisa estar <strong>equilibrada</strong>. Nem muito peso pra um lado, nem muito pro outro.</p>
            <p className="mb-4">Na matemática, o sinal de igual (=) é o centro da nossa prancha. Tudo que está de um lado precisa ser igual a tudo que está do outro.</p>
            <div className="bg-sky-100 p-4 rounded-lg my-4 text-center">
              <p className="text-2xl font-bold font-mono text-sky-800">x + 5 = 10</p>
            </div>
            <p>Aqui, "x" é um número misterioso. É como descobrir qual a melhor posição do seu pé na prancha. Para a "prancha" ficar equilibrada, qual número o "x" precisa ser?</p>
            <p className="mt-4">Isso mesmo! Se você pensou <strong>5</strong>, acertou! Porque 5 + 5 = 10. Os dois lados da equação ficaram iguais.</p>
          </div>
        ),
      },
      {
        day: 2,
        title: "Conhecendo as Incógnitas",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">O "x" e o "y" da questão</h3>
            <p className="mb-4">No surf e na vida, muitas coisas mudam, certo? A altura da onda, a força do vento, sua pontuação no campeonato... Na matemática, usamos letras para representar esses valores que podem mudar. Chamamos elas de <strong>incógnitas</strong> ou <strong>variáveis</strong>.</p>
            <p className="mb-4">As mais famosas são o <strong>x</strong> e o <strong>y</strong>.</p>
            <p className="mb-4">Vamos imaginar uma situação:</p>
            <blockquote className="border-l-4 border-sky-500 pl-4 italic my-4">
              "Para cada manobra radical (x) que você faz, você ganha 3 pontos (y)."
            </blockquote>
            <p>Podemos escrever isso como uma equação:</p>
            <div className="bg-sky-100 p-4 rounded-lg my-4 text-center">
              <p className="text-2xl font-bold font-mono text-sky-800">y = 3x</p>
            </div>
            <ul className="list-disc list-inside space-y-2">
              <li>Se você faz 1 manobra (x=1), ganha 3 pontos (y=3).</li>
              <li>Se você faz 2 manobras (x=2), ganha 6 pontos (y=6).</li>
            </ul>
            <p className="mt-4">Viu só? O valor de 'y' (seus pontos) depende do valor de 'x' (suas manobras). Elas estão conectadas, como você e sua prancha!</p>
          </div>
        )
      },
      {
        day: 3,
        title: "Quem inventou isso?",
        type: 'history',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-4">Uma Viagem no Tempo da Álgebra</h3>
            <p className="mb-4">Sabe, essa história de usar letras e equilibrar equações não é de hoje. Ela é bem antiga!</p>
            <p className="mb-4">Há mais de 1200 anos, em um lugar onde hoje fica o Iraque, viveu um grande matemático persa chamado <strong>Muhammad ibn Musa al-Khwarizmi</strong>. O nome é complicado, mas as ideias dele foram incríveis!</p>
             <div className="flex justify-center my-4">
                <img src="https://picsum.photos/400/200?grayscale" alt="Ilustração antiga de um estudioso" className="rounded-lg shadow-md" />
            </div>
            <p className="mb-4">Ele escreveu um livro revolucionário onde explicava como resolver problemas usando um método que ele chamou de "al-jabr". Essa palavra significa algo como "restauração" ou "reunião de partes quebradas". A ideia era "restaurar" o equilíbrio da equação, passando números de um lado para o outro.</p>
            <p>A palavra "al-jabr" soa familiar? É daí que veio a nossa palavra <strong>Álgebra</strong>! E o sobrenome dele, "al-Khwarizmi", deu origem à palavra <strong>algoritmo</strong>, que é super importante na computação hoje em dia.</p>
          </div>
        )
      },
      {
        day: 4,
        title: "Jogo: Equilibrando a Prancha",
        type: 'quiz',
        // FIX: Added content property to satisfy Lesson type.
        content: null,
        quiz: [
            { question: "Para equilibrar a prancha: x + 3 = 8. Qual o valor de x?", options: ["3", "8", "5", "11"], correctAnswerIndex: 2 },
            { question: "Equilíbrio total! 2 * x = 12. Qual o valor de x?", options: ["10", "6", "24", "2"], correctAnswerIndex: 1 },
            { question: "Essa é mais difícil: 3x - 1 = 14. Qual o x da vez?", options: ["5", "13", "15", "4"], correctAnswerIndex: 0 },
            { question: "Última onda! Se y = x + 5, e x = 4, qual o valor de y?", options: ["5", "4", "1", "9"], correctAnswerIndex: 3 }
        ]
      },
      {
        day: 5,
        title: "Revisão da Semana 1",
        type: 'review',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Mandou bem na primeira semana!</h3>
            <p className="mb-4">Vamos recapitular o que aprendemos:</p>
            <ul className="list-disc list-inside space-y-3 bg-white p-6 rounded-lg shadow">
              <li>Uma <strong>equação</strong> é como uma prancha de surf: precisa estar sempre <strong>equilibrada</strong> dos dois lados do sinal de igual (=).</li>
              <li>Letras como <strong>x</strong> e <strong>y</strong> são chamadas de <strong>incógnitas</strong> ou <strong>variáveis</strong>. Elas representam números que não conhecemos ou que podem mudar.</li>
              <li>Em equações com duas variáveis (como y = 2x), o valor de uma depende da outra.</li>
              <li>A <strong>Álgebra</strong> tem uma história longa e fascinante, que começou com o grande matemático Al-Khwarizmi!</li>
            </ul>
            <p className="mt-6">Você construiu uma base sólida. Na próxima semana, vamos começar a desenhar mapas para nossas ondas matemáticas. Vai ser demais!</p>
          </div>
        )
      },
    ]
  },
  {
    week: 2,
    title: "Mapeando o Mar: Plano Cartesiano",
    lessons: [
      {
        day: 1,
        title: "Onde estou no mar?",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Criando nosso mapa do mar!</h3>
            <p className="mb-4">Imagina que você quer explicar para uma amiga exatamente onde está a melhor onda. Você poderia dizer "um pouco pra frente e um pouco pra direita".</p>
            <p className="mb-4">Na matemática, fazemos a mesma coisa com o <strong>Plano Cartesiano</strong>. Ele é um mapa criado por duas retas que se cruzam: uma na horizontal (eixo <strong>x</strong>) e uma na vertical (eixo <strong>y</strong>).</p>
             <div className="flex justify-center my-4">
                <img src="https://picsum.photos/400/300" alt="Plano Cartesiano" className="rounded-lg shadow-md border-4 border-white" />
            </div>
            <p className="mb-4">Vamos pensar no nosso mar:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>O <strong>eixo x</strong> pode ser a distância da praia (quanto mais pra direita, mais longe).</li>
              <li>O <strong>eixo y</strong> pode ser a altura da onda (quanto mais pra cima, mais alta).</li>
            </ul>
            <p className="mt-4">Com esse mapa, podemos marcar a localização exata de qualquer onda!</p>
          </div>
        )
      },
      {
        day: 2,
        title: "Marcando o 'X' no mapa",
        type: 'interactive',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Pares Ordenados: A coordenada secreta</h3>
            <p className="mb-4">Para marcar um ponto no nosso mapa, usamos um <strong>par ordenado</strong>, que é sempre assim: <strong>(x, y)</strong>.</p>
            <p className="mb-4">O primeiro número (x) diz o quanto andar na horizontal, e o segundo (y) o quanto andar na vertical.</p>
            <p>Vamos marcar o ponto <strong>P(3, 4)</strong>. Isso significa:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Partindo do centro (0,0), ande <strong>3</strong> passos para a <strong>direita</strong> (no eixo x).</li>
              <li>Depois, ande <strong>4</strong> passos para <strong>cima</strong> (paralelo ao eixo y).</li>
            </ol>
            <p className="mt-4">Pronto! Você encontrou o ponto P. É como encontrar o pico da onda perfeita: 3 metros longe da praia, com 4 metros de altura!</p>
            <div className="mt-6">
                <h4 className="font-semibold text-center mb-2">Veja no nosso mapa do mar:</h4>
                <InteractiveGraph points={[{x: 3, y: 4, name: 'P(3,4)'}]} />
            </div>
          </div>
        )
      },
      {
        day: 3,
        title: "Conectando Equação e Pontos",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">A trilha da onda perfeita</h3>
            <p className="mb-4">Lembra da nossa equação da semana passada, <strong>y = x + 1</strong>? E se a gente tentasse encontrar alguns pares (x, y) que funcionam para ela?</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Se <strong>x = 0</strong>, então y = 0 + 1 = <strong>1</strong>. Temos o ponto <strong>(0, 1)</strong>.</li>
              <li>Se <strong>x = 1</strong>, então y = 1 + 1 = <strong>2</strong>. Temos o ponto <strong>(1, 2)</strong>.</li>
              <li>Se <strong>x = 2</strong>, então y = 2 + 1 = <strong>3</strong>. Temos o ponto <strong>(2, 3)</strong>.</li>
            </ul>
            <p>Agora, a mágica! Vamos marcar esses pontos no nosso mapa:</p>
             <div className="mt-6">
                <InteractiveGraph points={[{x: 0, y: 1, name: 'A'}, {x: 1, y: 2, name: 'B'}, {x: 2, y: 3, name: 'C'}]} />
            </div>
            <p className="mt-4">Percebeu algo incrível? Eles parecem formar uma <strong>linha reta</strong>! É como o caminho que a sua prancha faz na onda. Na próxima semana, vamos explorar isso melhor.</p>
          </div>
        )
      },
      {
        day: 4,
        title: "Jogo: Caça ao Tesouro no Mar",
        type: 'quiz',
        // FIX: Added content property to satisfy Lesson type.
        content: null,
        quiz: [
            { question: "Onde fica o ponto (2, 5)?", options: ["2 direita, 5 cima", "5 direita, 2 cima", "2 esquerda, 5 baixo", "5 esquerda, 2 cima"], correctAnswerIndex: 0 },
            { question: "Qual ponto está no eixo Y?", options: ["(3, 3)", "(5, 0)", "(0, 4)", "(-1, -1)"], correctAnswerIndex: 2 },
            { question: "Se y = 2x e x=3, qual o par ordenado?", options: ["(2, 3)", "(3, 2)", "(3, 6)", "(6, 3)"], correctAnswerIndex: 2 },
            { question: "O ponto (0,0) tem um nome especial. Qual é?", options: ["Centro", "Início", "Marco zero", "Origem"], correctAnswerIndex: 3 }
        ]
      },
       {
        day: 5,
        title: "Revisão da Semana 2",
        type: 'review',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Você agora é uma navegadora matemática!</h3>
            <p className="mb-4">Olha só tudo que você aprendeu a mapear:</p>
            <ul className="list-disc list-inside space-y-3 bg-white p-6 rounded-lg shadow">
              <li>O <strong>Plano Cartesiano</strong> é o nosso mapa, com um eixo <strong>x</strong> (horizontal) e um eixo <strong>y</strong> (vertical).</li>
              <li>Usamos <strong>pares ordenados (x, y)</strong> para encontrar a localização exata de um ponto no plano.</li>
              <li>As soluções de uma equação de primeiro grau com duas incógnitas (como y = x + 1) podem ser representadas como pontos no plano cartesiano.</li>
              <li>E o mais legal: esses pontos não ficam espalhados de qualquer jeito, eles formam um padrão!</li>
            </ul>
            <p className="mt-6">Semana que vem, vamos ligar esses pontos e desenhar as retas que representam o caminho das nossas ondas. Prepare-se!</p>
          </div>
        )
      },
    ]
  },
  {
    week: 3,
    title: "Desenhando a Onda: A Reta",
    lessons: [
      {
        day: 1,
        title: "Dos Pontos à Reta",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Ligando os pontos</h3>
            <p className="mb-4">Na semana passada, vimos que os pontos de uma equação como <strong>y = x + 1</strong> pareciam formar uma linha. E se a gente calculasse mais pontos e os conectasse?</p>
            <p className="mb-4">O resultado é uma <strong>linha reta</strong>! Essa linha é a representação visual de TODOS os pares (x, y) que fazem a equação ser verdadeira. São infinitos pontos, todos alinhadinhos, formando o "caminho da onda".</p>
             <div className="mt-6">
                <h4 className="font-semibold text-center mb-2">A reta da equação y = x + 1</h4>
                <InteractiveGraph lines={[{ formula: (x) => x + 1, color: '#82ca9d' }]} />
            </div>
            <p className="mt-4">Qualquer ponto que estiver em cima dessa linha verde é uma solução para a equação y = x + 1. Incrível, né?</p>
          </div>
        )
      },
      {
        day: 2,
        title: "Simulador: Inclinando a Prancha",
        type: 'interactive',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Controlando a sua Reta!</h3>
            <p className="mb-4">A equação geral de uma reta é <strong>y = ax + b</strong>. Vamos descobrir o que cada letra faz?</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>a (coeficiente angular):</strong> É a <strong>inclinação</strong> da sua prancha/reta. Um 'a' maior significa uma onda mais íngreme!</li>
              <li><strong>b (coeficiente linear):</strong> É o ponto onde sua prancha <strong>cruza o eixo y</strong>. É como a altura em que você entra na onda.</li>
            </ul>
            <p><strong>Brinque com os controles abaixo</strong> e veja como a reta muda em tempo real. É como um GeoGebra simplificado!</p>
            <GeoGebraSimulator />
          </div>
        )
      },
       {
        day: 3,
        title: "Modelando uma Manobra",
        type: 'problem',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">A Matemática do seu Surf</h3>
            <p className="mb-4">Vamos usar o que aprendemos para descrever uma situação real. Imagine o seguinte:</p>
            <blockquote className="border-l-4 border-sky-500 pl-4 italic my-4">
              Você já começa com <strong>2 pontos</strong> de bônus por entrar bem na onda. A cada <strong>segundo (x)</strong> que você permanece nela, você ganha mais <strong>0.5 ponto (y)</strong>.
            </blockquote>
            <p>Como podemos transformar isso em uma equação? Vamos pensar:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Sua pontuação (y) é igual a...</li>
              <li>0.5 ponto por segundo (0.5 * x)</li>
              <li>...mais os 2 pontos de bônus (+ 2).</li>
            </ul>
             <div className="bg-sky-100 p-4 rounded-lg my-4 text-center">
              <p className="text-2xl font-bold font-mono text-sky-800">y = 0.5x + 2</p>
            </div>
            <p>Se você ficar 10 segundos na onda (x=10), quantos pontos fará?</p>
            <p>y = 0.5 * 10 + 2 = 5 + 2 = <strong>7 pontos</strong>!</p>
          </div>
        )
      },
      {
        day: 4,
        title: "Jogo: Qual é a equação?",
        type: 'quiz',
        // FIX: Added content property to satisfy Lesson type.
        content: null,
        quiz: [
            { question: "Na equação y = 3x - 2, qual a inclinação (coeficiente angular)?", options: ["y", "x", "3", "-2"], correctAnswerIndex: 2 },
            { question: "Na equação y = 5x + 8, onde a reta corta o eixo y?", options: ["No ponto 5", "No ponto 8", "Na origem", "Não corta"], correctAnswerIndex: 1 },
            { question: "Uma reta que sobe da esquerda para a direita tem inclinação...", options: ["Positiva", "Negativa", "Zero", "Infinita"], correctAnswerIndex: 0 },
            { question: "Se a inclinação (a) é 0 na equação y = ax + b, o que acontece com a reta?", options: ["Fica na vertical", "Fica inclinada", "Some", "Fica na horizontal"], correctAnswerIndex: 3 }
        ]
      },
       {
        day: 5,
        title: "Revisão da Semana 3",
        type: 'review',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Você agora desenha com equações!</h3>
            <p className="mb-4">Essa semana foi intensa, olha só o que dominamos:</p>
            <ul className="list-disc list-inside space-y-3 bg-white p-6 rounded-lg shadow">
              <li>Uma equação de primeiro grau com duas variáveis, como <strong>y = ax + b</strong>, é representada por uma <strong>linha reta</strong> no plano cartesiano.</li>
              <li>O número '<strong>a</strong>' é o <strong>coeficiente angular</strong> e controla a <strong>inclinação</strong> da reta.</li>
              <li>O número '<strong>b</strong>' é o <strong>coeficiente linear</strong> e mostra onde a reta <strong>corta o eixo y</strong>.</li>
              <li>Conseguimos <strong>modelar</strong> uma situação real (seus pontos no surf) usando uma equação de reta!</li>
            </ul>
            <p className="mt-6">Estamos na reta final! Na última semana, vamos ver o que acontece quando duas ondas (ou duas retas) se encontram. É o clímax do nosso campeonato!</p>
          </div>
        )
      },
    ]
  },
  {
    week: 4,
    title: "Campeonato de Surf Matemático",
    lessons: [
       {
        day: 1,
        title: "Onde as Ondas se Cruzam",
        type: 'concept',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">O Encontro de Gigantes</h3>
            <p className="mb-4">Imagine que você e sua amiga estão no mesmo campeonato. Cada uma tem um estilo, e a pontuação de vocês pode ser descrita por equações diferentes.</p>
            <p className="mb-4">Sua pontuação: <strong><span className="text-blue-600">y = x + 2</span></strong> (você começa bem, mas progride de forma constante)</p>
            <p className="mb-4">Pontuação da sua amiga: <strong><span className="text-pink-600">y = 2x</span></strong> (ela começa mais devagar, mas a cada segundo, ganha pontos mais rápido)</p>
            <p>Haverá um momento em que vocês terão exatamente a mesma pontuação? Sim! É o ponto onde as duas retas se cruzam no gráfico. A esse "encontro de retas" damos o nome de <strong>Sistema de Equações</strong>.</p>
            <div className="mt-6">
                <h4 className="font-semibold text-center mb-2">O Ponto de Encontro</h4>
                <SystemsGraph />
            </div>
             <p className="mt-4 text-center font-semibold">O ponto de cruzamento é a solução do sistema! É o único par (x, y) que funciona para as duas equações ao mesmo tempo.</p>
          </div>
        )
      },
      {
        day: 2,
        title: "Resolvendo com os Olhos",
        type: 'problem',
        content: (
          <div>
            <h3 className="text-xl font-semibold text-sky-700 mb-4">Encontrando a solução no gráfico</h3>
            <p className="mb-4">Olhando para o gráfico da aula anterior, onde as retas <span className="text-blue-600 font-semibold">y = x + 2</span> e <span className="text-pink-600 font-semibold">y = 2x</span> se cruzam?</p>
             <p className="mb-4">Se você seguir a linha do ponto de encontro para baixo até o eixo x, verá que ele está no número <strong>2</strong>. Se seguir para a esquerda até o eixo y, verá que ele está no número <strong>4</strong>.</p>
            <p className="mb-4">Então, o ponto de encontro é <strong>(2, 4)</strong>.</p>
            <p>O que isso significa no nosso problema de surf?</p>
            <blockquote className="border-l-4 border-sky-500 pl-4 italic my-4">
              Significa que após <strong>2 segundos</strong> (x=2), tanto você quanto sua amiga terão exatamente <strong>4 pontos</strong> (y=4).
            </blockquote>
            <p>Vamos testar?
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Sua equação: y = 2 + 2 = 4. Funcionou!</li>
                    <li>Equação da amiga: y = 2 * 2 = 4. Funcionou também!</li>
                </ul>
            </p>
            <p className="mt-4">Resolver um sistema graficamente é encontrar esse ponto de cruzamento. É a solução visual!</p>
          </div>
        )
      },
      {
        day: 3,
        title: "Desafio Final do Campeonato",
        type: 'quiz',
        // FIX: Added content property to satisfy Lesson type.
        content: null,
        quiz: [
            { question: "O que a solução de um sistema de duas equações representa graficamente?", options: ["Onde as retas começam", "Onde as retas terminam", "Onde as retas se cruzam", "Onde as retas são mais inclinadas"], correctAnswerIndex: 2 },
            { question: "Se duas retas são paralelas, o que acontece com o sistema?", options: ["Tem uma solução", "Tem duas soluções", "Tem infinitas soluções", "Não tem solução"], correctAnswerIndex: 3 },
            { question: "O ponto (1, 3) é solução para qual sistema?", options: ["y=x+2 e y=2x+1", "y=x+1 e y=2x", "y=3x e y=x+3", "y=x e y=3"], correctAnswerIndex: 0 },
            { question: "Resolver um sistema é encontrar um par (x, y) que...", options: ["Funciona só para a primeira equação", "Funciona só para a segunda equação", "Funciona para as duas equações", "Não funciona para nenhuma equação"], correctAnswerIndex: 2 },
        ]
      },
      {
        day: 4,
        title: "Você Conseguiu!",
        type: 'review',
        content: (
         <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-600 mb-4">PARABÉNS, CAMPEÃ!</h3>
             <div className="flex justify-center my-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </div>
            <p className="mb-4 text-lg">Você completou um mês de muito aprendizado. Você não só encarou as equações de primeiro grau, como as dominou, conectando tudo com sua paixão, o surf!</p>
            <p className="font-semibold mb-4">Resumo da sua jornada:</p>
            <ul className="list-disc list-inside space-y-2 text-left w-fit mx-auto bg-white p-6 rounded-lg shadow">
              <li>Entendeu equações como um <strong>equilíbrio</strong>.</li>
              <li>Usou o <strong>Plano Cartesiano</strong> como um mapa do mar.</li>
              <li>Viu como equações se transformam em <strong>retas</strong>.</li>
              <li>Descobriu o que a <strong>inclinação</strong> e o <strong>ponto de cruzamento</strong> significam.</li>
              <li>Aprendeu a resolver <strong>sistemas de equações</strong>, encontrando o ponto de encontro das ondas.</li>
            </ul>
            <p className="mt-6 text-lg">A matemática é uma ferramenta poderosa, como a sua prancha. Com ela, você pode entender o mundo, descrever movimentos e resolver problemas. Continue com essa garra e curiosidade, tanto nas ondas de Baía Formosa quanto nos desafios da matemática. Você vai longe!</p>
          </div>
        )
      },
    ]
  }
];
