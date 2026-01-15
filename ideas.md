# Ideias de Design - Calculadora de Patrões

## Resposta 1: Modern Financial Dashboard
**Probabilidade: 0.08**

### Design Movement
Minimalismo corporativo com toques de design financeiro contemporâneo (inspirado em plataformas como Stripe, Wise, Revolut).

### Core Principles
1. **Clareza de dados**: Hierarquia visual clara que prioriza números e informações críticas
2. **Eficiência visual**: Layouts limpos sem ruído, máxima densidade de informação útil
3. **Confiança através da precisão**: Tipografia monoespacial para valores monetários, cores sóbrias
4. **Interatividade intuitiva**: Feedback imediato em cada ação, transições suaves

### Color Philosophy
- **Primária**: Azul profundo (oklch(0.623 0.214 259.815)) - transmite confiança e profissionalismo
- **Secundária**: Verde suave (oklch(0.7 0.15 142)) - indica sucesso e crescimento
- **Neutros**: Cinzas frios (oklch(0.92 0.004 286.32) a oklch(0.235 0.015 65)) - mantém foco nos dados
- **Ênfase**: Laranja quente (oklch(0.6 0.2 45)) - para alertas e ações críticas

### Layout Paradigm
- **Sidebar esquerdo**: Navegação e lista de patrões (responsivo, colapsável)
- **Área central**: Tabela principal com dados em tempo real
- **Painel direito flutuante**: Resumo de totais e métricas-chave
- **Grid assimétrico**: 70% dados, 30% resumo

### Signature Elements
1. **Cards com sombra suave**: Cada patrão em um card elevado com hover effect
2. **Indicadores de status**: Barras de progresso mostrando quanto foi enviado vs. total
3. **Números destacados**: Fonte monoespacial (JetBrains Mono) para valores monetários

### Interaction Philosophy
- Cliques em cards expandem detalhes
- Hover em valores mostra histórico
- Botões flutuantes para ações rápidas (+, ×, editar)
- Confirmação visual de cada adição/exclusão

### Animation
- Transições de 200ms em hover
- Fade-in suave ao carregar dados
- Slide de cards ao adicionar/remover patrões
- Pulse suave em valores que mudaram recentemente

### Typography System
- **Display**: Poppins Bold 28px para títulos principais
- **Heading**: Inter SemiBold 18px para nomes de patrões
- **Body**: Inter Regular 14px para textos
- **Monospace**: JetBrains Mono 16px para valores monetários

---

## Resposta 2: Retro Calculator Aesthetic
**Probabilidade: 0.07**

### Design Movement
Nostalgia dos anos 80/90 com calculadoras digitais, mas modernizado com glassmorphism.

### Core Principles
1. **Autenticidade retrô**: Referências visuais a calculadoras físicas antigas
2. **Playfulness**: Cores vibrantes e tipografia ousada
3. **Funcionalidade clara**: Botões grandes e óbvios, layout intuitivo
4. **Textura digital**: Efeito de segmento LED, backgrounds com padrão

### Color Philosophy
- **Primária**: Roxo neon (oklch(0.6 0.25 290)) - retrô futurista
- **Secundária**: Ciano vibrante (oklch(0.7 0.2 200)) - contraste energético
- **Fundo**: Preto profundo com padrão de grade sutil
- **Destaque**: Amarelo elétrico (oklch(0.8 0.2 80)) - para números

### Layout Paradigm
- **Painel central único**: Simulando uma calculadora física grande
- **Botões em grid**: Patrões dispostos como teclado numérico
- **Display LED**: Área superior mostrando totais em estilo retro
- **Sem sidebar**: Tudo em um único painel compacto

### Signature Elements
1. **Efeito LED**: Números com glow e sombra de neon
2. **Botões com bevel**: Aparência 3D de botões físicos
3. **Grid de padrão**: Fundo com linhas sutis

### Interaction Philosophy
- Clique em botões produz som (opcional)
- Feedback tátil visual em cada interação
- Transições rápidas e snappy
- Animação de "pressionamento" em botões

### Animation
- Bounce suave em cliques (10px)
- Glow pulsante em valores críticos
- Transição de cores ao mudar estado
- Efeito de digitação ao adicionar valores

### Typography System
- **Display**: Courier New Bold 32px para números (estilo LED)
- **Heading**: Space Mono Bold 20px para nomes
- **Body**: Space Mono Regular 14px para labels
- **Accent**: Orbitron para títulos (futurista)

---

## Resposta 3: Organic Financial Growth
**Probabilidade: 0.09**

### Design Movement
Design orgânico e fluido inspirado em crescimento natural, com curvas suaves e formas abstratas.

### Core Principles
1. **Fluidez visual**: Formas arredondadas, curvas naturais, sem ângulos retos
2. **Crescimento positivo**: Metáforas visuais de expansão e prosperidade
3. **Acessibilidade emocional**: Cores quentes e aconchegantes, não corporativo
4. **Movimento natural**: Animações que simulam movimento orgânico

### Color Philosophy
- **Primária**: Verde terra (oklch(0.65 0.15 140)) - crescimento natural
- **Secundária**: Dourado suave (oklch(0.75 0.12 70)) - riqueza e prosperidade
- **Fundo**: Creme com gradiente suave (oklch(0.98 0.001 286.375))
- **Acentos**: Coral quente (oklch(0.65 0.18 30)) - energia positiva

### Layout Paradigm
- **Fluxo em cascata**: Patrões em layout fluido, não em grid rígido
- **Formas orgânicas**: Containers com border-radius variável
- **Espaço respirável**: Muito whitespace, layouts assimétricos
- **Curvas diagonais**: Divisores com SVG wavy entre seções

### Signature Elements
1. **Formas blob**: Containers com formas abstratas e suaves
2. **Gradientes suaves**: Transições de cor natural
3. **Ilustrações minimalistas**: Ícones com traços suaves

### Interaction Philosophy
- Hover expande suavemente (scale 1.05)
- Cliques produzem ripple effect orgânico
- Transições fluidas e naturais
- Feedback visual através de mudanças de cor

### Animation
- Entrada com fade + scale suave (400ms)
- Hover com scale e shadow suave
- Transições de cor gradual (300ms)
- Bounce suave em finais de animação

### Typography System
- **Display**: Poppins SemiBold 32px para títulos (arredondado)
- **Heading**: Quicksand Bold 18px para nomes
- **Body**: Quicksand Regular 14px para textos
- **Accent**: Playfair Display para destaque especial

---

## Design Escolhido: **Modern Financial Dashboard**

Escolhi a abordagem **Modern Financial Dashboard** porque:

1. **Alinha com o propósito**: Uma calculadora financeira precisa transmitir confiança e precisão
2. **Escalabilidade**: Funciona bem conforme o número de patrões cresce
3. **Profissionalismo**: Usuários trabalham com dinheiro, interface séria é apropriada
4. **Eficiência**: Dados financeiros são o foco, sem distrações visuais
5. **Acessibilidade**: Cores e tipografia seguem padrões de legibilidade financeira

### Decisões de Design para Implementação
- Sidebar colapsável com lista de patrões
- Cards elevados para cada patrão com valores em tempo real
- Tabela principal com colunas: Patrão | Valores | Total | Repasse | Líquido
- Painel de resumo mostrando totais gerais
- Tipografia: Poppins para títulos, Inter para corpo, JetBrains Mono para valores
- Paleta: Azul profundo, verde suave, cinzas frios, laranja para alertas
