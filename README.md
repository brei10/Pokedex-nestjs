<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>


  # Ejecutar en desarrollo  
  
  1. Clonar el repositorio
  2. Ejecutar 

  ```
  npm install
  ```
  
  3. Tener Nest CLI
  ```
  npm i -g @nestjs/cli
  ```

  4. Levantar la base de datos 

  ```
  docker-compose up -d
  ```

  5. Reconstruir la base de datos con documentos fakes ``` http://loalhost:3000/api/seed```




## Stack usado 
* MongoDB
* Nestjs