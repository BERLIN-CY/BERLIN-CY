$(document).ready(function () {
    const desktopWidth = 1023;
    var winWidth = 0;
    var aR, wR, cR, aOffset,
        wOffset, cOffset, winHeight,
        aContentHeight, wContentHeight, cContentHeight;

    var openedProjectID = "";

    var projectFire = false;

    basicCalculationUpdate();
    desktopVSmobile();

    function desktopVSmobile() {
        if (winWidth >= desktopWidth) {
            $('.social-nav img').css({"max-height": "80px", "padding-right": "20px"});
            $('#workL').removeClass("bg-color-pink");
            $('#workL').removeClass("text-color-white");

        } else {
            $(".leftSide").removeClass("fixed");
            $(".leftSide").css({"top": 0});
            $("#expand-close").css({"display": "none"});

            $('#workL').addClass("bg-color-pink");
            $('#workL').addClass("text-color-white");

            footerPageAppear();
        }
    }

    function basicCalculationUpdate() {
        winWidth = $(window).width();
        console.log("window width" + winWidth);

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

        $('.chapterTitle').css({"padding-top": winHeight * (1 - 0.618)});

        console.log("aOffset:" + aOffset);
        console.log("aContentHeight:" + aContentHeight);
    }


    $(window).scroll(function () {
        // var scrollTop = $('body').scrollTop;
        // var scrollTop = $("html, body").scrollTop();
        var scrollTop = $(document).scrollTop();
        console.log(scrollTop);
        // console.log(scrollTop - aOffset);
        // console.log(scrollTop);

        if (winWidth >= desktopWidth) {

            var aboutL = "#aboutL";
            if (scrollTop - aOffset > 0) {
                startFix(aboutL);
                // basicCalculationUpdate();

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

                if (projectFire) {
                    var headerImageTop = scrollTop - wOffset;
                    $('.header-image').css({"top": headerImageTop});
                }

                if ((scrollTop - wOffset) > (wContentHeight - winHeight)) {
                    endFix(workL);
                    adjustTop(workL);
                    basicCalculationUpdate();
                }
            } else {
                endFix(workL)
                $('.header-image').css({"top": 0});
            }


            var contactL = "#contactL";
            if (scrollTop - cOffset > 0) {
                footerPageAppear();

                if (winHeight < cContentHeight) {
                    startFix(contactL);
                    if ((scrollTop - cOffset) > (cContentHeight - winHeight)) {
                        endFix(contactL);
                        if (cContentHeight > winHeight) {
                            adjustTop((contactL))
                        }
                    }
                }
            } else {
                endFix(contactL)
                footerPageDisappear();
            }
        }
        else{

            if (projectFire) {
                var headerImageTop = scrollTop - wOffset;
                $('.header-image').css({"top": headerImageTop});

                if (scrollTop - wOffset < 0) {
                    $('.header-image').css({"top": 0});
                }
            }
        }
    });
    function footerPageAppear() {
        $('.footer-page').css({"display": "inline"});
        console.log("footer page appear");
    }
    function footerPageDisappear(){
        $('.footer-page').css({"display": "none"});
        console.log("footer page disappear");
    }

    /* go to top after refresh */
    $(window).scrollTop(0);

    $(window).resize(function () {
        basicCalculationUpdate();
        desktopVSmobile();
    });

//todo [bug]
// left side will not show when click the close button
// at the end of the 1st project

    $("#expand-close").on("click", function () {

        rightLineDisappear();
        $('.header-image').css({"top": 0});


        $("#expand-close").css({"display": "none"});

        //expand width 75% 25%
        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");

        //display recover
        recoverProjects();

        //recalculate
        basicCalculationUpdate()

        //view focus to top project
        scrollToHash("#" + openedProjectID, 0);

        projectFire = false;

    });

    function recoverProjects() {
        var project_list = [];
        project_list = $(".project");
        project_list.find(".project-content").css({"display": "none"});
        project_list.removeClass("disappear");
        project_list.find(".project-header").css({"height": "100vh"});
    }

    $("#mobile-close-project").on("click", function () {

        $('.header-image').css({"top": 0});

        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");
        // $("#mobile-close-project").css({"display":"none"});
        recoverProjects();

        //recalculate
        basicCalculationUpdate()

        //view focus to top project
        scrollToHash("#" + openedProjectID, 0);
        projectFire = false;

        $("#mobile-close-project").css({"display": "none"});
        console.log(this);
    });

    function rightLineAppear(){
        $('#workL').addClass("border-color-grey");
        console.log("border right show");
    }
    function rightLineDisappear(){
        $('#workL').removeClass("border-color-grey");
    }

    $("div[id^='project-']").on("click", function () {

        if (!projectFire) {
            projectFire = true;

            rightLineAppear();

            //assign openedProjectID
            openedProjectID = this.id;

            var projectID = this.id.substring(8, this.id.length);
            var currentProject = $("#project-" + projectID);
            //disappear other projects
            projectDisapper(projectID);


            if (winWidth < desktopWidth) {
                scrollToHash(currentProject.find(".project-header"),0);
                $("#mobile-close-project").css({"display": "inline"});


            } else {
                $("#expand-close").css({"display": "inline"});

                // scrollToHash(currentProject,9999);
                startFix("#workL");
            }
            $("#workL").addClass("compress");
            $("#workR").addClass("expand");

            currentProject.find(".project-header").css({"height": "70vh"});

            currentProject.find(".project-content").css({"display": "inline"});
            basicCalculationUpdate();
        }
    });

    function projectDisapper(project_id) {
        // console.log("project disappear")
        var project_list = [];
        project_list = $(".project");
        for (var i = 1; i <= project_list.length; i++) {
            if (i != project_id) {
                var project_id_disappear = "#project-" + i;
                // console.log(project_id_disappear);
                $(project_id_disappear).addClass("disappear");
            }
        }
    }

    function scrollToHash(hashName) {
        // window.location = location.hash;
        console.log(hashName);
        var dest = 0;
        if ($(hashName).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(hashName).offset().top;
        }
        //go to destination
        $('html,body').animate({scrollTop: dest}, 1000, 'swing');
    }

    function scrollToHash(hashName, speed) {
        // window.location = location.hash;
        console.log(hashName);
        var dest = 0;
        if ($(hashName).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(hashName).offset().top;
        }
        $('html,body').animate({scrollTop: dest}, speed, 'swing');
    }

    function startFix(name) {
        $(name).addClass("fixed");
        $(name).css({"top": 0});
    }

    function endFix(name) {
        $(name).removeClass("fixed");
        console.log("end fix")

        basicCalculationUpdate();
    }

    function adjustTop(name) {
        var topHeight = 0;
        switch (name) {
            case "#aboutL":
                topHeight = aContentHeight - winHeight;
                break;
            case "#workL":
                topHeight = wContentHeight - winHeight;
                break;
            case "#contactL":
                topHeight = cContentHeight - winHeight;
                break;
        }
        $(name).css({"top": topHeight})
    }
});
