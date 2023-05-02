mispaf.addPageListener("enter:listUsers", (event) => {
    let tbody = document.querySelector('#listUsers tbody');
    tbody.innerHTML = '';
    mispaf.ajax({
        url: "/users/listUsers",
        type: 'POST',
        success(response) {
            let rows = [];
            for (let i = 0; i < response.length; i++) {
                rows.push(`
<tr>
    <td>${mispaf.escape(response[i].login)}</td>
    <td><button onclick="deleteUser(${response[i].id})">Effacer...</button></td>
</tr>
`);
            }
            tbody.innerHTML = rows.join('');
        },
        error(response) {
            alert(response);
        }
    });
});

function deleteUser(id) {
    mispaf.ajax({
        url:"/users/delete",
        type:'POST',
        data:{id:id},
        success() {
            mispaf.page(mispaf.page()); // refresh page
        },
        error(message) {
            alert(message);
        }
    })
}