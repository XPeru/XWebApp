# XWebApp
Este repository contiene nuestra primera WebApp en JavaScript full-stack, hemos escogido las tecnologias basados en nuestra experiencia como desarrolladores, y lo leido hasta ahora en linea, tomando varias de las ideas del MEAN framework, hemos decidido usar para la persistencia de datos MySQL por ser Open Source (para la version 2.0 del framework usaremos una base de datos NoSQL como MongoDB); Express + NodeJS para el codigo servidor, dado que permite una enorme simplificacion de codigo al basar todo en JSON's, y al estar NodeJS escrito en JavaScript, permite agregar modulos externos facilmente.

La comunidad web que considera al JavaScript como el lenguaje web del futuro se ha incrementado considerablemente en los ultimos años, NodeJS es fruto del trabajo de esa comunidad, este servidor tiene un tiempo de arranque de milisegundos (a comparacion de los minutos en que puede demorar un servidor apache en hacerlo), ademas posee un mejor manejo del multithreading al poder manejar muchos mas usuarios que un servidor estandar. Sus detractores dicen que NodeJS solo es util para cuando un servidor no tiene que hacer grandes operaciones de calculo (lo cual es cierto) por lo que en un futuro deberemos considerar usar otros servidores, segun las necesidades del cliente.

AngularJS es el framework lado cliente de moda de los ultimos años, simplifica de manera sustancial la cantidad de codigo a escribir, es modulable, escalable, y permite dejar de lado al JQuery, la mayoria de empresas francesas piden esta tecnologia como parte de sus productos; al ser tan practico, no podria haber sido dejado de lado. Por otro lado, ReactJS (desarrollado x facebook) no es un framework mas bien una libreria, hemos pensando integrarlo en nuestros productos futuros, cuando empecemos a desarrollar en Swift y Android.

Boostrap es la libreria mas conocida para Responsive Design, ademas de esto contiene componentes dinamicos practicos y faciles de integrar, esta libreria tambien tiene modulos desarrollados por la comunidad para trabajar con AngularJS.

Este readme supone ser una guia para instalar todas las herramientas necesarias para el proyecto, en un futuro tambien desarrollaremos un script que instale todas las herramientas de un tiro.

## MySQL
A pesar de ser una base de datos Open Source, tiene versiones comerciales (bastante caras), pero asi como se indica en su sitio web, existe una version gratuita, MySQL Community Edition. Pero existen varios productos:
* MySQL Community Server 
* MySQL Cluster 
* MySQL Fabric 
* MySQL Utilities
* MySQL Workbench
* MySQL Proxy
* http://dev.mysql.com/downloads/mysql/
* De estos solo vamos a utilizar dos, el MySQL Community Server que es la base de datos (si, la base de datos en si misma, es un servidor) y el MySQL Workbench que es un software que permite conectarse a la base de datos, ejecutar queries, y ademas permite diseñar de manera grafica las tablas de la base de datos.

### Instalador Windows de todas las herramientas MySQL:
Basta con seleccionar las versiones de 64 bits de ambos productos mencionados arriba.
http://dev.mysql.com/downloads/windows/installer/5.6.html

## Node.js
Es necesario instalar Node.js para que podamos arrancar nuestro servidor en local, node viene con una herramienta llamada npm, que funciona como un gestor de librerias, permite descargarlas automaticamente, usa un archivo llamado package.json para guardar cuales son las librerias a descargar.
* Tutorial
* https://www.youtube.com/watch?v=EY9uY1rxazk&list=PL6gx4Cwl9DGBMdkKFn3HasZnnAqVjzHn_&index=18
* Instalar node y npm https://docs.npmjs.com/getting-started/installing-node

## Git
GitHub esta basado en git para la gestion de versiones, por lo tanto es necesario instalarlo antes. Es importante tambien manejar los comandos gits.
* https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Bower
Bower tambien es un gestor de librerias al igual que npm, decidimos usar ambos para mantener separadas las librerias de la parte cliente de la parte servidor. Este funciona de manera similar a npm, utiliza un archivo llamado bower.json para saber cuales son las librerias a instalar. Bower se instala via un comando en npm. Bower va a manejar las librerias de la parte cliente, es decir AngularJS, Bootstrap y demas modulos cliente.
* https://bower.io/

## Conectando Node.js y MySQL
Este es el tutorial que utilizamos para que comnuniquen NodeJS y MySQL, basta leer el archivo server.js para entender su uso dentro del proyecto.
https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

## Herramientas para el futuro
Este proyecto aun esta en formacion, aun nos faltan muchas herramientas por integrar, tales como Grunt.js para la minifizacion, uglyfizacion de los archivos javascript,css y generar la version comercial de la aplicacion. Jasmine para los test automatizados de angularjs, Less o Sass para simplificar la escritura del codigo css, Yeoman para el uso de scripts generadores de codigo.

