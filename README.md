# Catálogo de Produtos

Aplicação web para gerenciamento de produtos em tempo real, desenvolvida com HTML, CSS e JavaScript puro. Permite cadastrar, visualizar e analisar itens dinamicamente, com atualização automática da interface e das métricas.

---

## Funcionalidades

- Adição de produtos (nome, categoria e preço)
- Remoção de itens com atualização imediata
- Busca em tempo real
- Ordenação por nome, preço ou data de criação
- Cálculo automático de métricas:
  - Valor total do inventário
  - Preço médio dos produtos
  - Produto mais caro
  - Produto mais barato
- Contagem de produtos por categoria
- Interface responsiva e interativa

---

## Estrutura do Projeto
CATALOGO-DEV-WEB/

├── index.html # Estrutura da aplicação

├── style.css # Estilização e layout

└── app.js # Lógica e manipulação de dados


---

## Checklist de Requisitos

### Estrutura e Organização
- [x] Modularização em arquivos separados (HTML, CSS e JS)
- [x] Uso de HTML semântico (`header`, `main`, `section`, `aside`, `form`)
- [x] Vinculação correta de arquivos externos
- [x] Área dedicada para renderização dinâmica (`#product-grid`)

### Interface e Experiência (UI/UX)
- [x] Layout responsivo com CSS Grid e media queries
- [x] Hierarquia visual clara com tipografia, cores e espaçamento
- [x] Feedback visual em interações (hover, focus, animações)
- [x] Consistência visual nos componentes dinâmicos

### Comportamento e Lógica
- [x] Interceptação do envio do formulário (`preventDefault`)
- [x] Estrutura de dados centralizada (array de objetos)
- [x] Renderização dinâmica da lista de produtos
- [x] Atualização automática das métricas
- [x] Adição e remoção de itens sincronizadas com a interface

### Robustez e Refinamento
- [x] Validação de dados de entrada
- [x] Reset do formulário após inserção
- [x] Código organizado com nomes descritivos

---

## Diferenciais

- Busca e ordenação em tempo real
- Animações de interface
- Sistema de categorias com contagem dinâmica
- Dados iniciais para demonstração
- Separação clara de responsabilidades

---

## Como Executar

1. Clone o repositório.
2. Acesse a pasta do projeto:

3. Abra o arquivo `index.html` no navegador.

---

## Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, animações e responsividade)
- JavaScript (ES6+)

---

## Considerações

A aplicação foi desenvolvida com foco em organização de código, manipulação dinâmica do DOM, atualização em tempo real e boas práticas de desenvolvimento front-end.
