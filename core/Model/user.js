/*jshint esversion: 6 */
"use strict";

const schemaName = 'user';

module.exports = function (mongoose) {
    var schema = mongoose.Schema(
        {
            username: {type: String},
            password: {type: String},
            parentUser: {type: Boolean}
        },
        {
            toObject: {virtuals: true},
            toJSON: {virtuals: true},
            versionKey: false,
            timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
        }
    );

    return mongoose.model(schemaName, schema);
};
