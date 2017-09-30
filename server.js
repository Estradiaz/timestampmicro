const express = require('express');
const app = express();

app.get("/:id", function(req, res){
    //console.log(req);
    let dateString = req.params.id;
    console.log(dateString);
    printJSON(res, dateString);    
});
app.get("/", function(req, res){
    //console.log(req);

    printJSON(res, "dateString");    
});


let printJSON = function(res, dateString){

    let pair = calcDatePair(dateString);
    res.send(JSON.stringify(pair));
}

let calcDatePair = function(ds){

    let unix = convertDateToUnix(ds);
    let date = convertUnixToDate(ds);
    if (ds === unix && ds === date){
        return  {unix: null, date: null};
    } else {
        return  {unix: unix, date: date};
    }
}

let convertUnixToDate = function(unixStr){
    let unixInt = parseInt(unixStr);
    if((unixInt + "").length === (unixStr + "").length){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let a = new Date(unixInt * 1000);
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let day = a.getDay();
        return "" + month + " " + day + ", " + year; 
    } else {
        return unixStr;
    }
}

let convertDateToUnix = function(dateString){
    //month day, year
    console.log(dateString);
    let [month, day, year] = dateString.split(" ");
    
    if([month, day, year].filter(Boolean).length === 3){

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(x => {return x.toLowerCase()});
        let a = new Date(parseInt(year), months.indexOf(month.toLowerCase()) + 1, parseInt(day));
        return a.getTime()/1000 + "";
    } else {
        return dateString;
    }

}

const server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});