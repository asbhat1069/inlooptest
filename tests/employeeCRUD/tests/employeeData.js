
var employeeData = function(){
    this.username = "Luke";
    this.password = "Skywalker"

    this.employees = [
            {   "firstName":"John", 
                "lastName":"Doe",
                "startDate":"2017-01-01",
                "email":"edited@edited.com"
            }
        ]
    
}
module.exports = new employeeData();
