module.exports = (sequelize, dataTypes) => {

    let alias = 'Actor';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DECIMAL
        }
    };

    let config = {
        tableName: 'actors',
        timestamps: false
    };

    const Actor = sequelize.define(alias, cols, config)

    // ************* RELACIONES *************
    // ● Un actor tiene muchas películas
    // M:M / Muchos a Muchos / belongsToMany 
    // Un actor se vincula a muchas peliculas
    Actor.associate = function (modelos){
        Actor.belongsToMany(modelos.Movie, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
    }
    // **************************************
   
    return Actor
}