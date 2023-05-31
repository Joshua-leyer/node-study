$(document).ready(function() {


    // delete 按钮
    $(".delete-box").on('click', function(e) {
        e.preventDefault;
        console.log('on click')
        let id = $(this).attr("data-id")
        $.ajax({
            type: "DELETE",
            url: "/admin/article/delete/" + id,
            error: function(request) {
                console.log('ajax delete error')
            },
            success: function(msg){
                alert( "Data Updated: " + msg );
                window.location.href="/admin/articles"
            }
        })
        // alert(`delete is ${id}`)
    })    
})


