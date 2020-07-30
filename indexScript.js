

var str = "";
var tabletag = document.querySelector('div');

//class for save list of data
class mapTableData {
    header = "";
    tds = [];
}
function getData(apiStr) {
    var splitedArray = apiStr.split('&');
    var rowsArray = [];
    var temparray = [];
    //devide the string as group
    for (var i = 0; i < splitedArray.length; i++) {
        if (splitedArray[i].startsWith('bid')) {
            if (temparray.length > 0) {
                rowsArray.push(temparray);
                temparray = [];
            }
        } else if (i == splitedArray.length - 1) {
            temparray.push(splitedArray[i]);
            rowsArray.push(temparray)
        } else {
            temparray.push(splitedArray[i]);
        }
    }

    //map the td values and header
    var finalMappedArray = [];
    rowsArray.forEach(index => {
        var individualTable = new mapTableData();
        individualTable.header = splitedArray[splitedArray.indexOf(index[0]) - 1].split('=')[1];
        //iterate the row(tr)
        index.forEach(x => {
            var temparr = [];
            //iterate the td 
            x.split(',').forEach(y => temparr.push(y));
            individualTable.tds.push(temparr);
        });
        finalMappedArray.push(individualTable);
    });
    return finalMappedArray;
}

function appendToTable(arr) {
    var tabletagvalue = "";
    for (var i = 0; i < arr.length; i++) {
        tabletagvalue += `<div class='header'>${arr[i].header}</div>`
        var length = arr[i].tds[0].length;
        tabletagvalue += "<div class='main-table-tag'><table class='table-tag'>";
        if (arr[i].tds[arr[i].tds.length - 1][0] === "") arr[i].tds.pop();
        for (var tr = 0; tr < arr[i].tds.length; tr++) {
            var row = arr[i].tds[tr];
            tabletagvalue += "<tr>";
            if (row[0] === 'tr0') {
                length -= 1;
                row.shift();
            }
            for (var j = 0; j < length; j++) {
                tabletagvalue += `<td>${row[j] === undefined ? '<input type="text" readonly />' :
                    row[j].includes('_') ?
                        row[j].replace('_', ' ').replace('_', ' ') :
                        row[j].includes('=') ?
                            row[j].split('=')[1].replace('#', ' ') :
                            row[j].includes('#') ?
                                row[j].replace('#', ' ') :
                                row[j].includes('00') ?
                                    parseFloat(row[j]).toFixed(2) :
                                    row[j]}</td>`;
            }
            tabletagvalue += "</tr>";
        }
        tabletagvalue += "</table></div>"
    }
    tabletag.innerHTML = tabletagvalue;
}

var request = new XMLHttpRequest();
request.open('Get', 'http://localhost:49593/get/GetInfo?basic=basic&read=1');
request.onload = function () {
    if (request.status >= 200 && request.status <= 400) {
        str = JSON.parse(this.responseText);
        var scrapeddata = getData(str);
        appendToTable(scrapeddata);
    } else {
        tabletag.innerHTML = "<h1>No Data Get..</h1>"
    }
}
request.send();
request.onerror = () => {
    tabletag.innerHTML = "<h1>Is Api Online?</h1>"
}