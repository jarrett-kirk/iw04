#!/usr/bin/env python

#-----------------------------------------------------------------------
# iw.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import flask
import database

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

@app.route('/coding', methods=['GET'])
def coding():

    html_code = flask.render_template('code.html')
    response = flask.make_response(html_code)
    return response
