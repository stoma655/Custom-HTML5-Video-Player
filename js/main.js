var player = document.getElementById("player");

if (player) {
    var fadeTime;
var over = false;

var full = false;

var loadCheck;
if(player){
    $("#player").on("loadeddata", updateTime);
    
    loadCheck = setInterval(function(){
        if($("#player").get(0).duration > 0){
            $("#player, #controls").css("pointer-events", "auto");
            clearInterval(loadCheck);
        }
    }, 100);
    
    $("#player").click(toggleVideo);
    $("#playpause").click(toggleVideo);
    
    $("#playercontainer").mousemove(function() {
        $("#controls").show();
        $("#player").css("cursor", "pointer");
        clearTimeout(fadeTime);
        if(!player.paused) {
            fadeTime = setTimeout(function() {
                $("#controls").fadeOut("medium");
                $("#player").css("cursor", "none");
            }, 3000);
        }
    });
    
    var closeVideo = document.querySelector('.big_wrap_video .fa-times');
    $('.video_wrap_st').mouseover(function() {
        closeVideo.style.opacity = "0.7";
    });
    
    $('.video_wrap_st').mouseout(function() {
        closeVideo.style.opacity = "0.2";
    });
    
    // $('.big_wrap_video').click(function() {
    //  history.go(-1);
    // });
    
    $('.big_wrap_video .fa-times').click(function() {
        history.go(-1);
    });
    
    $("#progressholder").hover(function(e) { over = true; }, function() { over = false; });
    
    
    // $("#progressholder_two").click(function(e) {
    //   var boxVideoWidth = document.querySelector('.video_wrap_st').offsetWidth;
    //   var pos = e.pageX - 20;
    //   var prop = (pos + 1) / $("#progressholder").width();
    //   var prog = prop * player.duration;
    //   player.currentTime = prog;
    //   updateProgress();
    // });
    
    
    $("#progressholder").click(function(e) {
      var boxVideoWidth = document.querySelector('.video_wrap_st').offsetLeft;
    
      var containerwtf = document.querySelector('.video_wrap_st');
      if (!containerwtf.classList.contains('perdole')) {
        var pos = e.clientX - boxVideoWidth / 2;
      } else {
        var pos = e.clientX;
      }
    
      var prop = (pos + 1) / $("#progressholder").width();
      var prog = prop * player.duration;
      player.currentTime = prog;
      updateProgress();
    });
    
    document.addEventListener('keyup', function() {
        if (event.keyCode === 27) {
            if (full) {
                exitFullscreen(document.getElementById("playercontainer"));
            }
        }
    });
    
    $("#fullscreen").click(function() {
        if(!full) launchIntoFullscreen(document.getElementById("playercontainer"));
        else exitFullscreen(document.getElementById("playercontainer"));
        full = !full;
    });
    
    function launchIntoFullscreen(element) {
        element.style.width = "100%";
        element.style.height = "100%";
        element.classList.add('perdole');
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    
    function exitFullscreen(element) {
        element.style.width = "auto";
        element.style.height = "auto";
        element.classList.remove('perdole');
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    
    $("#progressholder").mousemove(function(e) { updateOrb(e); });
    
    function toggleVideo() {
        //We're playing
        if(!player.paused) {
            $("#controls").show();
            $("#player").css("cursor", "pointer");
            $("#playpause").attr("class", "fa fa-play");
            player.pause();
        } else {
            $("#controls").fadeOut("medium");
            $("#player").css("cursor", "none");
            $("#playpause").attr("class", "fa fa-pause");
            player.play();
        }
    }
    
    function updateProgress() {
        var bp = player.buffered.end(player.buffered.length-1) / player.duration;
        var bw = bp * 100;
        $("#buffered").css("width", bw + "%");
        
        var p = player.currentTime / player.duration;
        var w = p * 100;
        $("#progress").css("width", w + "%");
        
        updateTime();
        
        if(player.ended) {
            $("#playpause").attr("class", "fa fa-play");
            $("#controls").show();
            $("#player").css("cursor", "pointer");
            clearTimeout(fadeTime);
        }
    }
    
    function updateOrb(e) {
        var pos = e.pageX - 25;
        var prop = pos / $("#progressholder").width();
        var prog = prop * player.duration;
        $("#progressorb").css("margin-left", pos + "px");
    }
    
    function updateTime() {
        $("#progresstime").text(player.currentTime.toString().toHHMMSS() + " / " + player.duration.toString().toHHMMSS());
    }
    
    setInterval(updateProgress, 100);
    
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10);
        var minutes = Math.floor(sec_num / 60);
        var seconds = sec_num - (minutes * 60);
        
        if (seconds < 10) {seconds = "0"+seconds;}
        var time = minutes + ':' + seconds;
        return time;
    };
    
    // VOLUME BAR
        volumeBar    = document.getElementById('volume-bar');
        volumeBar.addEventListener("change", function(evt) {
            player.volume = evt.target.value;
        });
}
};


