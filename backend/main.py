import flask
from oneSided import *
from convert import convert
import os
# https://github.com/neelsomani/react-flask-heroku
# app = flask.Flask("__main__")
app = flask.Flask(__name__)

# print(os.getcwd())
@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello Flask + React", generate=run)

# https://hackersandslackers.com/flask-routes/
# https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response
@app.route("/api/v1/generate", methods=['GET', 'POST'])
def generate():
    # headers = {"Content-Type": "application/json"}
    # print("RECEIVED", flask.request.args.get('data'))
    print("RECEIVED", [flask.request.form[x] for x in flask.request.form])

    # convert("test", flask.request.args.get('data'))
    print("REQUEST RECEIVED.")
    # response = flask.make_response(
    #     'Test worked!',
    #     200
    #     )
    response = flask.make_response(
        run(),
        200
        )
    response.headers["Content-Type"] = "application/json"
    return response
# @app.route("/generate")
# def generate():
#     return flask.render_template("index.html", token=run())

if name == "__main__":
    app.run(debug=True)