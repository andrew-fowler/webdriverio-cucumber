/**
 * Created by andrewfowler on 3/1/17.
 */
module.exports = (name, data, char) => {
    var datatable = data.raw();
    var csvContent = "";

    datatable.forEach(function(infoArray){
        var dataString = infoArray.join(char);
        csvContent += dataString + "\n";
    });

    var fs = require('fs');
    fs.writeFile(name, csvContent, function(err) {});
};
