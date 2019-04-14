$(function(){
  function messageHTML(message){
    var Image = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="message" data-message-id="${message.id}">
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

    .done(function(messages){
      var html = messageHTML(messages);
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
});