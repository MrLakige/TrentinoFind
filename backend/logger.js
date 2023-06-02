const fs = require('fs');
const date = require('date-and-time');
const fileLog = './logs/';

exports.init = function(){
    fs.writeFile(fileLog+'error.txt', 'logs error file\n', err => {
        if (err) console.error(err);
    });
    fs.writeFile(fileLog+'warning.txt', 'logs warning file\n', err => {
        if (err) console.error(err);
    });
    fs.writeFile(fileLog+'event.txt', 'logs event file\n', err => {
        if (err) console.error(err);
    });
}

exports.error = function(message){
    fs.appendFile(fileLog+'error.txt', '['+date.format(new Date(),'YYYY/MM/DD HH:mm:ss')+']\n '+message+'\n\n', err => {
        if (err) console.error(err);
    });
}

exports.warning = function(message){
    fs.appendFile(fileLog+'warning.txt', '['+date.format(new Date(),'YYYY/MM/DD HH:mm:ss')+']\n '+message+'\n\n', err => {
        if (err) console.error(err);
    });
}

exports.event = function(message){
    fs.appendFile(fileLog+'event.txt', '['+date.format(new Date(),'YYYY/MM/DD HH:mm:ss')+']\n '+message+'\n\n', err => {
        if (err) console.error(err);
    });
}

exports.testInit = function(){
    fs.appendFile(fileLog+'test.txt', 'test log errors\n', err => {
        if (err) console.error(err);
    });
}

exports.test = function(message){
    fs.appendFile(fileLog+'test.txt', '['+date.format(new Date(),'YYYY/MM/DD HH:mm:ss')+']\n'+message+'\n\n', err => {
        if (err) console.error(err);
    });
}