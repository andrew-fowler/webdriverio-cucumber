/**
 * Created by andrewfowler on 2/28/17.
 */
import createFile from '../support/action/createFile';

module.exports = function given() {
    this.Given(/^we have a (csv) with data$/,
        function(ext, data){
            var filename = "test."+ext;
            var separator = ",";
            createFile(filename, data, separator);
        } );

    this.Given(/^we have a (xls|xlsx|tsv) with data$/,
        function(ext, data){
            var filename = "test."+ext;
            var separator = "\t";
            createFile(filename, data, separator);
        });

    this.Given(/^we go to the internet$/,
        function(){
            browser.url("https://the-internet.herokuapp.com/upload");
        } );

    this.When(/^we upload the (csv|xls|xlsx|tsv)$/,
        function(ext){
            browser.chooseFile("input[type='file']", "./test."+ext);

            var btnUpload = browser.element("//input[@type='submit']");
            btnUpload.click();
        } );

    this.Then(/^the filename is displayed$/,
        function(){
            var panel = browser.element("div[id='uploaded-files']");
            var successMessage= browser.element("//h3[contains(.,'File Uploaded!')]");
            expect(panel.getText().toLowerCase()).to.contain('test.');
            expect(successMessage.isVisible()).to.equal(true);
        } );
};
