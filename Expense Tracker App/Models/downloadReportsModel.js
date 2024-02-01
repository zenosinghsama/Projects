const mongoose = require('mongoose');

const downloadedReportsSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
});

const DownloadedReports = mongoose.model('DownloadedReports', downloadedReportsSchema);

module.exports = DownloadedReports;



// const Sequelize = require('sequelize');
// const sequelize = require('../Util/database');

// const DownloadedReports = sequelize.define('downloadedReports', {
//     fileUrl: {
//         type: Sequelize.STRING,
//         primaryKey: false,
//         allowNull: false
//     }
// });

// module.exports = DownloadedReports;