var User = require('../database.js').User;

exports.create = function (params, callback) {

    var user = new User(params);

    user.save(function (err, accountItem) {
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
    User.find(query).exec(function (err, accounts) {
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
};*/
exports.findById = function (id, callback) {
    User.findOne({username: id}, function (err, result) {
        if(err){
            callback({success:false, account:result})
        }else{
            callback({success:true, account:result});
        }
    });
};






