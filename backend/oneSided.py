import pandas as pd
from utils import *
ran = False
def process(data):
    """
    data: path to file
    """
    global ran
    ran = True
    popularity = {}
    df = pd.read_csv(data).fillna("")
    cols = ["Preference #1", "Preference #2", "Preference #3", "Preference #4", "Preference #5"]
    # print(len(df))
    jobs = [] #mentees
    candidates = []
    for r in range(len(df)):
        # Job([], df["Your Name"][r])
        mentee_name = df["Your Name"][r]
        j = Job(df["Your Name"][r], [])
        for i in range(len(cols)):
            mentor_name = df[cols[i]][r]
            # names = [c.name for c in candidates]
            if mentor_name not in Candidate.names:
                c = Candidate(mentor_name, [])
                Candidate.names.append(mentor_name)
                candidates.append(c)
            else:
                c = candidates[Candidate.names.index(mentor_name)]
            popularity[c] = popularity.get(c, 0) + (len(cols) - i)
            j.preferences.append(c)
        jobs.append(j)
        # print(f"{mentee_name}: {[c.name for c in j.preferences]}\n")
    popularity = {k: v for k, v in sorted(popularity.items(), key=lambda entry: entry[1], reverse=True)}
    # print(popularity)

    demand = {}
    for j in jobs:
        total = 0
        for c in j.preferences:
            total += popularity[c]
        demand[j] = total
    demand = {k: v for k, v in sorted(demand.items(), key=lambda entry: entry[1], reverse=True)}
    # print(demand)
    # print([c.name for c in candidates])
    # exit(1)
    
    for j in jobs:
        mentors = set(candidates)
        for preferred in j.preferences:
            mentors.remove(preferred)
        for s in mentors:
            j.preferences.append(s)
        # print(f"{j.name}: {[c.name for c in j.preferences]}\n")
    # jobs = sorted(jobs, key=lambda j: demand[j], reverse=True)
    jobs = demand.keys()
    # [print(f"{j.name}: {demand[j]}") for j in jobs]
    return jobs, candidates

def match(jobs, candidates):
    matches = {}
    matched = []
    unmatched = []
    for j in jobs:
        for i in range(len(j.preferences)):
            preferred = j.preferences[i]
            if preferred not in matched:
                j.randomized = i > 4
                matched.append(preferred)
                matches[j] = preferred
                break
        if j not in matches.keys():
            unmatched.append(j)

    return matches


def run():
    if ran:
        return "Already Generated"
    jobs, candidates = process("./data/mentors.csv")
    matches = match(jobs, candidates)
    # for mentee, mentor in matches.items():
    #     print(f"Mentee: {mentee.name}, Mentor: {mentor.name}")
    n_randomized = 0
    n_unmatched = 0
    final = ""
    for mentee in jobs:
        if mentee in matches:
            result = f"Mentee: {mentee.name}, Mentor: {matches[mentee].name}"
            if mentee.randomized:
                result += " RANDOMIZED"
                n_randomized += 1
            print(result)
            final += result + "\n"
        else:
            s = f"Mentee: {mentee.name}, UNMATCHED"
            print(s)
            final += s + "\n"
            n_unmatched += 1
    print()
    s = f"SUMMARY:\nRandomized: {n_randomized}/{len(matches)}, Unmatched: {n_unmatched}/{len(matches) + n_unmatched}"
    print(s)
    final += "\n" + s + "\n"
    return final



if __name__ == "__main__":
    run()
