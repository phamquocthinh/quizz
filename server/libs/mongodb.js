const mongoose = require('mongoose')

module.exports = {
    connect: async () => {
        const mongoUrl =  `mongodb://localhost:27017/quizz`
        console.log(`Starting mongoose at ${mongoUrl}`)

        try {
            const conn = await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    
            console.log(`Mongoose connected...`)
        
            process.on('SIGINT', () => {
                conn.connection.close(() => {
                    console.log('Mongoose default connection is disconnected due to application termination')
                    process.exit(0)
                })
            })
        
            return conn
        } catch(e) {
            console.log(e)
            process.exit(1)
        }
    }
}