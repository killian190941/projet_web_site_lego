const path = require("path");

module.exports={
    requireAuth: false,
    otherUserProfile({model, config, params, user}) {
        let otherUsername = params.username; // Get the username from the AJAX request
        let otherUserImages = model.otherUser.otherUserImages(otherUsername);
        
        // Prepare the data to return
        let data = otherUserImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    }
}
