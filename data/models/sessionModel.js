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
   app_session_id: {
                             type: DataTypes.STRING,
                        allowNull: false,
                           unique: true
                   },


      },{
             timestamps: true,
            underscored: true
  });

  AppSession.associate = function(models) {
    // association defined in models/index.js
  };

  return AppSession;

};
