# ASYNC-WORKER

This is an example async worker implemented as a node process.

This example uses several node packages not used elsewhere in this proof of concept:

* [cron](https://github.com/ncb000gt/node-cron): Allows for cron syntax scheduling of logic within the node application
* [nodemailer](https://github.com/nodemailer/nodemailer): Email module for node js, used in this instance to send a simple plaintext message to the SMTP debug container
* [python-shell](https://github.com/extrabacon/python-shell): Allows Python code to be called from a Node application

## Python

This project uses Python major [Version 2.7](https://www.python.org/download/releases/2.7/)

PIP is the Python package manager used.

[VirtualEnv](https://virtualenv.pypa.io/en/stable/) is used to manage an isolated Python environment for local development.

`pip install virtualenv`

Once virtualenv has been installed you create a new virtualenv project and then associate the async-worker root directory with that project:

1. mkvirtualenv apvs-async-worker
2. cd alpha/async-worker/
3. setvirtualenvproject apvs-async-worker # This syncs the project to the current directory

Any pip packages associated with the project can be restored to this clean environment as follows:

`pip install -r /path/to/requirements.txt`

If you subsequentally want to work on this project just type the following:

`workon apvs-async-worker`

It will take you to the project working directory and load the associated virtualenv environment.
