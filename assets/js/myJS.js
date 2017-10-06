$(document).ready(function () {
    var winWidth = 0;
    var aR,wR,cR,aOffset,
        wOffset,cOffset,winHeight,
        aContentHeight,wContentHeight,cContentHeight;

    var openProjectID = "";

    var projectFire = false;

    // if(winWidth<1200){
    //     $("#footer-desktop").css({"display":"none"});
    // }

    basicCalculationUpdate();
    function basicCalculationUpdate() {
        winWidth = $(window).width();
        console.log("window width"+winWidth);

        if(checkPortrait()=="small"){
            console.log("is small screen");
        }

        aR = $('#aboutR');
        wR = $('#workR');
        cR = $('#contactR');

        aOffset = aR.offset().top;
        wOffset = wR.offset().top;
        cOffset = cR.offset().top;

        winHeight = $(window).height();

        aContentHeight = aR.height();
        wContentHeight = wR.height();
        cContentHeight = cR.height();

        $('.chapterTitle').css({"padding-top":winHeight*(1-0.618)});

        console.log("aOffset:" + aOffset);
        console.log("aContentHeight:" + aContentHeight);
    }

    $(window).scroll(function () {
        // var scrollTop = $('body').scrollTop; //bug cannot detect scroll pos
        // var scrollTop = $("html, body").scrollTop();
        var scrollTop;
        scrollTop = $(document).scrollTop();
        console.log(scrollTop);
        // console.log(scrollTop - aOffset);
        // console.log(scrollTop);
        if(winWidth >= 1200) {

            var aboutL = "#aboutL";
            if (scrollTop - aOffset > 0) {
                startFix(aboutL);
                basicCalculationUpdate();

                if ((scrollTop - aOffset) >= (aContentHeight - winHeight)) {

                    endFix(aboutL);

                    //if content height < winHeight
                    if (aContentHeight >= winHeight) {
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
                //footer image only display when work is end
                $('.footer-page').css({"display": "inline"});

            } else {
                endFix(workL)
                $('.footer-page').css({"display": "none"});
            }


            var contactL = "#contactL";
            if (scrollTop - cOffset > 0) {
                if (winHeight < cContentHeight) {
                    startFix(contactL);
                    // basicCalculationUpdate();

                    if ((scrollTop - cOffset) > (cContentHeight - winHeight)) {
                        endFix(contactL);

                        if (cContentHeight > winHeight) {
                            adjustTop((contactL))
                        }
                    }
                }
            } else {
                endFix(contactL)

            }
        }
    });

    /* go to top after refresh */
    $(window).scrollTop(0);

    $(window).resize(function () {
        basicCalculationUpdate();
        if(winWidth<1200){
            $(".leftSide").removeClass("fixed");
            $(".leftSide").css({"top":0});

        }
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
        recoverProjects();
        // project_list.find(".project-header").find(".more-info").removeClass('disappear');

        //recalculate
        basicCalculationUpdate()

        //view focus to top project
        scrollToHash("#"+openProjectID);

        //remove transition for left Side
        // $("#work").find(".leftSide").removeClass("transitionEffect");

        //
        projectFire = false;

    });

    function recoverProjects(){
        var project_list = [];
        project_list = $(".project");
        project_list.find(".project-content").css({"display":"none"});
        project_list.removeClass("disappear");
        project_list.find(".project-header").css({"height":"100vh"});
    }

    $("#mobile-close-project").on("click", function () {

        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");
        // $("#mobile-close-project").css({"display":"none"});
        recoverProjects();

        //recalculate
        basicCalculationUpdate()

        //view focus to top project
        scrollToHash("#"+openProjectID);
        projectFire = false;

        $("#mobile-close-project").css({"display":"none"});
        console.log(this);
    });


    $("div[id^='project-']").on("click", function () {

        if (!projectFire){
            projectFire = true;
            //assign openProjectID
            openProjectID = this.id;

            var project_id = this.id.substring(8, this.id.length);
            var currentProject = $("#project-"+project_id);
            //disappear other projects
            projectDisapper(project_id);


            if(winWidth<1200){
                $("#mobile-close-project").css({"display":"inline"});
                scrollToHash(".project-header");
                $("#mobile-close-project").css({"display":"inline"});


            }else {
                // console.log(openProjectID);

                //add transition Effect fo left side
                // $("#work").find(".leftSide").addClass("transitionEffect");

                //show the cancel expand button
                $("#expand-close").css({"display":"inline"});



                //expand width 75% 25%
                // $("#workL").addClass("compress");
                // $("#workR").addClass("expand");

                scrollToHash("#work");
                //recalculate height
                // basicCalculationUpdate();

                //image container cut to 50% height
                // currentProject.find(".project-header").css({"height":"70vh"});
                //
                // currentProject.find(".project-content").css({"display":"inline"});

                //disappear next button
                // currentProject.find(".project-header").find(".more-info").addClass('disappear');

                // basicCalculationUpdate();
                //container height to 100%
                // $(".project .project-header").css({"height":"100vh"})
                //fix left side
                startFix("#workL");

                // $(".ancestors").find("span").css({"color": "red", "border": "2px solid red"});

                //add content to this projects

                //remove transition for left Side
                // $("#work").find(".leftSide").removeClass("transitionEffect");
            }
            $("#workL").addClass("compress");
            $("#workR").addClass("expand");

            currentProject.find(".project-header").css({"height":"70vh"});

            currentProject.find(".project-content").css({"display":"inline"});
            basicCalculationUpdate();



        }


    });

    $(".toMobile").on("click",function(){
        //hide portrait

        //left side width
    });
    function projectDisapper(project_id) {
        // console.log("project disappear")
        var project_list = [];
        project_list = $(".project");
        // console.log(object.id);
        // var project_id = object.id.substring(10, object.id.length);
        // console.log(project_id);
        for (var i = 1; i <= project_list.length; i++) {
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
        $('html,body').animate({scrollTop: dest}, 0, 'swing');
    }

    function startFix(name) {
        $(name).addClass("fixed");
        $(name).css({"top":0});

        // $('.chapterTitle').css({"padding-top":"50%"});
    }

    function endFix(name) {
        $(name).removeClass("fixed");
        console.log("end fix")
        // $('.chapterTitle').css({"padding-top":"50%","padding-bottom":winHeight/2});
    }

    function adjustTop(name) {
        var topHeight=0;
        switch (name) {
            case "#aboutL": topHeight = aContentHeight-winHeight; break;
            case "#workL": topHeight = wContentHeight-winHeight; break;
            case "#contactL": topHeight = cContentHeight-winHeight; break;
        }
        $(name).css({"top":topHeight})
    }

    function checkPortrait(){
        if($(".portrait").css("display")=="none"){
            return "small";
        }
        return "large";
    }
});