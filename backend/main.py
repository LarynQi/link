import flask
from oneSided import *

app = flask.Flask("__main__")

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello Flask + React", generate=run)

@app.route("/generate")
def generate():
    result = run()
    # print(f"RESULT: {result}")

    return flask.render_template("index.html", token=result)

app.run(debug=True)