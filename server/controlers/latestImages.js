const path=require("path");

module.exports={
    requireAuth: false,
    latestImages({config, model}) {
        // Query the database to get latest images and user information
        let latestImages = model.latestImages.getLatestImages();
        
        // Prepare the data to return
        let data = latestImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                username: image.login
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}
