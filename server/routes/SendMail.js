const express = require('express');
const router = express.Router();
const { Users, Device } = require('../models');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const { Op } = require("sequelize");

const mail = "netleclub1@gmail.com";
const pass = "wiesttkduequzyqk";

async function sendEmail(toEmail, htmlTable) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mail,
                pass: pass,
            },
        });

        const mailOptions = {
            from: mail,
            to: toEmail,
            subject: 'Device return today',
            html: htmlTable,
        };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

schedule.scheduleJob('0 0 0 * * *', () => {
    // getDeviceReturnToday();
});

const getDeviceReturnToday = (req, res) => {
    Device.findAll({
        where: {
            returnDate: {
                [Op.between]: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
            },
        },
    }).then((devices) => {
        const groupedDevices = devices.reduce((acc, device) => {
            const userId = device.userId;
            const deviceName = device.name;

            // Create an object for the userId if it doesn't exist
            if (!acc[userId]) {
                acc[userId] = {};
            }

            // Create an entry for the device name or increment the count
            acc[userId][deviceName] = (acc[userId][deviceName] || 0) + 1;

            return acc;
        }, {});

        const result = Object.keys(groupedDevices).map((userId) => {
            return {
                userId,
                devices: groupedDevices[userId],
            };
        });

        //loop for send email
        result.forEach((data) => {
            if (data.devices) {
                const userId = data.userId;

                // Build HTML table for the current userId
                const htmlTable = `
                  <table border="1">
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                    ${Object.entries(data.devices).map(([deviceName, quantity]) => `<tr><td>${deviceName}</td><td>${quantity}</td></tr>`).join('')}
                  </table>
                `;

                Users.findOne({
                    where: {
                        id: userId,
                    },
                }).then((user) => {
                    if (user) {
                        // Send email for the current userId
                        sendEmail('boonyathorn.j@ku.th', htmlTable); //user.email
                    }
                });
            }
        });

        //res.json(result);
    });
}

router.get('/', getDeviceReturnToday);

module.exports = router;