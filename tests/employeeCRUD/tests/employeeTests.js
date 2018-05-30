'use strict';
var employee = require("../pagesAndFunctions/employeeFunctions.js");
var employeeData = require("./employeeData.js");

describe("Demo tests", function(){
    
    var employeeNames = [];
    var editedEmployeeNames = [];

    beforeAll(function(){
        employee.login(employeeData.username, employeeData.password);
    });

    afterAll(function(){
        employee.logout();
    });

    it("Create new employee and verify addition",function(){
        employee.createEmployee("Abhi2", "Testing2", "2018-01-01", "a@b.com").then(()=>{
            employee.verifyEmployeePresent("Abhi2 Testing2");
        });
    });

    it("Edit employee and verify edit",function(){
        employee.editEmployee("Abhi2 Testing2", {"firstName": "Abhi-edited", "lastName":"Edited lastname", "startDate":"2017-01-01", "email":"edited@edited.com"}).then(()=>{
            employee.verifyEmployeePresent("Abhi-edited Edited lastname");
        });
    });

    it("Delete employee and verify deletion",function(){
        employee.deleteEmployee("Abhi-edited Edited lastname");
    });

});
