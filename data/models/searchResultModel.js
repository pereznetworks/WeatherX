'use strict';

module.exports = (sequelize, DataTypes) => {
  const SearchResult = sequelize.define('SearchResult',
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

  SearchResult.associate = function(models) {
    // association defined in models/index.js, but not working ??? associated_table_id is always null ??
    // SearchResult.belongsTo(model.AppSession, {
    //       as:'app_session_id',
    //       foreignKey: 'id',
	  //       onDelete: 'CASCADE'
    //     })
  };

  return SearchResult;

};
