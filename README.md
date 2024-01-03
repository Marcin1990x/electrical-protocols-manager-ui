# Electrical protocols manager
## Application description

Application Electrical protocols manager allows user to create PDF protocol from
electrical measurements done in building. User can create building structure, add electricians, 
add 6 different types of measurements, add title page information, generate complete 
protocol from this data and save it as PDF file in application directory.

Application is prepared to use locally on computer. It runs with embedded Tomcat server
and use H2 database to manage data when application is working.

## Application functionalities
- creating building structure: building, floors, rooms
- adding 6 types of different measurements to room: each measurement contains of general 
measurement data and measurement entries with measured values and automatically calculated
results
- adding electricians to application which can be later add to protocol
- adding title page information about measurements condition to protocol
- generating PDF protocol file with preview in application
- saving generated PDF in application directory with name given by user
- saving all application data to file which is loading on application startup

## Backend repository
https://github.com/Marcin1990x/electrical-protocols-manager
## Frontend repository
https://github.com/Marcin1990x/electrical-protocols-manager-ui

## Application is developed using following technologies:
<p align="left">
    <img src="https://ultimateqa.com/wp-content/uploads/2020/12/Java-logo-icon-1.png" alt="java" width="80" height="50"/> 
    <img src="https://e4developer.com/wp-content/uploads/2018/01/spring-boot.png" alt="spring" width="90" height="50"/> 
    <img src="https://www.tutorialkart.com/wp-content/uploads/2017/08/apache_pdfbox.png" alt="java" width="" height="50"/>
    <img src="https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2021/09/01031030/ReactJS.png" alt="java" width="" height="50"/>
    <img src="https://jaki-jezyk-programowania.pl/img/technologies/javascript.png" alt="java" width="" height="50"/>
    <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="java" width="" height="50"/>
    <img src="https://react-pdf.org/images/og-banner.png" alt="java" width="" height="50"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="50" height="50"/>
    <img src="https://junit.org/junit4/images/junit5-banner.png" alt="java" width="90" height="50"/>
    <img src="https://javadoc.io/static/org.mockito/mockito-core/1.9.5/org/mockito/logo.jpg" alt="java" width="90" height="50"/>
    <img src="https://avatars.githubusercontent.com/u/1595737?s=200&v=4" alt="java" width="50" height="50"/>
</p>

## To run the application in development mode, follow these steps :
- download both backend and frontend repositories from links above
- install NODE js and npm 
- open and run backend application using IntelliJ IDEA
- open frontend application using VS Code, run 'npm install' in console, next run 'npm start' in console
- application UI will open in your default browser

## To run the application from JAR file as standalone application
- download both backend and frontend repositories from links above
- copy frontend files to "/frontend" folder in backend main directory - create folder /frontend
- open backend repository using Intellij IDEA and run 'mvn package' - it will create
complete JAR file with all files needed to run both backend and frontend (build procedure added in pom.xml file)
- to run application correctly with JAR file you need to copy font files to JAR folder (arial.ttf, arialbd.ttf),
theoryImages folder and create empty pdf folder

