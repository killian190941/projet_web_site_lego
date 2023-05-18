mispaf.addPageListener("enter:highScore", (event) => {
    let container = document.querySelector('#highScore .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/vote/topTenImages",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <a href="#" onclick="rateImage(${response.files[i].id},'${mispaf.escape(response.files[i].title)}','${mispaf.escape(response.files[i].description)}','${mispaf.escape(response.files[i].path)}',${mispaf.escape(response.files[i].owner_id)},${mispaf.escape(response.files[i].myid)})"> 
    <img src="${mispaf.escape(response.files[i].path)}" 
    alt="${mispaf.escape(response.files[i].title)})"></a> 
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <span id="description">${mispaf.escape(response.files[i].description)}</span>
    <h4>Score de ${mispaf.escape(response.files[i].score)}/5</h4>
    </div>
`);
            }
            container.innerHTML = images.join('');
        },
        error(response) {
            alert(response);
        }
    });
})