/**
 * Created by andrewfowler on 3/1/17.
 */
module.exports = (name, data, char) => {
    let fs = require('fs');
    let datatable = data.raw();
    let csvContent = "";

    datatable.forEach(function(infoArray){
        let dataString = infoArray.join(char);
        csvContent += dataString + "\n";
    });

    fs.writeFile(name, csvContent, function(err) {});
};
