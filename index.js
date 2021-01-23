
$("input[type=checkbox]").prop('checked', false); /// refresh korar por checked gula unchecked hoye jabe
$("#projects").tabs();
$("ul").sortable({axis:"x", containment:"#projects"}); // project gula x axis borabor sortable korar jonno
$("ol").sortable({axis:"y", containment:"#projects"}); // task gula y axis borabor sortable korar jonno


//// jokhon kono task er checkbox checked kora hobe tokhon shei task ta remove hoye jabe
$("#projects").on("click", "input[type=checkbox]", function(){
    $(this).closest("li").slideUp(function(){
        $(this).remove(); 
    });
});


/// kono Project remove korte hole
$("#projects").on("click", "span.ui-icon-close", function(){
    var index = $(this).closest("li").index();
    var id = $("#main li:eq(" + index + ") a").attr("href");
    $("#main li:eq(" + index + ")").remove();
    $(id).remove();
    $("#projects").tabs("refresh");
});


///// New task add korar por ja hobe
$("#btnAddTask").button().click(function(){
    $("#task-dialog").dialog({width:400, resizable:false, modal:true,
        buttons:{
            "Add new task": function(){
                $("#projects").tabs("refresh");
                var activeTab = $("#projects").tabs("option", "active");
                var title = $("#main > li:nth-child(" + (activeTab+1) +") > a").attr("href");
                $("#projects " + title).append("<li><input type='checkbox'>" + $("#new-task").val() + "</li>");
                $("#new-task").val("");
                $(this).dialog("close");
            },
            "Cancel":function(){
                $("#new-task").val("");
                $(this).dialog("close");
            }
        }
    });
});



//// New Project Add korar por ja hobe
$("#btnAddProject").button().click(function(){
    $("#project-dialog").dialog({width:400, resizable:false, modal:true,
        buttons: {
            "Add new project": function(){
                var projectName = $("#new-project").val();
                var replaceName = projectName.split(" ").join("_");
                $("<li><a href='#" + replaceName + "'>" + projectName + "</a><span class='ui-icon ui-icon-close'></span></li>").appendTo("#main");
                $("<ol id='" + replaceName + "'></ol>").appendTo("#projects").sortable();
                $("#projects").tabs("refresh");
                var tabCount = $("#projects .ui-tabs-nav li").length;
                $("#projects").tabs("option", "active", tabCount-1);


                $("#new-project").val("");
                $(this).dialog("close");
            },
            "Cancel":function(){
                $("#new-project").val("");
                $(this).dialog("close");
            }
        }});
});
