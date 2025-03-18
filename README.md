# **User Manager Angular**

### Sistema de Gestão de Usuários - Frontend

O **User Manager Angular** é um sistema de frontend para gerenciamento de usuários, desenvolvido com **Angular**. Este projeto faz parte do meu portfólio como desenvolvedor e demonstra habilidades em desenvolvimento de sistemas, integração entre tecnologias e boas práticas de programação.

---

### **Funcionalidades**
- Autenticação de usuário com token jwt
- Cadastro de novos usuários  
- Listagem de usuários  
- Atualização de informações de usuários  
- Exclusão de usuários  
- Busca e filtros personalizados  
- Exportação de dados para **PDF** e **Excel** *(em desenvolvimento)*  

---

### **Tecnologias Utilizadas**
#### **Frontend**
- Angular 18  
- TypeScript  
- Angular Material  

#### **Outras Ferramentas**
- Git & GitHub  
- IntelliJ IDEA / VSCode  
- Postman (para testes de API)  

---

### **Hospedagem**
O projeto está hospedado na **Vercel** e pode ser acessado pelo link:  
🔗 [User Manager Angular](https://user-manager-angular.vercel.app/auth/login)  
(Para testar, use os seguintes emails: admin@domain.com e a senha Admin#2025 para o perfil Admin ou user@domain.com e senha User#2025 para testar o User. O usuário de perfil Admin pode realizar todas ações no sistema inclusive excluir e editar, enquanto o usuário de perfil User só tem permisão para visualizar as informações.)

---

### **Como Executar o Projeto Localmente**

#### **Pré-requisitos**
- **Java 21+**  
- **Node.js 18+**  
- **PostgreSQL 16** (instalado e configurado)  
- **Maven** (configurado no PATH)  

#### **Passos para execução**

##### **1. Clonar o repositório**
```bash
git clone https://github.com/ricardosantanadev4/user-manager.git
cd user-manager-angular
npm install
```

##### **2. Configurar o proxy (necessário para execução local)**
Como as configurações de proxy foram removidas para a hospedagem na Vercel, é necessário recriá-las para rodar o projeto localmente.

1. Criar o arquivo `proxy.conf.json` dentro da pasta `config` em `src/`.  
2. Adicionar o seguinte conteúdo ao arquivo:

```json
{
    "/api": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
}
```

3. Atualizar o `package.json` para incluir a configuração de proxy na execução do projeto:  
   - Na sessão `"scripts"`, modificar o comando `"start"`:  

```json
"start": "ng serve --proxy-config src/config/proxy.conf.json"
```

##### **3. Executar o projeto**
```bash
npm run start
```

---

### **Contato**
ricardosantandev4@gmail.com
