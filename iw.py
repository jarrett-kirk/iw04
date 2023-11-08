#!/usr/bin/env python

#-----------------------------------------------------------------------
# iw.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import flask
import database
import lfsr
import subprocess
from RestrictedPython import compile_restricted
from RestrictedPython import safe_globals
from RestrictedPython.PrintCollector import PrintCollector

_print_ = PrintCollector

#-----------------------------------------------------------------------

app = flask.Flask(__name__, template_folder='pages')

#-----------------------------------------------------------------------

@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
def home():

    html_code = flask.render_template('home.html')
    response = flask.make_response(html_code)
    return response

#-----------------------------------------------------------------------

@app.route('/visualization', methods=['GET'])
def visual():

    html_code = flask.render_template('visualization.html')
    response = flask.make_response(html_code)
    return response

#-----------------------------------------------------------------------

@app.route('/code', methods=['GET', 'POST'])
def coding():

    user_code = ''
    if flask.request.method == "POST":
        user_code = flask.request.form['codetext']
        result = subprocess.run(["python", "-c", user_code], capture_output = True, text = True)
        print(result.stdout)
        return flask.jsonify({'output':result.stdout})

    html_code = flask.render_template('code.html')
    response = flask.make_response(html_code)
    return response

def my_exec(code):
    exec('global i; i = %s' % code)
    global i
    return i