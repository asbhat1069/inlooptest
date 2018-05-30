var basePage = require("../../../basePage/baseFunctions.js");
var employeeObj = require("./employeePageObjects.js");

var employeeFunctions = function(){

    this.createEmployee = function(employeeDetails){
        return employeeObj.create.click().then(()=>{
            return employeeObj.firstName.clear().sendKeys(employeeDetails["firstName"]).then(()=>{
                return employeeObj.lastName.clear().sendKeys(employeeDetails["lastName"]).then(()=>{
                    return employeeObj.startDate.clear().sendKeys(employeeDetails["startDate"]).then(()=>{
                        return employeeObj.email.clear().sendKeys(employeeDetails["email"]).then(()=>{
                            return employeeObj.addButton.click()
                        });
                    });
                });
            });
        });
    }

    this.editEmployee = function(employeeName, editedValues){
        return this.scrollToDesiredElem(employeeObj.employee(employeeName)).then(()=>{
            return employeeObj.employee(employeeName).click().then(()=>{
                return employeeObj.edit.click().then(()=>{
                    if("firstName" in editedValues)
                    { employeeObj.firstName.clear().sendKeys(editedValues["firstName"]); }
                    if("lastName" in editedValues)
                    { employeeObj.lastName.clear().sendKeys(editedValues["lastName"]); }
                    if("startDate" in editedValues)
                    { employeeObj.startDate.clear().sendKeys(editedValues["startDate"]); }
                    if("email" in editedValues)
                    { employeeObj.email.clear().sendKeys(editedValues["email"]); }
                    return employeeObj.updateButton.click();
                }); 
            });
        });
    }

    this.deleteEmployee = function(employeeName){
        return this.scrollToDesiredElem(employeeObj.employee(employeeName)).then(()=>{
            return employeeObj.employee(employeeName).click().then(()=>{
                return employeeObj.delete.click().then(()=>{
                    return browser.switchTo().alert().then((alert)=>{
                        return alert.accept();
                    });
                });
            });
        });
    }

    this.verifyEmployeePresent = function(employeeName){
        browser.wait(employeeObj.employee(employeeName).isPresent(), 10000, "Employee "+employeeName+" not seen even after 10 seconds").then(()=>{
            this.scrollToDesiredElem(employeeObj.employee(employeeName)).then(()=>{
                expect(employeeObj.employee(employeeName).isDisplayed()).toBe(true, "Employee "+employeeName+" not displayed, Hence not created");
            });
        });
    }

    this.verifyEmployeeNotPresent = function(employeeName){
        expect(employeeObj.employee(employeeName).isPresent()).toBe(false, "Employee "+employeeName+" still seen!!");
    }

    this.verifyEmployeeEdited = function(editedEmployeeDetails){
        var employeeName = editedEmployeeDetails["firstName"]+" "+editedEmployeeDetails["lastName"];
        browser.wait(employeeObj.employee(employeeName).isPresent(), 10000, "Employee "+employeeName+" not seen even after 10 seconds").then(()=>{
            this.scrollToDesiredElem(employeeObj.employee(employeeName)).then(()=>{
                employeeObj.employee(editedEmployeeDetails["firstName"]).click().then(()=>{
                    employeeObj.edit.click().then(()=>{
                        expect(employeeObj.firstName.getAttribute('value')).toBe(editedEmployeeDetails["firstName"]);
                        expect(employeeObj.lastName.getAttribute('value')).toBe(editedEmployeeDetails["lastName"]);
                        expect(employeeObj.startDate.getAttribute('value')).toBe(editedEmployeeDetails["startDate"]);
                        expect(employeeObj.email.getAttribute('value')).toBe(editedEmployeeDetails["email"]);
                        employeeObj.backButton.click();
                    });
                });
            });
        });
    }
}

employeeFunctions.prototype = basePage;
module.exports = new employeeFunctions();