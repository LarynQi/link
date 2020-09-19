import flask

app = flask.FLask("__main__", static_folder="./react-frontend/build/static", template_folder="./react-frontend/build")

@app.route("/")
def my_index():
    return flask.render_template("index.html", token="Hello Flask + React")

app.run(debug=True)