'use strict';

module.exports = (sequelize, DataTypes) => {
  const AppSession = sequelize.define('AppSession',
      {
               id: {
                             type: DataTypes.INTEGER,
                        allowNull: false,
                    autoIncrement: true,
                       primaryKey: true
                   },
            app_id: {
                             type: DataTypes.STRING,
                        allowNull: false,
                           unique: true
                   },
    locationCount: {
                            type: DataTypes.INTEGER,
                       allowNull: false,
                    defaultValue: 0
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
