
$(function(){
  var user_list = $('#user-search-result');

  function appendUserHTML(user){
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
      </div>`
      return html;
  };

  function crentUserHTML(id,name) {
    var html = 
        ` <div class="chat-group-user clearfix" id=chat-group-user-${id}>
            <input type="hidden" name="group[user_ids][]" value="${id}">
            <p class="chat-group-user__name">${name}</p>
            <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
         </div>`
        return html;
  }

  $("#user-search-field").on("keyup",function(e){
    var input = $.trim($(this).val());
    $.ajax({ 
      url: '/users', 
      type: 'GET', 
      data: {name: input} ,
      dataType: 'json' 
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (input.length && users.length ) {
        users.forEach(function(user){
          var html = appendUserHTML(user)
          user_list.append(html);
        });
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click','.user-search-add', function() {
    $('#user-search-field').val('');
    $("#user-search-result").empty();
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().remove();
    var html = crentUserHTML(id,name);
    $('#chat-group-users').append(html);
  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});
