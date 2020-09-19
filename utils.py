class Entity():
    
    def __init__(self, preferences):
        self.preferences = preferences
    
    def remove(self, other):
        self.preferences.remove(other)
    
                

class Candidate(Entity):

    def __init__(self, preferences):
        # https://www.programiz.com/python-programming/methods/built-in/super
        super().__init__(preferences)
        self.string = []
        

class Job(Entity):

    def propose(self, other):
        if self not in other.string:
            other.string.append(self)
    