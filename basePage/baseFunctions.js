var baseObjects = require("./basePageObjects.js");

var baseFunctions = function(){


    this.login = function(username, password){
        return baseObjects.usernameTextbox.clear().sendKeys(username).then(()=>{
            return baseObjects.passwordTextbox.clear().sendKeys(password).then(()=>{
                
                return baseObjects.loginButton.click();
            });
        });
    }

    this.logout = function(){
        return baseObjects.logoutButton.click();
    }

    this.scrollToDesiredElem = function (elm, alignToTop=false) {
        var until = protractor.ExpectedConditions;
        return browser.executeScript("arguments[0].scrollIntoView(arguments[1]);", elm.getWebElement(), alignToTop).then(() => {
            return browser.wait(until.visibilityOf(elm, 5000, 'element not visible even after 5 secs'));
        });

    };

}

module.exports = new baseFunctions();
