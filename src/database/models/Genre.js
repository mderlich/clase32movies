module.exports = (sequelize, dataTypes) => {

    let alias = 'Genre';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'genres',
        timestamps: false
    };

    const Genre = sequelize.define(alias, cols, config)

    // ************* RELACIONES *************
    // ● Un género tiene muchas películas
    // 1:M / One to many / hasMany
    // Un genero 'has many' puede vincularse a muchas peliculas.
    Genre.associate = function (modelos){
        Genre.hasMany(modelos.Movie, {
            as: "peliculas",
            foreignKey: "genre_id"
        });
    }
    // **************************************
   
    return Genre
}