import pandas as pd
try:
    from backend.utils import *
except:
    from utils import *
def process(data):
    """
    data: path to file
    """
    popularity = {}
    df = pd.read_csv(data).fillna("")
    cols = ["Preference #1", "Preference #2", "Preference #3", "Preference #4", "Preference #5"]
    jobs = [] # mentees
    candidates = [] # mentors
    for r in range(len(df)):
        mentee_name = df["Your Name"][r]
        j = Job(df["Your Name"][r], [])
        for i in range(len(cols)):
            mentor_name = df[cols[i]][r]
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
    # configurable
    demand_factor = 1 / (len(cols) - 1)
    demand_func = lambda popularity, i: popularity * (1 / (1 + (i * demand_factor)))
    # demand_factor = 1 / len(cols)
    # demand_func = lambda popularity, i: popularity * (1 / (1 + (i + 1) * demand_factor))
    for j in jobs:
        total = 0
        for i in range(len(j.preferences)):
            c = j.preferences[i]
            total += demand_func(popularity[c], i)
        demand[j] = total
    demand = {k: v for k, v in sorted(demand.items(), key=lambda entry: entry[1], reverse=True)}
    # seen = set()
    # for k in demand:
    #     if demand[k] in seen:
    #         print("duplicate")
    #     seen.add(demand[k])
    # print(demand)
    # exit(1)
    # print(demand)
    # print([c.name for c in candidates])
    
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
        for i in range(5):
            preferred = j.preferences[i]
            if preferred not in matched:
                # j.randomized = i > 4
                j.randomized = False
                matched.append(preferred)
                matches[j] = preferred
                break
        if j not in matches.keys():
            unmatched.append(j)
            j.randomized = True
    for j in unmatched:
        for i in range(5, len(j.preferences)):
            preferred = j.preferences[i]
            if preferred not in matched:
                matched.append(preferred)
                matches[j] = preferred
                break
        if j not in matches.keys():
            j.unmatched = True

    return matches


def run():
    clean()
    try:
        jobs, candidates = process("./data/mentors.csv")
    except:
        # print('here')
        # heroku local
        jobs, candidates = process("./backend/data/mentors.csv")
    matches = match(jobs, candidates)
    # for mentee, mentor in matches.items():
    #     print(f"Mentee: {mentee.name}, Mentor: {mentor.name}")
    n_randomized = 0
    n_unmatched = 0
    final = ""
    for mentee in jobs:
        if mentee in matches:
            result = f"Mentee: {mentee.name}, Mentor: {matches[mentee].name} "
            if mentee.randomized:
                result += "RANDOMIZED "
                n_randomized += 1
            print(result)
            final += result
        else:
            s = f"Mentee: {mentee.name}, UNMATCHED "
            print(s)
            final += s
            n_unmatched += 1
    print()
    s = f"SUMMARY:\nRandomized: {n_randomized}/{len(matches)}, Unmatched: {n_unmatched}/{len(matches) + n_unmatched}"
    print(s)
    final += f"SUMMARY: Randomized: {n_randomized}/{len(matches)}, Unmatched: {n_unmatched}/{len(matches) + n_unmatched}"
    return final

def clean():
    Candidate.names = []
    
def run_trials(n):
    n_randomized = 0
    n_unmatched = 0
    for _ in range(n):
        clean()
        jobs, candidates = process("./data/mentors.csv")
        matches = match(jobs, candidates)

        for mentee in jobs:
            if mentee in matches:
                if mentee.randomized:
                    n_randomized += 1
            else:
                n_unmatched += 1
    print(f"Average stats over {n} trials:\nRandomized: {n_randomized / n}/{len(matches)}")

if __name__ == "__main__":
    run()
    # run_trials(50)
