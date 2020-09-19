from matcher import *
import pandas as pd

def process(data):
    """
    data: path to file
    """
    df = pd.read_csv(data).fillna("")
    for i in df:
        print(df)
    