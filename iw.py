#!/usr/bin/env python

#-----------------------------------------------------------------------
# iw.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import flask
import database
import lfsr
import subprocess

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
    print('accessed /code page')
    if flask.request.method == "POST":
        print("made it here")
        user_code = flask.request.form['user_code']
        print(user_code)

    html_code = flask.render_template('code.html')
    response = flask.make_response(html_code)
    return response
