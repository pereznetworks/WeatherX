'use strict';

module.exports = (sequelize, DataTypes) => {
  const Forecast = sequelize.define('Forecast',
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

  Forecast.associate = function(models) {
    // association defined in models/index.js, but not working ??? associated_table_id is always null ??
    // Forecast.hasOne(model.Locations, {
    //       as:'location_id',
    //       foreignKey: 'id',
	  //       onDelete: 'CASCADE'
    //     })
  };

  return Forecast;

};
