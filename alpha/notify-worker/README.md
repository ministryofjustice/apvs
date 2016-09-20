# NOTIFY-WORKER

This is an example async worker implemented as a node process.

This example uses several node packages not used elsewhere in this proof of concept:

* [cron](https://github.com/ncb000gt/node-cron): Allows for cron syntax scheduling of logic within the node application
* [nodemailer](https://github.com/nodemailer/nodemailer): Email module for node js, used in this instance to send a simple plaintext message to the SMTP debug container
