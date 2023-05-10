mispaf.addPageListener("enter:home", (event) => {
    let container = document.querySelector('#home .image-container');
    container.innerHTML = '';
    mispaf.ajax({
        url: "/file/latestImages",
        type: 'POST',
        success(response) {
            let images = [];
            for (let i = 0; i < response.files.length; i++) {
                images.push(`
<div class="image">
    <img src="${mispaf.escape(response.files[i].path)}" alt="${mispaf.escape(response.files[i].title)}">
    <h3>${mispaf.escape(response.files[i].title)}</h3>
    <span>${mispaf.escape(response.files[i].username)}</span>
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
