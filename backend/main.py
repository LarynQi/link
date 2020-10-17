import flask
from oneSided import *

app = flask.Flask("__main__")

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello Flask + React", generate=run)

# https://hackersandslackers.com/flask-routes/
# https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response
@app.route("/api/v1/generate", methods=['GET'])
def generate():
    # headers = {"Content-Type": "application/json"}
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

app.run(debug=True)