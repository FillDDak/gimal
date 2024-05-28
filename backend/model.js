function model(Sequelize, connection) {
    const User = connection.define("user", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: Sequelize.STRING,
            unique: true // 이 필드는 고유하지만 추가 인덱스를 생성하지 않음
        },
        password: {
            type: Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    connection.sync({
        alter: true
    });

    return User;
}

module.exports = model;
