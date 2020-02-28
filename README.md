# Demo project
This project creates a frontend for an Inventory Management Sytem. 

## Prerequisite
You will need to download and install the following pieces of software:
* Google Cloud Platform
* [Visual Studio Code](https://code.visualstudio.com/). Download the LiveServer Extension
* Maven
* Jenkins
* HTML
* Bootstrap
## Installation
To run the application frontend you will need to run the following lines of code
```sh
git clone https://github.com/christophperrins/simple-project
cd simple-project/server
mvn spring-boot:run
```

To check that it is running you should navigate to:
http://localhost:8081/swagger-ui.html

## Running the Backend Tests
Inside the server folder:

To run JUnit tests on the controller and service classes:
```sh
mvn test -Dtest=ControllerAndServiceSuite
```

To run integration tests run:
```sh
mvn test -Dtest=IntegrationSuite
```

To run end-to-end tests with selenium:
```sh
mvn test -Dtest=SeleniumSuite
``` 

## Built with
* [SpringBoot](https://spring.io/projects/spring-boot)

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Authors
* Rafal Sobol
* Charlie Reddin
* Laurence Garcia
* Ashima Ghale
* Kobby Mensah
* Deng Nyuar

## License
This project is licensed under the GPL-v3 License - see the LICENSE file for details
