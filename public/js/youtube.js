$(document).ready(function () {
    $(".your-class").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
    });
});

$(document).ready(function () {
    /* Toggle Video Modal
  -----------------------------------------*/
    function toggle_video_modal() {
        // Click on video thumbnail or link
        $(".js-trigger-video-modal").on("click", function (e) {
            // prevent default behavior for a-tags, button tags, etc.
            e.preventDefault();

            // Grab the video ID from the element clicked
            var id = $(this).attr("data-youtube-id");

            // Autoplay when the modal appears
            // Note: this is intetnionally disabled on most mobile devices
            // If critical on mobile, then some alternate method is needed
            var autoplay = "?autoplay=1";

            // Don't show the 'Related Videos' view when the video ends
            var related_no = "&rel=0";

            // String the ID and param variables together
            var src = "//www.youtube.com/embed/" + id + autoplay + related_no;

            // Pass the YouTube video ID into the iframe template...
            // Set the source on the iframe to match the video ID
            $("#youtube").attr("src", src);

            // Add class to the body to visually reveal the modal
            $("body").addClass("show-video-modal noscroll");
        });

        // Close and Reset the Video Modal
        function close_video_modal() {
            event.preventDefault();

            // re-hide the video modal
            $("body").removeClass("show-video-modal noscroll");

            // reset the source attribute for the iframe template, kills the video
            $("#youtube").attr("src", "");
        }
        // if the 'close' button/element, or the overlay are clicked
        $("body").on(
            "click",
            ".close-video-modal, .video-modal .overlay",
            function (event) {
                // call the close and reset function
                close_video_modal();
            }
        );
        // if the ESC key is tapped
        $("body").keyup(function (e) {
            // ESC key maps to keycode `27`
            if (e.keyCode == 27) {
                // call the close and reset function
                close_video_modal();
            }
        });
    }
    toggle_video_modal();
});

// ANIMATED NUMBER

var speed = 1;

/* Call this function with a string containing the ID name to
 * the element containing the number you want to do a count animation on.*/
function incEltNbr(id) {
    elt = document.getElementById(id);
    endNbr = Number(document.getElementById(id).innerHTML);
    incNbrRec(0, endNbr, elt);
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
    if (i <= endNbr) {
        elt.innerHTML = i;
        setTimeout(function () {
            //Delay a bit before calling the function again.
            incNbrRec(i + 5, endNbr, elt);
        }, speed);
    }
}

/*Function called on button click*/
function incNbr() {
    incEltNbr("nbr");
}

incEltNbr("nbr");
/*Call this funtion with the ID-name for that element to increase the number within*/
