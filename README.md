<!-- PROJECT -->
<br />
<p align="center">

  <h1 align="center">Hubla Challenge</h3>

  <p align="center">
    <br />
    <br />
    <a href="https://hubla-challenge.make2u.com.br/">View Demo</a>
    ·
    <a href="https://github.com/lucastorress/challenge-hubla-fullstack/issues">Report Bug</a>
    ·
    <a href="https://github.com/lucastorress/challenge-hubla-fullstack/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>In this project, we used SOLID concepts in the back-end, abusing the versatility of TypeScript and creating unit tests with Jest. In addition, we created API documentation with Swagger-UI.</p>

<p>The organization of folders uses the concept of "package by folder" to separate modules and their responsibilities.</p>

<p>The repository layer is designed to adapt to any gateway that respects the interface and business rules of the use case layer. Here we have already implemented a layer that uses RAM memory to persist the data.</p>

For more information on database design, here is a simple [DOCUMENTATION DB](docs/README-DB.md).

And to know more information about the frontend, [here we have some information](client/README.md).

<!-- GETTING STARTED -->

## Getting Started

If you do not want to run the project in the development environment, you can access it at [DEMO](https://hubla-challenge.make2u.com.br/).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lucastorress/challenge-hubla-fullstack.git
   ```
2. Install YARN packages

   ```sh
   cd ./api
   yarn install

   cd ./client
   yarn install --production=false
   ```

3. Run the command (with the node server running)

   ```JS
   // To server side
   yarn start:dev

   // To client side
   yarn dev
   ```

##

<!-- CONTACT -->

## Contact

Linkedin - [lucastorres](https://linkedin.com/in/lucastorres)

Email - [lucastorres@make2u.com.br](mailto:lucastorres@make2u.com.br)
