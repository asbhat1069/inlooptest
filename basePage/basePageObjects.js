
var basePageObjects = function(){

    this.usernameTextbox = element(by.model("user.name"));
    this.passwordTextbox = element(by.model("user.password"));

    this.loginButton    = element(by.buttonText("Login"));
    this.logoutButton   = element(by.cssContainingText(".main-button", "Logout"));

    this.cancelButton   = element(by.cssContainingText(".subButton.bCancel", "Cancel"));
    this.addButton      = element(by.buttonText("Add"));
    this.updateButton   = element(by.buttonText("Update"));
    this.backButton     = element(by.cssContainingText(".subButton.bBack","Back"));
    this.deleteButton   = element(by.cssContainingText(".main-button", "Delete"));

}

module.exports = new basePageObjects();