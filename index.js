var rates;
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
getJSON("https://raw.githubusercontent.com/saisrikar8/json/main/rates.json", storeJson);
function storeJson(status, json){
    rates = json;
    createOptions();
}
function createOptions(){
    var placeholder = document.createElement("option");
    placeholder.value = "placeholder";
    placeholder.innerHTML = "Select an option..."
    document.getElementById("currency").appendChild(placeholder);
    for (let currency in rates){
        var obj = rates[currency];
        var option = document.createElement("option");
        option.value = obj.name;
        option.innerHTML = obj.name;
        document.getElementById("currency").appendChild(option);
    }
}
function convertCurrency(){
    var dollars = getDollars();
    if (isNaN(dollars)){
        error("You entered an invalid input in the dollars field");
        return;
    }
    var currency = getCurrency();
    if (currency == null){
        return;
    }
    var factor;
    var obj;
    for (let curr in rates){
        obj = rates[curr];
        if (obj.name == currency){
            factor = obj.rate;
            break;
        }
    }
    var message = document.getElementById("message");
    message.innerText = "$" + parseFloat(dollars) + " is about " + (Math.trunc(factor * dollars)) + " " + obj.name + "s and " + (Math.round(((factor*dollars)-(Math.trunc(factor*dollars)))*100)) + " " + obj.name + " cents\nFormula:\nMultiply by " + factor;
    document.getElementById("body").appendChild(message);
    window.scrollBy(0, 100);
}
function getDollars(){
    var dollars = document.getElementById("dollars");
    return parseFloat(dollars.value);

}
function getCurrency(){
    var select = document.getElementById("currency");
    if (select.value == "placeholder" || select.value == undefined){
        error("You must select a valid currency");
        return null;
    }
    else{
        return select.value;
    }
}
function error(text){
    swal({
        title: "Oops!",
        text: text,
        icon: "https://i.redd.it/rnj1si3kzwn51.png",
        button: true
    })
}
