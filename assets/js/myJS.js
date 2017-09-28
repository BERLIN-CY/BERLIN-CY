$(document).ready(function () {

    //dynamic sticky funciton
    var aR = $('#aboutR'),
        wR = $('#workR'),
        cR = $('#contactR'),
        aL = $('#aboutL'),
        wL = $('#workL'),
        cL = $('#contactL');

    var aOffset = aR.offset().top,
        wOffset = wR.offset().top,
        cOffset = cR.offset().top;

    var winHeight = $(window).height();

    var aContentHeight = aR.height(),
        wContentHeight = wR.height(),
        cContentHeight = cR.height();

    // aL.css({"height":aContentHeight});
    // wL.css({"height":wContentHeight});
    // cL.css({"height":cContentHeight});
    //
    $('.chapterTitle').css({"padding-top":winHeight*(1-0.618)});

    /* go to top after refresh */
    $(window).scrollTop(0);
    $(window).resize(function () {
        basicCalculationUpdate();
    });

    $("#expand-close").on("click", function () {
        //add animation
        // $("#work").find(".leftSide").addClass("transitionEffect");

        //disappear the cancel expand button
        $("#expand-close").css({"display":"none"});

        //expand width 75% 25%
        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");

        //display recover
        var project_list = [];
        project_list = $(".project");
        $(".project").find(".project__content").css({"display":"none"});
        $(".project").removeClass("disappear")
        $(".project").find(".project__header").css({"height":"100vh"})

        //recalculate
        basicCalculationUpdate()

        //view focus to top project
        scrollToHash("#"+openProjectID);

        //remove transition for left Side
        // $("#work").find(".leftSide").removeClass("transitionEffect");


    });
    var openProjectID = "";

    // $(".chapterTitle").
    $("div[id^='project-']").on("click", function () {
        // event.preventDefault();

        //assign openProjectID
        openProjectID = this.id;
        // console.log(openProjectID);

        //add transition Effect fo left side
        $("#work").find(".leftSide").addClass("transitionEffect");

        //show the cancel expand button
        $("#expand-close").css({"display":"inline"});

        var project_id = this.id.substring(8, this.id.length);
        var currentProject = $("#project-"+project_id);
        //disappear other projects
        projectDisapper(project_id);

        //expand width 75% 25%
        $("#workL").addClass("compress");
        $("#workR").addClass("expand");

        // scrollToHash("#work");
        //recalculate height
        // basicCalculationUpdate();

        //image container cut to 50% height
        currentProject.find(".project__header").css({"height":"70vh"})

        currentProject.find(".project__content").css({"display":"inline"});

        basicCalculationUpdate();
        //container height to 100%
        // $(".project .project__header").css({"height":"100vh"})
        //fix left side
        startFix("#workL");

        // $(".ancestors").find("span").css({"color": "red", "border": "2px solid red"});

        //add content to this projects

        //remove transition for left Side
        $("#work").find(".leftSide").removeClass("transitionEffect");

    });

    function projectDisapper(project_id) {
        // console.log("project disappear")
        var project_list = [];
        project_list = $(".project");
        // console.log(object.id);
        // var project_id = object.id.substring(10, object.id.length);
        // console.log(project_id);
        for (i = 1; i <= project_list.length; i++) {
            if (i != project_id) {
                var project_id_disappear = "#project-" + i;
                // console.log(project_id_disappear);
                $(project_id_disappear).addClass("disappear");
            }
        }

        //scroll to div top
        // var currentProject = $("#project-"+project_id);
        // var dest=0;
        // var projectOffset = currentProject.offset.top();
        // dest = wOffset + winHeight-(projectOffset - wOffset - (project_id-1)*winHeight);
        // currentProject.animate({scrollTop: dest}, 500, 'swing');
    }

    function scrollToHash(hashName) {
        // window.location = location.hash;
        console.log(hashName)
        var dest = 0;
        if ($(hashName).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(hashName).offset().top;
        }
        // dest += $(hashName)
        //go to destination
        $('html,body').animate({scrollTop: dest}, 1000, 'swing');
    }




    // basicCalculationUpdate().init();
    function basicCalculationUpdate() {
        // console.log("updating")

        aR = $('#aboutR');
        wR = $('#workR');
        cR = $('#contactR');

        aOffset = aR.offset().top;
        wOffset = wR.offset().top;
        cOffset = cR.offset().top;

        winHeight = $(window).height();
        // console.log(winHeight);

        aContentHeight = aR.height();
        wContentHeight = wR.height();
        cContentHeight = cR.height();
    }


    $(window).scroll(function () {
        //bug cannot detect scroll pos
        // var scrollTop = $('body').scrollTop; 
        var scrollTop = $("html, body").scrollTop();

        var aboutL = "#aboutL"
        if (scrollTop - aOffset > 0) {
            startFix(aboutL);
            if ((scrollTop - aOffset) > (aContentHeight - winHeight)) {
                endFix(aboutL);
                //if content height < winHeight
                if(aContentHeight > winHeight){
                    adjustTop((aboutL))
                }
            }
        } else {
            endFix(aboutL)
        }

        var workL = "#workL";
        if (scrollTop - wOffset > 0) {
            startFix(workL);
            if ((scrollTop - wOffset) > (wContentHeight - winHeight)) {
                endFix(workL);
                adjustTop(workL);
                basicCalculationUpdate();

            }
        } else {
            endFix(workL)
        }


        var contactL = "#contactL";
        if (scrollTop - cOffset > 0) {
            startFix(contactL);
            if ((scrollTop - cOffset) > (cContentHeight - winHeight)) {
                endFix(contactL);

                if(cContentHeight > winHeight){
                    adjustTop((contactL))
                }
            }
        } else {
            endFix(contactL)
        }

    });

    function startFix(name) {
        $(name).addClass("fixed");
        $(name).css({"top":0});

        // $('.chapterTitle').css({"padding-top":"50%"});
    }

    function endFix(name) {
        $(name).removeClass("fixed");
        // $('.chapterTitle').css({"padding-top":"50%","padding-bottom":winHeight/2});
    }

    function adjustTop(name) {
        var topHeight=0;
        switch (name) {
            case "#aboutL": topHeight = aContentHeight-winHeight; break;
            case "#workL": topHeight = wContentHeight-winHeight; break;
            case "#contactL": topHeight = cContentHeight-winHeight; break;
        }
        $(name).css({"top":topHeight});
    }

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });


