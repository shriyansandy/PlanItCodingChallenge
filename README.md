Technology Used:
=============================
Automation Tool : Cypress 
Language : Javascript 
Testing Framework: Mocha 
Reporting : Mochawesome 
Browser : Google Chrome - Version 90.0.4430.212 (Official Build) (64-bit) & Firefox - Version 88.01(64-bit)
Platform : Windows 10 machine

Pre-Requisite:
-------------------
Install Node.js in your machine.

Set NODE_HOME in your environment variable.

Clone the code from "https://github.com/shriyansandy/PlanItCodingChallenge.git"

Run "npm init" command to download all the dependencies.

To run test and generate report using mochawesome please execute the following command from project path: 
To run on chrome browser:
------------------------------
"node_modules/.bin/cypress run --reporter mochawesome --spec cypress\integration\examples\TestSuite.js --headed  --browser chrome"

To run on firefox browser:
------------------------------
"node_modules/.bin/cypress run --reporter mochawesome --spec cypress\integration\examples\TestSuite.js --headed  --browser firefox".
