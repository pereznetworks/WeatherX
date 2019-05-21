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
                   }
      },{
             timestamps: true,
            underscored: true
  });

  AppSession.associate = function(models) {
    // association defined in models/index.js, but not working ??? associated_table_id is always null ??
    // AppSession.hasMany(model.SearchResults, {
    //       as:'search_results_id',
    //       foreignKey: 'id',
	  //       onDelete: 'CASCADE'
    //     });
  };

  return AppSession;

};
