from flask import Flask, render_template, request
import csv

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


def write_to_csv(data):
    with open('database.csv', 'a', newline='') as database:
        name = data['name']
        email = data['email']
        subject = data['subject']
        message = data['message']

        csv_writer = csv.writer(database, delimiter=',', quotechar='"', quoting=0)
        csv_writer.writerow([name, email, subject, message])


@app.route('/submit_form', methods=['POST', 'GET'])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.form.to_dict()
            write_to_csv(data)
            return 'form submitted'
        except:
            return 'did not save to database'
    else:
        return 'something went wrong'
