'use strict';
const Op = Sequelize.Op

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        isUnique: (value, cb) => {
          Teacher.find({
            where: {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
          .then( (email) => {
            if (email !== null) {
              cb ('Email already used!');
            }
            cb(null);
          });
        }
      }
    },
  }, {});
  Teacher.associate = function(models) {
    
  };
  return Teacher;
};