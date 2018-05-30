var HtmlScreenshotReporter  = require('protractor-jasmine2-screenshot-reporter');
var d                       = new Date();
var month                   = d.getMonth() + 1;
var dt                      = d.getDate() + "-" + month + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


var url                     = (typeof process.env.BASEURL !== 'undefined') ? process.env.BASEURL : "http://cafetownsend-angular-rails.herokuapp.com/login";
var DEFAULT_TIMEOUT_INTERVAL = 60000;

var reporter = new HtmlScreenshotReporter({
    dest: './report',
    filename: 'report.html',
    cleanDestination: true,
    showSummary: true,
    showConfiguration: true,
    reportTitle: "UI Automation Report :" + dt,
    ignoreSkippedSpecs: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: false,
    showQuickLinks: true,
    reportFailedUrl: true,
    inlineImages: false
});

exports.config = {
    seleniumServerJar:  process.env.SELENIUMSTANDALONESERVERJAR,
    directConnect: true,
    multiCapabilities: [
        {
            browserName: 'firefox',
            shardTestFiles: true,
            maxInstances: 3,
            specs: [ "./tests/employeeCRUD/tests/employeeTests.js" ],
        }
    ],

    beforeLaunch: function() {
        console.log("Launch Date and Time :"+dt);
        return new Promise(function(resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function(exitCode) {
        d = new Date();
        var end_dt = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        console.log("Date-Time After Test Finished : "+end_dt);
        return new Promise(function(resolve) {
            exitCode = 0;
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL;
        browser.manage().timeouts().implicitlyWait(DEFAULT_TIMEOUT_INTERVAL);
        browser.manage().timeouts().pageLoadTimeout(DEFAULT_TIMEOUT_INTERVAL);

        var testURL = url;

        browser.ignoreSynchronization = false;
        browser.get(url);
        browser.manage().window().maximize();
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: DEFAULT_TIMEOUT_INTERVAL,
        isVerbose: true,
        includeStackTrace: true,
    },
};

