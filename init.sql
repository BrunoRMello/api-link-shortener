-- Cria a base de dados 'shorturl' se ela não existir
CREATE DATABASE IF NOT EXISTS shorturl;

-- Concede todas as permissões ao usuário 'admin' para a base de dados 'shorturl'
GRANT ALL PRIVILEGES ON shorturl.* TO 'admin'@'%' IDENTIFIED BY '1234b';

-- Aplica as mudanças de privilégios
FLUSH PRIVILEGES;
