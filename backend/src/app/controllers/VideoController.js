var ffmpeg = require('fluent-ffmpeg');

class VideoController {

    async edit(req, res) {
        var startTime = req.query.start;
        var durationTime = req.query.duration;

        ffmpeg('./src/app/controllers/videos/input/videoplayback.mp4')
            .setStartTime(startTime)
            .setDuration(durationTime)
            .output('./src/app/controllers/videos/output/test.mp4')

            .on('end', function (err) {
                if (!err) {
                    console.log('conversion Done');
                    res.send("'conversion Done'")
                }
            })
            .on('error', function (err) {
                res.send("error"+err)
                console.log('error: ', +err);
            }).run();
    }
}

module.exports = new VideoController();