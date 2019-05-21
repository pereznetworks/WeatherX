'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location',
      {
               id: {
                        allowNull: false,
                    autoIncrement: true,
                       primaryKey: true,
                             type: DataTypes.INTEGER
                   },
             data: {
                            type: DataTypes.JSON
                   }

      },{
             timestamps: true,
            underscored: true
  });

  Location.associate = function(models) {
    // association defined in models/index.js, but not working ??? associated_table_id is always null ??
    // Location.hasOne(model.AppSession, {
    //       as:'app_session_id',
    //       foreignKey: 'id',
	  //       onDelete: 'CASCADE'
    //     })
  };

  return Location;

};
