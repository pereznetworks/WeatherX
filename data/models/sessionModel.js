'use strict';

module.exports = (sequelize, DataTypes) => {
  const AppSession = sequelize.define('AppSession',
      {
               id: {
                        allowNull: false,
                    autoIncrement: true,
                       primaryKey: true,
                             type: DataTypes.INTEGER
                   },
            req_id: {
                             type: DataTypes.STRING,
                        allowNull: false,
                           unique: true
                   },
          forecast: {
                             type: DataTypes.BOOLEAN,
                        allowNull: false,
                        defaultValue: false,
                             init: {
                                      function(){
                                         const db = require("./models/index.js");
                                         sequelizeDb.Locations.count()
                                          .then(count, err => {
                                            if (err){
                                              return next(err)
                                            }
                                            if (count > 0){
                                              return true;
                                            } else {
                                              return false;
                                            }
                                          })
                                       }
                                    }
                   },
    location_count: {
                             type: DataTypes.INTEGER,
                        allowNull: false,
                        defaultValue: 0,
                             init: {
                                       function(){
                                               const db = require("./models/index.js");
                                               sequelizeDb.Locations.count()
                                                .then(count, err => {
                                                  if (err){
                                                    return next(err)
                                                  } else {
                                                    return count;
                                                  }
                                                })
                                              }
                                   }
                     }

      },{
             timestamps: true,
            underscored: true
  });

  AppSession.associate = function(models) {
    // association defined in models/index.js
  };

  return AppSession;

};
