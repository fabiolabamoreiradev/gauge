# Avaliação Técnica

## Instruções
1.	Clone este repositório em sua máquina
2.	Crie uma branch com o nome de feature/desafio-gauge a partir da master
3.	Desenvolva a solução para o problema proposto abaixo utilizando:
-	Angular 13 ou posterior para o Front End.
-	Node 16 com Javascript e express.js para o Back End.
-	MongoDB para o banco de dados.
-	Toda a infraestrutura em Docker, devendo ser adicionado ao final deste arquivo as instruções para rodar sua solução.
4.	Crie um pull request para a master.

# Desafio: Sistema Administrativo

Carlos abriu uma pequena startup que possui um marketplace onde seus clientes, que são empresas que trabalham com aluguel de bicicletas elétricas, podem solicitar o cadastro para a startup para criar suas lojas virtuais no marketplace e vender seus produtos. 

Este marketplace já se encontra em produção no qual possui 100 lojas cadastradas que recebem milhares de acesso por dia.

Hoje o processo de cadastro das lojas virtuais é realizado manualmente pela equipe de T.I. e você foi contratado para dar início ao desenvolvimento do sistema administrativo que irá permitir o cadastro e personalização através de um app web. Inicialmente foi priorizado pelo P.O. a funcionalidade de upload de um banner para a loja virtual do cliente.

# Feature iniciando  o sistema administrativo

## [Tarefa 1] - Desenvolvimento da infraestrutura utilizando Docker [INFRA]
Você terá a missão de criar um ecossistema Docker com pelo menos três serviços:
- api – A porta externa de acesso ao serviço deve ser escolhida por meio de uma variável de ambiente.
- db – serviço para acomodar o mongodb, os dados do banco deverão ficar persistidos em um volume.
- app – front end escrito em Typescript utilizando angular 13 ou superior.

## [Tarefa 2] - Modelagem do banco de dados [DB]
Você terá que criar um modelo de dados para armazenar o link do banner bem como o slug da loja da empresa cliente, contendo pelo menos as seguintes regras:
- o slug da loja deve ser obrigatório.
- deverá conter um campo para armazenar a url de um banner adicionado

## [Tarefa 3] - Desenvolvimento da funcionalidade de adicionar banners [API]
Você terá que criar um endpoint que receba um arquivo e o armazene localmente para o respectivo slug da empresa cliente que deverá ser informado como parâmetro na uri do endpoint.
- Criar endpoint POST /store/:slug/banners
- Se a loja com o determinado slug não existir na coleção do banco de dados a mesma deverá ser criada e se existir deverá ser feito uma atualização na mesma com o novo banner.
- O banner será armazenado localmente.
- O banner deve ter as dimensões de 343 de largura e 430 de altura.
- Somente serão aceitos banners no formato jpg.
- O slug da empresa cliente não pode ser maior que 30 caracteres e nem conter caracteres especiais.
- Deverá ser retornado o status code 201 bem como o link do banner salvo localmente na api.

## [Tarefa 4] - Desenvolvimento da tela de upload de banners [APP]
 Você terá que elaborar uma tela em que seja possível realizar o upload de um banner de acordo com o layout criado pela equipe de design.
 - Você estará livre para utilizar a biblioteca de css ou de componentes que desejar.
 - Utilize a metodologia de Atomic Design.

# Layout da tela de upload de banners
<img src="https://github.com/gaugeholanda/desafio-gauge/blob/main/layout%20upload%20before.PNG?raw=true"></img>
<img src="https://github.com/gaugeholanda/desafio-gauge/blob/main/layout%20upload%20after.PNG?raw=true"></img>

# Instruções para iniciar ambiente Docker local
Adicione aqui as instruções para que a equipe de desenvolvimento possa testar o seu projeto.
# gauge
