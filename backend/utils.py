class Entity():
    
    def __init__(self, name, preferences):
        self.name = name
        self.preferences = preferences
    
    def remove(self, other):
        self.preferences.remove(other)
    
                

class Candidate(Entity):

    names = []

    def __init__(self, name, preferences):
        # https://www.programiz.com/python-programming/methods/built-in/super
        super().__init__(name, preferences)
        self.string = []
        

class Job(Entity):

    def propose(self, other):
        if self not in other.string:
            other.string.append(self)
    