# To-Do Application tested with Playwright

Hi there! This is a starter project that I am using to practice and learn Playwright and testing automation as a whole. I also use the command `npx playwright test --workers 1` to run the project in order.

# Project Setup & Running Instructions

This project uses Python 3.9
## Installation

Make sure you have Python 3.9 or greater installed. You can confirm by running:

```bash
python3 --version
```

## Setup

1. Create your virtual environment and activate it
```bash
python3 -m venv venv
source venv/bin/activate
```
2. Install dependencies
```bash
pip install -r requirements.txt 
```

## Running
1. Make sure your virtual environment is active. If its not activate it:
```bash
source venv/bin/activate 
```
2. Run the app
```bash
python ./run.py
```

You should see the following output:
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:9090
 * Running on http://192.168.1.23:9090
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 561-585-745
```

And if you open [http://127.0.0.1:9090](http://127.0.0.1:9090) in your browser you should see the app
