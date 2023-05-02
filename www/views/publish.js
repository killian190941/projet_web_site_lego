(()=>{

    let form=document.querySelector("#publish form");

    mispaf.addPageListener("enter:publish",(event)=>{
        mispaf.reset(form);
    });

    form.querySelector('input[type=submit]').addEventListener('click',(event)=>{
        event.preventDefault();
        mispaf.ajax({
            url:"/items/publish",
            type:'POST',
            data:form,
            success() {
                alert("publié");
                mispaf.page(mispaf.page()); // refresh
            },
            error(message) {
                alert(message);
            }
        })
    });

})();

