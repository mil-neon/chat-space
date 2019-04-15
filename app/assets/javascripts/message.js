$(function(){
  function buildMessageHTML(message){
    var Image = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="message" data-message-id= ${message.id} >
                    <div class="message__info">
                      <div class="message__info__talker">
                        ${ message.user_name }
                      </div>
                      <div class="message__info__date">
                        ${ message.date }
                      </div>
                    </div>
                    <div class="message__text">
                      ${ message.content }<br/><br/>
                      ${ Image }
                    </div>
                  </div>`;
    return html;
  }

  $('.message__box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessageHTML(message);
      $('.messages__contents').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
    })

    .fail(function(){
      alert('error');
    });
  });

  function reloadMessages() {
    if($('.messages')[0]){
      var last_message_id = $('.message:last').data('message-id'); 
    }else{
      var message_id = 0 
    }
    $.ajax({
      url: "./api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length){
        $.each(messages, function(i, message){
          var newhtml = buildMessageHTML(message);
          $('.messages__contents').append(newhtml)
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},500);
      }
    })
  };
  setInterval(reloadMessages, 5000);
});