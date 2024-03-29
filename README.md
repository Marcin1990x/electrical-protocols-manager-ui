# Electrical protocols manager

<hr>

## Application description

Application Electrical protocols manager allows user to create PDF protocol from
electrical measurements done in building. User can create building structure, add electricians,
add 6 different types of measurements, add title page information, generate complete
protocol from this data and save it as PDF file in application directory.

Application is prepared to use locally on computer. It runs with embedded Tomcat server
and use H2 database to manage data when application is working.

## Development comments

It is my first bigger application which is used electricians in real. I mainly focused
on backend because it is what I want more to do in the future.
<br> About the backend: <br>
I did a lot of refactoring because when programming I learned a lot at the same time so application
changed its shape many times. I tried to write as clean code as I'm able at this moment.
I know that it is still many work to do to make this code cleaner, more maintainable and scalable.
There are only few tests written, there is need to cover all the code. Now I know and understand
that tests should be written in parallel with the code.
<br> About the frontend: <br>
It was written by me to just work. There is a lot of ugly code to refactor but like I wrote above
I'm focusing on the backend site.

## Application functionalities
- creating building structure: building, floors, rooms
- adding 6 types of different measurements to room: each measurement contains of general
  measurement data and measurement entries with measured values and automatically calculated
  results
- editing all added measurements (new feature 18.01.2024)
- adding electricians to application which can be later add to protocol
- adding title page information about measurements condition to protocol
- generating PDF protocol file with preview in application
- saving generated PDF in application directory with name given by user
- saving all application data to file which is loading on application startup

## Generated PDF protocol includes:
- title page with electricians information, protocol title, protocol number, client's data,
  measurement dates and conditions, comments
- each measurement on separate page, room by room. Measurement general information and entries
  values with results
- legend page with description of all added measurements
- pages with theory for measurements
- page with electricians data
- page with calculated statistics

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

## Example protocol

https://github.com/Marcin1990x/electrical-protocols-manager/blob/master/pdf/example-protocol.pdf

## User interface

- home page <br>
  <img src="https://github.com/Marcin1990x/electrical-protocols-manager/blob/master/repo-screens/homepage.png?raw=true" width="880" height="356"/>
- project page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/projectpage.png"  width="837" height="381"/>
- electricians page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/electricianspage.png" width="960" height="260"/>
- title page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/protocoltitlepage.png" width="567" height="409"/>
- structure page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/structurepage.png" width="940" height="440"/>
- room page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/roompage.png" width="862" height="335"/>
- measurement add page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/addmeasurementpage.png" width="958" height="354"/>
- measurement page <br>
  <img src="https://github.com/Marcin1990x/electrical-protocols-manager/blob/master/repo-screens/measurementpage.png?raw=true" width="930" height="300"/>
- pdf generate page <br>
  <img src="https://raw.githubusercontent.com/Marcin1990x/electrical-protocols-manager/master/repo-screens/generationpdfpage.png" width="570" height="425"/>

