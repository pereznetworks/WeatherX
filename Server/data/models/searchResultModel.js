
module.exports = (sequelize, DataTypes) => {
  const SearchResult = sequelize.define('SearchResult',
      {
                                   id: {
                                            allowNull: false,
                                        autoIncrement: true,
                                           primaryKey: true,
                                                 type: DataTypes.INTEGER
                                       },
                               app_id: {
                                                 type: DataTypes.STRING,
                                               unique: true,
                                            allowNull: false

                                       },
                                data: {
                                            type: DataTypes.JSON
                                       }

      },{
             timestamps: true,
            underscored: true
  });

  SearchResult.associate = function(models) {
    // association defined in models/index.js
  };

  return SearchResult;

};