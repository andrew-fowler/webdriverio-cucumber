/**
 * Created by andrewfowler on 2/28/17.
 */
import createFile from '../support/action/createFile';

module.exports = function given() {
    this.Given(/^we have a (csv) with data$/,
        function(ext, data){
            let filename = "test."+ext;
            let separator = ",";
            createFile(filename, data, separator);
        } );

    this.Given(/^we have a (xls|xlsx|tsv) with data$/,
        function(ext, data){
            let filename = "test."+ext;
            let separator = "\t";
            createFile(filename, data, separator);
        });

    this.Given(/^we go to the internet$/,
        function(){
            browser.url("https://the-internet.herokuapp.com/upload");
        } );

    this.When(/^we upload the (csv|xls|xlsx|tsv)$/,
        function(ext){
            browser.chooseFile("input[type='file']", "./test."+ext);

            let btnUpload = browser.element("//input[@type='submit']");
            btnUpload.click();
        } );

    this.Then(/^the filename is displayed$/,
        function(){
            let panel = browser.element("div[id='uploaded-files']");
            let successMessage= browser.element("//h3[contains(.,'File Uploaded!')]");
            expect(panel.getText().toLowerCase()).to.contain('test.');
            expect(successMessage.isVisible()).to.equal(true);
        } );
};
