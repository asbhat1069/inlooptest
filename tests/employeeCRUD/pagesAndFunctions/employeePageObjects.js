var basePageObjects = require("../../../basePage/basePageObjects.js")

var employeePageObjects = function(){

    this.create = $("#bAdd");
    this.edit   = $("#bEdit");
    this.delete = $("#bDelete");

    this.firstName  = element(by.model("selectedEmployee.firstName"));
    this.lastName   = element(by.model("selectedEmployee.lastName"));
    this.startDate  = element(by.model("selectedEmployee.startDate"));
    this.email      = element(by.model("selectedEmployee.email"));

    this.employee   = function(employeeName){
        return element(by.cssContainingText("[ng-repeat='employee in employees']", employeeName));
    } 
    
}

employeePageObjects.prototype = basePageObjects;
module.exports = new employeePageObjects();
