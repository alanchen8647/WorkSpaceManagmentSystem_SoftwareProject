class Employee:
    def __init__(self,name):
        self.name = name
    

class Manager(Employee):
    def __init__(self,name):
        super().__init__(self,name)
        self.manages = []

    def add_employee(self,employee):
        self.manages.append(employee)