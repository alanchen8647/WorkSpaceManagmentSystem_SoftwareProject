class employee:
    def __init__(self,name):
        self.name = name

        
class manager(employee):
    def __init__(self,name,employee):
        super().__init__(self,name)
        self.manages = []