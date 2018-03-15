// main model for the ad

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdSchema = new Schema({
  title: String,
  description: String,
  jobType: String,
  apply: String,
  location: String,
  expires: Date,
  user_id: String
})

AdSchema.virtual('date').get(() => {
  return this._id.getTimestamp()
})
//TODO associations
// TODO created/updated at

mongoose.model('Ad', AdSchema)

module.exports = function (sequelize, DataTypes) {
  var Ad = sequelize.define('Ad', {
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    jobType: {type: DataTypes.ENUM('Freelance', 'Full Time', 'Part Time', 'Internship')},
    apply: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    expires: {type: DataTypes.DATE},
    // createdAt/updatedAt added automatically
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
        Ad.belongsTo(models.User)
      }
    }
  })

  return Ad
}
