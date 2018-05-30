'use strict';
var using           = require("jasmine-data-provider");
var employee        = require("../pagesAndFunctions/employeeFunctions.js");
var employeeData    = require("./employeeData.js");

describe("Demo tests", function(){
    
    var employeeNames = [];
    var editedEmployeeNames = [];

    beforeAll(function(){
        employee.login(employeeData.username, employeeData.password);
    });

    afterAll(function(){
        employee.logout();
    });


    using(employeeData.employeeDetails, (employeeDetail)=>{
        var editedEmployeeDetails   =  {    "firstName" : employeeDetail["firstName"]+"-edited", 
                                            "lastName"  : employeeDetail["lastName"]+"-edited", 
                                            "startDate" : employeeDetail["startDate"], 
                                            "email"     : "editedemail@email.com"
                                        }
        it("Create new employee "+employeeDetail["firstName"]+" and verify addition",function(){
            employee.createEmployee(employeeDetail).then(()=>{
                employee.verifyEmployeePresent(employeeDetail["firstName"]+" "+employeeDetail["lastName"]);
            });
        });

        it("Edit employee "+employeeDetail["firstName"]+" and verify edit",function(){
            employee.editEmployee(employeeDetail["firstName"], editedEmployeeDetails).then(()=>{
                employee.verifyEmployeeEdited(editedEmployeeDetails);
            });
        });

        it("Delete employee "+editedEmployeeDetails["firstName"]+" and verify deletion",function(){
            employee.deleteEmployee(editedEmployeeDetails["firstName"]+" "+editedEmployeeDetails["lastName"]).then(()=>{
                employee.verifyEmployeeNotPresent(editedEmployeeDetails["firstName"]+" "+editedEmployeeDetails["lastName"]);
            });
        });
    });
});
