#!/usr/bin/env python

#-----------------------------------------------------------------------
# iw.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import flask
import lfsr
import testLFSR

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

@app.route('/visualization', methods=['GET', 'POST'])
def visual():

    if flask.request.method == "POST":
        visanswer = flask.request.form.get('visanswer')
        solution = flask.request.form.get('solution')
        print(solution)
        if visanswer == solution:
            result = 'passed, congratulations!'
        else:
            result = 'wrong, try again'
        return flask.jsonify({'output':result})

    html_code = flask.render_template('visualization.html')
    response = flask.make_response(html_code)
    return response

#-----------------------------------------------------------------------

@app.route('/code', methods=['GET', 'POST'])
def coding():

    user_code = ''
    if flask.request.method == "POST":
        user_code = flask.request.form['codetext']
        print("user_code: ", user_code)
        passed_int, result, err = testLFSR.test_user_code(user_code)
        if passed_int == 1:
            passed = "ALL TESTS PASSED! CONGRATULATIONS!"
        else:
            passed = "Test Failed, See Error Log"

        print(passed)
        return flask.jsonify({'passed':passed, 'output':result, 'error':err})

    html_code = flask.render_template('code.html')
    response = flask.make_response(html_code)
    return response
