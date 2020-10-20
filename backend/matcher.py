try:
    from backend.utils import *
except:
    from utils import *
def match(jobs, candidates):
    """
    The Propose-and-Reject Algorithm:
        - We think of the algorithm as proceeding in "days" to have a clear unambiguous sense of discrete time.

        1. Every Morning: Each job proposes (i.e. makes an offer) to the most preferred candidate on its list who has not yet rejected this job
        2. Every Afternoon: Each candidate collects all the offers she received in the morning; to the job offer she likes best among these, she
        responds "maybe" (she now has it in hand or on a string), and to the other offers she says "no" (i.e., she rejects them).
        (This is just a way for us to virtually model that there are no "exploding offers" and a job can't withdraw an offer once an offer is made.)
        3. Every Evening: Each rejected job crosses off the candidate who rejected its offer from its list.

        - The above loop is repeated each successive day until there are no offers rejected. At that point, each candidate has a job offer in hand (i.e. on a string);
        and on this day, each candidate accepts their offered job (i.e. the job offer she has in hand) and the algorithm terminates.
    
    Source: https://www.eecs70.org/static/notes/n4.pdf
    """

    # Day Loop
    no_offers_rejected = False
    while not no_offers_rejected:
        no_offers_rejected = True
        
        # Morning
        for j in jobs:
            j.propose(j.preferences[0])

        # Afternoon
        for c in candidates:
            # https://www.w3schools.com/python/ref_func_sorted.asp
            c.string = sorted(c.string, lambda j: c.preferences.index(j), reverse=False)

            if len(c.string) > 1:
                no_offers_rejected = False

            # Evening
            for j in c.string[1:]:
                j.remove(c)
            
            # Finish Afternoon
            c.string = c.string[:1]
