const drive = require('../../config/googleapis')
const stream = require('stream')


const fileCheck = (encodedFile) => {
    if (encodedFile === null) return false
    
    let imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
    let file = JSON.parse(encodedFile)
    if (!imageMimeTypes.includes(file.type)) return false
    
    return true
}

const uploadFile = async (encodedFile) => {
    try {
        if (!fileCheck(encodedFile)) return
        
        const file = JSON.parse(encodedFile)
        let bufferFile = new Buffer.from(file.data, 'base64')
        const bufferStream = new stream.PassThrough()
        bufferStream.end(bufferFile)

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimetype: 'application/json',
                parents: [process.env.GOGGLE_DRIVE_FOLDER_ID]
            },
            media: {
                mimeType: file.type,
                body: bufferStream
            }
        })
        return response.data
    } catch (err) {
        return err
    }
}

const generatePublicUrl = async (fileId) => {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const response = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
        return response.data
    } catch (err) {
        return err
    }
}

const deleteFile = async (fileId) => {
    try {
        const response = await drive.files.delete({ fileId })
        
        return response
    } catch (err) {
        return err
    }
}


module.exports = {
    uploadFile,
    generatePublicUrl,
    deleteFile
}


// document.fileLinks = []
// for (i = 0; i < document.fileId.length; i++) {
//     const response = await fileService.generatePublicUrl(document.fileId[i])
//     document.fileLinks.push(await response.webViewLink)
// }