//    var winScrollTo;
//    var windowHeight = $(window).height();
//
//    $(window).scroll(function () {
//        winScrollTo = $(window).scrollTop();
//        console.log(winScrollTo);
//
//        $("#about").
//    });

//    $(".sticker1").sticky({ topSpacing: 0});
//    $(".sticker2").sticky({ topSpacing: 0});
//    $(".sticker3").sticky({ topSpacing: 0});
//
//    $('.sticker').on('sticky-start', function() {
//        console.log("Sticky Started");
//
//        var aContentHeight = $(".aboutContent").outerHeight();
//        console.log(aContentHeight);
//        var contentScrollPos = $(".aboutContent").offset().top;
//        console.log(contentScrollPos);
//
//        if((winScrollTo) > (aContentHeight)){
//            $(".sticker").unstick();
//        }
//
//
//    });
//    $('.sticker').on('sticky-end', function() { console.log("Ended"); });
//    $('.sticker').on('sticky-update', function() { console.log("Update"); });
//    $('.sticker').on('sticky-bottom-reached', function() { console.log("Bottom reached"); });
//    $('.sticker').on('sticky-bottom-unreached', function() { console.log("Bottom unreached"); });

//    $(window).scroll(function () {
//        var scrollTo = $(window).scrollTop();
//        var docHeight = $(document).height();
//        var windowHeight = $(window).height();
//
//
//        if (scrollTo <= windowHeight){
//            $(".rightSide").scroll(function(event){
//                console.log(scrollTo + " " + windowHeight);
//
//                event.preventDefault();
//            });
//        }
////        $(".rightSide").scrollTop($(".leftSide").scrollTop());
//    });
});