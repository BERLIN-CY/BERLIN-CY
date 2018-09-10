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
    loadImage();

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
        // console.log(scrollTop);
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

                // if (projectFire) {
                //     var headerImageTop = scrollTop - wOffset;
                //     $('.header-image').css({"top": headerImageTop});
                // }

                if ((scrollTop - wOffset) > (wContentHeight - winHeight)) {
                    endFix(workL);
                    adjustTop(workL);
                    basicCalculationUpdate();
                }
            } else {
                endFix(workL);
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
                endFix(contactL);
                footerPageDisappear();
            }
        }
        else{

            if (projectFire) {
                var headerImageTop = scrollTop - wOffset;
                // $('.header-image').css({"top": headerImageTop});

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


    /* go to top after refresh */
    $(window).scrollTop(0);

    $(window).resize(function () {
        basicCalculationUpdate();
        desktopVSmobile();
        loadImage();

        // if (winWidth >= desktopWidth) {
        // }
    });

// left side will not show when click the close button
// at the end of the 1st project

    $("#expand-close").on("click", function () {
        expandClose();
    });

    function expandClose() {
        rightLineDisappear();
        $('.header-image').css({"top": 0});


        $("#expand-close").css({"display": "none"});

        //expand width 75% 25%
        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");

        //display recover
        recoverProjects();

        //recalculate
        basicCalculationUpdate();

        //view focus to top project
        scrollToHash("#" + openedProjectID, 0);

        projectFire = false;
    }

    $("#next-project").on("click", function () {
        recoverProjects();
    });


    $("#mobile-close-project").on("click", function () {

        $('.header-image').css({"top": 0});

        $("#workL").removeClass("compress");
        $("#workR").removeClass("expand");
        // $("#mobile-close-project").css({"display":"none"});
        recoverProjects();

        //recalculate
        basicCalculationUpdate();

        //view focus to top project
        scrollToHash("#" + openedProjectID, 0);
        projectFire = false;

        $("#mobile-close-project").css({"display": "none"});
        console.log(this);
    });

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

    function footerPageDisappear(){
        $('.footer-page').css({"display": "none"});
        console.log("footer page disappear");
    }

    function recoverProjects() {
        var project_list = [];
        project_list = $(".project");
        project_list.find(".project-content").css({"display": "none"});
        project_list.removeClass("disappear");
        project_list.find(".project-header").css({"height": "100vh"});
    }

    function rightLineAppear(){
        $('#workL').addClass("border-color-grey");
        console.log("border right show");
    }

    function rightLineDisappear(){
        $('#workL').removeClass("border-color-grey");
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

    function loadImage(){
        var project1 = $("#project-1 .project-details");
        var project2 = $("#project-2 .project-details");
        var project3 = $("#project-3 .project-details");
        var project4 = $("#project-4 .project-details");

        $("#project-1 .project-details > img").remove();
        $("#project-2 .project-details > img").remove();
        $("#project-3 .project-details > img").remove();
        $("#project-4 .project-details > img").remove();

        if(winWidth > desktopWidth){
            var dir1 = "assets/img/project/bali/web/";
            for(var i=1; i<=4; i++){
                project1.append("<img src='" + dir1 + i + '.jpg' + "'>");
            }

            var dir2 = "assets/img/project/jeju/web/";
            for(var i=1; i<=5; i++){
                project2.append("<img src='" + dir2 + i + '.jpg' + "'>");
            }

            var dir3 = "assets/img/project/taipei/web/";
            for(var i=1; i<=7; i++){
                project3.append("<img src='" + dir3 + i + '.jpg' + "'>");
            }

            var dir4 = "assets/img/project/turkey/web/";
            for(var i=1; i<=12; i++){
                project4.append("<img src='" + dir4 + i + '.jpg' + "'>");
            }

        }else {
            var dir1 = "assets/img/project/bali/mobile/";
            for(var i=1; i<=4; i++){
                project1.append("<img src='" + dir1 + i + '.jpg' + "'>");
            }

            var dir2 = "assets/img/project/jeju/mobile/";
            for(var i=1; i<=5; i++){
                project2.append("<img src='" + dir2 + i + '.jpg' + "'>");
            }

            var dir3 = "assets/img/project/taipei/mobile/";
            for(var i=1; i<=7; i++){
                project3.append("<img src='" + dir3 + i + '.jpg' + "'>");
            }

            var dir4 = "assets/img/project/turkey/mobile/";
            for(var i=1; i<=12; i++){
                project4.append("<img src='" + dir4 + i + '.jpg' + "'>");
            }
        }
        // var fileExtension = ".jpg";
        // $.ajax({
        //     //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        //     url: dir,
        //     success: function (data) {
        //         //List all .png file names in the page
        //         $(data).each(function () {
        //             var filename = this.href.replace(window.location, "").replace("http://", "");
        //             $("#project-1 .project-details").append("<img src='" + dir + filename + "'>");
        //             console.log(filename);
        //         });
        //     },
        //     error: function (er) {
        //         console.log('error', er.message);
        //
        //     }
        // });
    }


});
