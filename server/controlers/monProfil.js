const path=require("path");

module.exports={
    listAbos({config, model, user}) {
        let myid = model.users.getByLogin(user.login).id;
        let myImages = model.latestImages.getOthersImages(myid);
        // Prepare the data to return
        let data = myImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                username: image.login,
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }
    },
    listCreations({config, model, user}) {
        let myid = model.users.getByLogin(user.login).id;
        let myImages = model.latestImages.getMyImages(myid);
        // Prepare the data to return
        let data = myImages.map(image => {
            return {
                path: image.path,
                title: image.title,
                description: image.description,
                id: image.id
            };
        });
        return {
            files: data,
            root: config.uploadPrefix
        }

    },

    delete({ model, params }) {
        return model.items.delete(params.id, 422);
    }, 

   /* modification({ model, params, HTTPError, monImage }) {
        const titre = document.getElementById('#titre');
        const input = monImage.createElement('input');
        input.type = 'text';
        input.value = texte.textContent;
        
        
        const validerBtn = monImage.createElement('button');
        validerBtn.textContent = 'Valider';    
        validerBtn.addEventListener('click', () => {
            if (input.value == "") {
                throw new HTTPError ("Vous n'avez pas inscrit de nouveau titre.",406)
            };
            model.items.updateTitle(params.id,input.value);
            titre.textContent = input.value;
            input.replaceWith(titre);
            validerBtn.parentNode.removeChild(validerBtn);
            annulerBtn.parentNode.removeChild(annulerBtn);
            });

        const annulerBtn = monImage.createElement('button');
        annulerBtn.textContent = 'Annuler';
        annulerBtn.addEventListener('click', () => {
            input.replaceWith(titre);
            validerBtn.parentNode.removeChild(validerBtn);
            annulerBtn.parentNode.removeChild(annulerBtn);
  });
        input.parentNode.insertBefore(validerBtn, input.nextSibling);
        validerBtn.parentNode.insertBefore(annulerBtn, validerBtn.nextSibling);
        titre.replaceWith(input);
    } */
} 