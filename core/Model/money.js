/*jshint esversion: 6 */
"use strict";

const schemaName = 'money';

module.exports = function (mongoose) {
    var schema = mongoose.Schema(
        {
            user: {type: String},
            type: {type: String},
            image: {type: String}
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
