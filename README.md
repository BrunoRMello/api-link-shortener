<div align="left">
  <img src="https://img.shields.io/static/v1?label=Progress&message=100%&color=009CA3&style=plastic&logo=node.js" alt="Progress"/>
</div>

<br/>

<div align="center">
  <img src="https://teddydigital.io/wp-content/uploads/2023/02/Ativo-13-8.png" alt="Logo" width="400px"/>
</div>

<br/>

<div align="center">
  <h1>URL Shortener</h1>
  <h3>Uma api desenvolvida com <a href="https://nodejs.org/">Node.js</a> e <a href="https://www.typescriptlang.org/">TypeScript</a>, que permite encurtar URLs e gerenciar esses links de forma eficiente.</h3>
</div>

<div align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=18.0.0&color=009CA3&style=plastic&logo=node.js" alt="Versão do Node.js" />
  <img src="https://img.shields.io/static/v1?label=Typescript&message=5.0.0&color=009CA3&style=plastic&logo=typescript" alt="Versão do Typescript" />
  <img src="https://img.shields.io/static/v1?label=Jest&message=29.7.0&color=009CA3&style=plastic&logo=jest" alt="Versão do Jest" />
  <img src="https://img.shields.io/static/v1?label=Supertest&message=6.3.3&color=009CA3&style=plastic&logo=supertest" alt="Versão do Supertest" />
</div>

<br/>

<div align="center">
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#como-usar">Como usar</a> •
  <a href="#documentação">Documentação</a> •
  <a href="#decisões-técnicas">Decisões Técnicas</a> •
  <a href="#desafios">Desafios</a> •
  <a href="#melhorias">Melhorias</a> •
  <a href="#contato">Contato</a>
</div>

<br/>

 <h2 id="tecnologias">Tecnologias:</h2>
  <h3>Linguagens e Ferramentas:</h3>
  <ul>
    <li><strong>Node.js:</strong> Utilizado para construir o backend da aplicação devido à sua eficiência e capacidade de lidar com operações de I/O assíncronas.</li>
    <li><strong>TypeScript:</strong> Adiciona tipagem estática ao JavaScript, facilitando a detecção de erros e a manutenção do código a longo prazo.</li>
  </ul>

  <h3>Principais Bibliotecas:</h3>
  <ul>
    <li><strong>Express:</strong> Framework minimalista para Node.js, usado para construir APIs RESTful.</li>
    <li><strong>TypeORM:</strong> ORM (Object-Relational Mapping) utilizado para interagir com o banco de dados MySQL de forma eficiente e estruturada.</li>
    <li><strong>Tsyringe:</strong> Um contêiner de injeção de dependência para TypeScript, que ajuda a gerenciar as dependências da aplicação de maneira limpa e organizada.</li>
    <li><strong>Jest:</strong> Framework de testes em JavaScript utilizado para criar e executar testes unitários e de integração.</li>
    <li><strong>Supertest:</strong> Utilizado para testar endpoints HTTP, garantindo que a API funciona como esperado.</li>
    <li><strong>Bcryptjs:</strong> Biblioteca para hashing de senhas, utilizada para garantir a segurança das senhas armazenadas.</li>
    <li><strong>jsonwebtoken:</strong> Biblioteca para trabalhar com JSON Web Tokens, utilizada para implementar autenticação e autorização na aplicação.</li>
    <li><strong>Swagger-UI-Express:</strong> Utilizado para gerar a documentação interativa da API, facilitando o entendimento e a utilização dos endpoints.</li>
  </ul>

  <h3>Outras Ferramentas:</h3>
  <ul>
    <li><strong>Dotenv:</strong> Carrega variáveis de ambiente a partir de um arquivo `.env` para dentro do `process.env`.</li>
    <li><strong>Commitizen:</strong> Ferramenta para escrever mensagens de commit padronizadas.</li>
    <li><strong>Cross-env:</strong> Permite definir variáveis de ambiente em scripts de uma maneira independente de plataforma.</li>
  </ul>


<div>
  <h2 id="como-usar">Como usar:</h2>
  <h3>Requisitos:</h3>
  <p>
    Antes de iniciar, certifique-se de ter instalado em sua máquina as seguintes ferramentas:
  </p>

  <ul>
    <li>Git</li>
    <li>Node (Versão mínima 18)</li>
    <li>Yarn</li>
  </ul>

  <h3>Clone o projeto e acesse a pasta:</h3>

  ```bash
  $ git clone git@github.com:BrunoRMello/api-link-shortener.git && cd api-link-shortener
```
  <h3>Siga os passos abaixo para executar a aplicação localmente:</h3>

```bash
# Instale as dependências
$ yarn install
```
# Inicie a aplicação
```bash
$ yarn dev
  ```
<h3>Para executar os testes:</h3>

```bash
$ yarn test
```
<h3>Variáveis de ambiente:</h3>
 <p>Certifique-se de criar um arquivo <code>.env.dev</code> na raiz do projeto com as seguintes variáveis de ambiente:</p>

 ```bash
NODE_ENV=dev

MYSQL_USERNAME=admin
MYSQL_PASSWORD=1234b
MYSQL_DB_NAME=shorturl
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
```
<h3 id='documentação' >Documentação:</h3>
<p>Acesse a documentação completa da API em <code>http://localhost:3333/docs</code></p>

</div>
<br/>

<div>
  <h2 id="decisões-técnicas">Decisões Técnicas:</h2>
  <h3>Node.js e Express:</h3>
  <p>O Node.js foi escolhido pela sua eficiência e capacidade de lidar com operações de I/O assíncronas. O Express é um framework minimalista e flexível que facilita a criação de APIs RESTful.</p>
  <h3>TypeScript:</h3>
  <p>TypeScript foi utilizado para adicionar tipagem estática ao JavaScript, facilitando a detecção de erros durante o desenvolvimento e melhorando a manutenção do código a longo prazo.</p>

  <h3>Jest e Supertest:</h3>
  <p>Jest é um framework de testes em JavaScript que permite a criação de testes unitários e de integração de forma simples e eficiente. Supertest é utilizado para testar endpoints HTTP, garantindo que a API funciona como esperado.</p>
</div>

<h3>Celebrate:</h3>
  <p>O Celebrate é utilizado para validar as requisições, garantindo que os dados recebidos pela API estejam no formato correto e atendam aos requisitos definidos.</p>

<div>
  <h2 id="desafios">Desafios:</h2>
 <p>Implementar testes abrangentes foi um desafio significativo, pois não tenho muito conhecimento nessa área. Onde trabalho atualmente, não há exigência de testes unitários, o que limita meu conhecimento e prática nesse aspecto. Apesar disso, me esforcei para aprender e aplicar testes básicos, mas reconheço que há espaço para melhorias e uma cobertura de testes mais abrangente.</p>
</div>

<div>
  <h2 id="melhorias">Melhorias:</h2>
   <p>Embora a autenticação e o refresh token já tenham sido implementados, ainda há espaço para melhorias, como adicionar análise de uso e relatórios detalhados sobre os links encurtados.</p>
</div>

<div>
  <h2 id="contato">Contato:</h2>
  <h3>Estou à disposição para esclarecer dúvidas, receber sugestões ou lidar com críticas. Não hesite em entrar em contato!</h3>
  <p>Email: mello.bruno@live.com</p>
  <p>LinkedIn: <a href="https://www.linkedin.com/in/bruno-mello-4a4846123/">https://www.linkedin.com/in/bruno-mello-4a4846123</a></p>
  <h3>Obrigado pela oportunidade!</h3>
</div>
</div>
