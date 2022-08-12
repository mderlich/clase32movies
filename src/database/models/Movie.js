module.exports = (sequelize, dataTypes) => {

    let alias = 'Movie';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        }


    };

    let config = {
        tableName: 'movies',
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config)


    // ************* RELACIONES *************
    // ● Una película tiene un género 
    // 1:1 / One to one / belongsTo 
    // Una pelicula se vincula a un genero
    Movie.associate = function(modelos){
        Movie.belongsTo(modelos.Genre, {
          foreignKey: "genre_id",
          as: "genre"
        });
    }

    // ● Una película tiene muchos actores
    // M:M / Muchos a Muchos / belongsToMany 
    // Una pelicula se vincula a muchos actores
    Movie.associate = function(modelos){
        Movie.belongsToMany(modelos.Actor, {
            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        });
    }
    // **************************************
    
    
    return Movie
}