const mongoose = require('mongoose')
const connectionDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.STRING)
        console.log('database connected on port :', connect.connection.host,connect.connection.name)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectionDB