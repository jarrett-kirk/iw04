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
def index():

    html_code = flask.render_template('home.html')
    response = flask.make_response(html_code)
    return response
