var Money = require('../database.js').Money;

exports.create = function (params, callback) {

    var money = new Money(params);

    money.save(function (err, accountItem) {
        if (err) {
            callback({success: false, error:err});
        }else{
            callback({success: true, account: accountItem});
        }
    });

};
exports.list = function (callback) {
    find({}, callback);
};
function find(query, callback) {
    Money.find(query).exec(function (err, accounts) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true, accounts: accounts});
        }
    });
}
/*
exports.deleteById = function (id, callback) {
    Money.remove({foodname: id}, function (err) {   // FOODNAME
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true});
        }
    });
};
exports.findById = function (id, callback) {
    Money.findOne({foodname: id}, function (err, result) {  // FOODNAME
        if(err){
            callback({success:false, account:result})
        }else{
            callback({success:true, account:result});
        }
    });
};
*/





