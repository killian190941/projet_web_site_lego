mispaf.addPageListener("enter:lastImages", (event) => {   
    let container = document.querySelector('#lastImages .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/latestImages/latestImages",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <a href="#" onclick="showOtherUser('${mispaf.escape(response.files[i].username)}')"> 
    ${mispaf.escape(response.files[i].username)}</a>
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


