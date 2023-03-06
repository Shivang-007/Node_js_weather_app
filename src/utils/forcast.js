const request = require('postman-request')
const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=176cc8b26a7ba94b9e3051019cc35670&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if(error){
            callback( 'Unable to connect weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                CurrentTemperature: body.current.temperature
            })
        }
    })
}
module.exports=forcast