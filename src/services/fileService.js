const drive = require('../../config/googleapis')
const stream = require('stream')


const fileCheck = () => {
    let imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if (photoEncoded === null) return false
    const photo = JSON.parse(photoEncoded)
    if (imageMimeTypes.includes(photo.type)) {
        return false
    }
    return true
}

const uploadFile = async (photoEncoded) => {
    try {
        const photo = JSON.parse(photoEncoded)
        let pic = new Buffer.from(photo.data, 'base64')
        const bufferStream = new stream.PassThrough()
        bufferStream.end(pic)

        const response = await drive.files.create({
            requestBody: {
                name: photo.name,
                mimetype: 'application/json',
                parents: ['17VUIouYcYivUt1U_ufANRsPQPPWhFbdu']
            },
            media: {
                mimeType: photo.type,
                body: bufferStream
            }
        })
        return response
    } catch (err) {
        return err
    }
}

const deleteFile = async () => {
    try {
        const response = await drive.files.delete({
            fileId: 'this-is-the-id'
        })
        return response
    } catch (err) {
        return err
    }
}

const generatePublicUrl = async () => {
    try {
        await drive.permissions.create({
            fileId: 'this-is-the-id',
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: '',
            fields: 'webViewLink, webContentLink'
        })
        return result
    } catch (err) {
        return err
    }
}

module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl
}