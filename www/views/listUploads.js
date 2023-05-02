mispaf.addPageListener("enter:listUploads", (event) => {
    let tbody = document.querySelector('#listUploads tbody');
    tbody.innerHTML = '';
    mispaf.ajax({
        url: "/file/listUploads",
        type: 'POST',
        success(response) {
            let rows = [];
            for (let i = 0; i < response.files.length; i++) {
                rows.push(`
<tr>
    <td><a href="${mispaf.escape(response.root)}/${mispaf.escape(response.files[i])}" target="_blank">${mispaf.escape(response.files[i])}</a></td>
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