var basePage = require("../../../basePage/baseFunctions.js");
var employeeObj = require("./employeePageObjects.js");

var employeeFunctions = function(){

    this.createEmployee = function(firstname, lastname, startDate, email){
        return employeeObj.create.click().then(()=>{
            return employeeObj.firstName.clear().sendKeys(firstname).then(()=>{
                return employeeObj.lastName.clear().sendKeys(lastname).then(()=>{
                    return employeeObj.startDate.clear().sendKeys(startDate).then(()=>{
                        return employeeObj.email.clear().sendKeys(email).then(()=>{
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
}

employeeFunctions.prototype = basePage;
module.exports = new employeeFunctions();