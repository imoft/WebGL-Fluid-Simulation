<script src='https://cdn.jsdelivr.net/vue/2.0.5/vue.min.js'></script>
<script src='https://unpkg.com/botui/build/botui.min.js'></script>

<script>
  $(function () {

    var botui = new BotUI("my-botui-app");
    var hasScrolled = false;
    // Start Bot
    // First Messages
    console.log("ASDF", $(window))


    $(".wrapper").scroll(function () {
      console.log("ASdf")
      // This is then function used to detect if the element is scrolled into view
      function elementScrolled(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top + $(window).height()*0.1;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
      }

      // This is where we use the function to detect if ".box2" is scrolled into view, and when it is add the class ".animated" to the <p> child element
      if (elementScrolled('#interactive-tag')) {
        if (!hasScrolled) {

          setTimeout(()=>{init(true)}, 1000)

          hasScrolled = true;
        }
      }
    });

    function init(initDelay) {
      botui.message.removeAll();
      botui.message.bot({
        content: "Hey there!",
         loading: initDelay,
         delay: initDelay?3000:0
      }).then(function () {
        return botui.message.bot({
        
          type: "html",
          content: "Your neighbours are doing a red load."
        });
      }).then(function () {
        return botui.message.bot({
         
          type: "html",
          content: "Wanna add something?"
        });
      }).then(function () {
        return botui.action.button({
         
          addMessage: true,
          action: [{
            text: "Yes!",
            value: "yes"
          }, {
            text: "No thanks!",
            value: "no"
          }]
        });
      }).then(function (res) {
        //   YES 1----------
        if (res.value == "yes") {
          return botui.message.bot({
            loading: true,
            delay: 1500,
            content: 'That’s great. I’m combining everyone from the top floor. I’m calling "Top Xmas Load", just bring it tomorrow anytime. Do you want me also to check if you are all set for xmas red socks for the entire family?'
          }).then(function () {
            return botui.action.button({
              delay: 1500,
              loading: true,
              addMessage: true,
              action: [{
                text: "Yes!",
                value: "yes"
              }, {
                text: "No!",
                value: "no"
              }]
            });
          }).then(xmasLoad);
        } else {
          //   NO 1----------
          return botui.message.bot({
            loading: true,
            delay: 1500,
            content: 'Alright! Meanwhile, your white load "2022" is ready whenever you want to pick up. Should I tell you when I do the next red load?'
          }).then(function () {
            return botui.action.button({
              delay: 1500,
              loading: true,
              addMessage: true,
              action: [{
                text: "Yes!",
                value: "yes"
              }, {
                text: "No!",
                value: "no"
              }]
            });
          }).then(negativeResponse);
        }
      });
    }

    function xmasLoad(res) {
      if (res.value == "yes") {
        botui.message.bot({
          content: "Nice! Red socks is all we want for Christmas! ",
          loading: true,
          delay: 1000
        }).then(function () {
          return botui.message.bot({
            loading: true,
            delay: 1500,
            type: "html",
            content: '<img style="max-height: 200px" src="https://media.giphy.com/media/eGyRea5iiqfFp0dLwq/giphy.gif"/>'
          });
        }).then(() => {
          setTimeout(init, 10000);
        });
      } else {
        botui.message.bot({
          content: "No problem! I will be waiting for your load, if you need any help, I’m always here!",
          loading: true,
          delay: 1000
        }).then(() => {
          setTimeout(()=>{init(false)}, 10000);
        });
      }
    }

    function negativeResponse(res) {
      if (res.value == "yes") {
        botui.message.bot({
          content: "Will do. Talk to you soon. #holidayplans ",
          loading: true,
          delay: 1000
        }).then(function () {
          return botui.message.bot({
            loading: true,
            delay: 1500,
            type: "html",
            content: '<img style="max-height: 200px" src="https://media.giphy.com/media/11BEQyXROgnLTG/giphy.gif"/>'
          });
        }).then(() => {
          setTimeout(()=>{init(false)}, 10000);
        });
      } else {
        botui.message.bot({
          content: "No worries! No red Christmas this year then! But I see something bright white and fun coming. Just a reminder that I already got tickets for that lovely NYE party.",
          loading: true,
          delay: 1000
        }).then(function () {
          return botui.message.bot({
            loading: true,
            delay: 1500,
            type: "html",
            content: '<img style="max-height: 200px" src="https://media.giphy.com/media/8It0HNrGjcTT2/giphy.gif"/>'
          });
        }).then(() => {
          setTimeout(()=>{init(false}, 10000);
        });
      }
    }




  })
</script>