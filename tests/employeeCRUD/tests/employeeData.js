
var employeeData = function(){
    this.username = "Luke";
    this.password = "Skywalker"

    this.employeeDetails = [
            {   "firstName":"vito", 
                "lastName":"corleone",
                "startDate":"1986-01-01",
                "email":"vito@godfather.com"
            },
            {   "firstName":"michael", 
                "lastName":"corleone",
                "startDate":"1999-01-01",
                "email":"michael@godfather.com"
            }
        ]
        
    
}
module.exports = new employeeData();
