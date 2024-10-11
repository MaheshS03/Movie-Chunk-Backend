
const uploadVideo  = async(req, res) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: 'File not uploaded' });
        }

        const fileMetadata = await gfs.files.findOne({ filename: file.filename });

        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: fileMetadata
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getVideo = async(req, res) => {
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id); 
        gfs.files.findOne({ _id: fileId }, (err, file) => {
            if (err || !file) {
                return res.status(404).json({ err: 'File not found' });
            }

            // Check if it's a video file
            if (file.contentType === 'video/mp4' || file.contentType === 'video/mkv') {
                const range = req.headers.range;
                if (!range) {
                    return res.status(400).send('Range header required');
                }

                const fileSize = file.length;
                const CHUNK_SIZE = 1 * 1024 * 1024; 
                const start = Number(range.replace(/\D/g, ''));
                const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

                const contentLength = end - start + 1;
                const headers = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': contentLength,
                    'Content-Type': file.contentType
                };

                res.writeHead(206, headers);

                const downloadStream = gridfsBucket.openDownloadStream(fileId, {
                    start: Math.floor(start / CHUNK_SIZE),
                    end: Math.floor(end / CHUNK_SIZE)
                });

                downloadStream.pipe(res);
            } else {
                res.status(400).json({ err: 'Not a video file' });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {uploadVideo, getVideo}