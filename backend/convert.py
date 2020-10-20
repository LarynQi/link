try: 
    from backend.matcher import *
except:
    from matcher import *
import pandas as pd
import csv

def convert(filename, data):
    path = "./data/" + filename + ".csv"
    with open(path, 'w') as new_file:
        csv_writer = csv.writer(new_file, delimiter=',')
        csv_writer.writerow("Name,Preference #1,Preference #2,Preference #3,Preference #4,Preference #5")
        for entry in data:
            curr = "{name},{pref1},{pref2},{pref3},{pref4},{pref5}".format(name=entry[0], pref1=entry[1], pref2=entry[2], pref3=entry[3], pref4=entry[4], pref5=entry[5])
            csv_writer.writerow(curr)
    # df = pd.read_csv(data).fillna("")
    # for i in df:
    #     print(df)