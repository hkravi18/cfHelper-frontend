module.exports.secToDate = (secs) => {
    let days = Math.floor(secs / (3600*24));
    secs  -= days*3600*24;
    let hrs = Math.floor(secs/3600);
    secs  -= hrs*3600;
    let mins = Math.floor((secs%3600)/60);
    secs  -= mins*60;
    
    let str = "";  
    if (days > 0) {
        if (days < 10) str += "0" + days.toString();
        else str += days.toString();
        str += " days " 
    }

    if (hrs<10) {
        str += "0" + hrs.toString();
    } else {
        str += hrs.toString();
    }
    str += ":"
    if (mins<10) {
        str += "0" + mins.toString();
    } else {
        str += mins.toString();
    }
    str += ":"
    if (secs<10) {
        str += "0" + secs.toString();
    } else {
        str += secs.toString();
    }
    return str;
}