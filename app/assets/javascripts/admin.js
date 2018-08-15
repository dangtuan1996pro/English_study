//= require admin/application_vendor
//= require admin/jquery.bootstrap-duallistbox.min
//= require admin/jquery.raty.min
//= require admin/bootstrap-multiselect.min
//= require admin/select2.min
//= require admin/jquery-typeahead
//= require admin/jquery-ui.custom.min
//= require admin/jquery.ui.touch-punch.min
//= require admin/markdown.min
//= require admin/bootstrap-markdown.min
//= require admin/jquery.hotkeys.index.min
//= require admin/bootstrap-wysiwyg.min

//= require admin/bootstrap.min
//= require admin/jquery.dataTables.min
//= require admin/jquery.dataTables.bootstrap.min
//= require admin/dataTables.buttons.min
//= require admin/buttons.flash.min
//= require admin/buttons.html5.min
//= require admin/buttons.print.min
//= require admin/buttons.colVis.min
//= require admin/dataTables.select.min
//= require admin/select2.min
//= require admin/chosen.jquery.min
//= require admin/autosize.min
//= require admin/jquery.inputlimiter.min
//= require admin/jquery.maskedinput.min.js
//= require admin/ace-elements.min
//= require admin/ace.min

jQuery(function($) {
  var $sidebar = $('.sidebar').eq(0);
  if( !$sidebar.hasClass('h-sidebar') ) return;

  $(document).on('settings.ace.top_menu' , function(ev, event_name, fixed) {
  if( event_name !== 'sidebar_fixed' ) return;

  var sidebar = $sidebar.get(0);
  var $window = $(window);

  //return if sidebar is not fixed or in mobile view mode
  var sidebar_vars = $sidebar.ace_sidebar('vars');
  if( !fixed || ( sidebar_vars['mobile_view'] || sidebar_vars['collapsible'] ) ) {
    $sidebar.removeClass('lower-highlight');
    //restore original, default marginTop
    sidebar.style.marginTop = '';

    $window.off('scroll.ace.top_menu')
    return;
  }


  var done = false;
  $window.on('scroll.ace.top_menu', function(e) {

  var scroll = $window.scrollTop();
  scroll = parseInt(scroll / 4);//move the menu up 1px for every 4px of document scrolling
  if (scroll > 17) scroll = 17;


  if (scroll > 16) {
    if(!done) {
      $sidebar.addClass('lower-highlight');
      done = true;
    }
  }
  else {
    if(done) {
      $sidebar.removeClass('lower-highlight');
      done = false;
    }
  }

  sidebar.style['marginTop'] = (17-scroll)+'px';
  }).triggerHandler('scroll.ace.top_menu');

}).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);

$(window).on('resize.ace.top_menu', function() {
$(document).triggerHandler('settings.ace.top_menu', ['sidebar_fixed' , $sidebar.hasClass('sidebar-fixed')]);
});



});

jQuery(function($){
  var demo1 = $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox({infoTextFiltered: '<span class="label label-purple label-lg">Filtered</span>'});
var container1 = demo1.bootstrapDualListbox('getContainer');
container1.find('.btn').addClass('btn-white btn-info btn-bold');

/**var setRatingColors = function() {
  $(this).find('.star-on-png,.star-half-png').addClass('orange2').removeClass('grey');
  $(this).find('.star-off-png').removeClass('orange2').addClass('grey');
}*/
$('.rating').raty({
  'cancel' : true,
  'half': true,
  'starType' : 'i'
  /**,

  'click': function() {
    setRatingColors.call(this);
  },
  'mouseover': function() {
    setRatingColors.call(this);
  },
  'mouseout': function() {
    setRatingColors.call(this);
  }*/
})//.find('i:not(.star-raty)').addClass('grey');



//////////////////
//select2
$('.select2').css('width','200px').select2({allowClear:true})
$('#select2-multiple-style .btn').on('click', function(e){
  var target = $(this).find('input[type=radio]');
  var which = parseInt(target.val());
  if(which == 2) $('.select2').addClass('tag-input-style');
    else $('.select2').removeClass('tag-input-style');
});

//////////////////
$('.multiselect').multiselect({
  enableFiltering: true,
  enableHTML: true,
  buttonClass: 'btn btn-white btn-primary',
  templates: {
  button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
  ul: '<ul class="multiselect-container dropdown-menu"></ul>',
  filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
  filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
  li: '<li><a tabindex="0"><label></label></a></li>',
      divider: '<li class="multiselect-item divider"></li>',
      liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
  }
});


///////////////////

//typeahead.js
//example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  }
  }

  $('input.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
  }, {
  name: 'states',
  displayKey: 'value',
  source: substringMatcher(ace.vars['US_STATES']),
  limit: 10
  });


///////////////


//in ajax mode, remove remaining elements before leaving page
$(document).one('ajaxloadstart.page', function(e) {
  $('[class*=select2]').remove();
  $('select[name="duallistbox_demo1[]"]').bootstrapDualListbox('destroy');
  $('.rating').raty('destroy');
  $('.multiselect').multiselect('destroy');
});

});

jQuery(function($){

  $('textarea[data-provide="markdown"]').each(function(){
        var $this = $(this);

    if ($this.data('markdown')) {
      $this.data('markdown').showEditor();
    }
    else $this.markdown()

    $this.parent().find('.btn').addClass('btn-white');
    })



  function showErrorAlert (reason, detail) {
    var msg='';
    if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
    else {
      //console.log("error uploading file", reason, detail);
    }
    $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+
      '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
  }

  //$('#editor1').ace_wysiwyg();//this will create the default editor will all buttons

  //but we want to change a few buttons colors for the third style
  $('#editor1').ace_wysiwyg({
    toolbar:
    [
      'font',
      null,
      'fontSize',
      null,
      {name:'bold', className:'btn-info'},
      {name:'italic', className:'btn-info'},
      {name:'strikethrough', className:'btn-info'},
      {name:'underline', className:'btn-info'},
      null,
      {name:'insertunorderedlist', className:'btn-success'},
      {name:'insertorderedlist', className:'btn-success'},
      {name:'outdent', className:'btn-purple'},
      {name:'indent', className:'btn-purple'},
      null,
      {name:'justifyleft', className:'btn-primary'},
      {name:'justifycenter', className:'btn-primary'},
      {name:'justifyright', className:'btn-primary'},
      {name:'justifyfull', className:'btn-inverse'},
      null,
      {name:'createLink', className:'btn-pink'},
      {name:'unlink', className:'btn-pink'},
      null,
      {name:'insertImage', className:'btn-success'},
      null,
      'foreColor',
      null,
      {name:'undo', className:'btn-grey'},
      {name:'redo', className:'btn-grey'}
    ],
    'wysiwyg': {
      fileUploadError: showErrorAlert
    }
  }).prev().addClass('wysiwyg-style2');


  /**
  //make the editor have all the available height
  $(window).on('resize.editor', function() {
    var offset = $('#editor1').parent().offset();
    var winHeight =  $(this).height();

    $('#editor1').css({'height':winHeight - offset.top - 10, 'max-height': 'none'});
  }).triggerHandler('resize.editor');
  */


  $('.editor2').css({'height':'200px'}).ace_wysiwyg({
    toolbar_place: function(toolbar) {
      return $(this).closest('.widget-box')
              .find('.widget-header').prepend(toolbar)
            .find('.wysiwyg-toolbar').addClass('inline');
    },
    toolbar:
    [
      'bold',
      {name:'italic' , title:'Change Title!', icon: 'ace-icon fa fa-leaf'},
      'strikethrough',
      null,
      'insertunorderedlist',
      'insertorderedlist',
      null,
      'justifyleft',
      'justifycenter',
      'justifyright'
    ],
    speech_button: false
  });




  $('[data-toggle="buttons"] .btn').on('click', function(e){
    var target = $(this).find('input[type=radio]');
    var which = parseInt(target.val());
    var toolbar = $('#editor1').prev().get(0);
    if(which >= 1 && which <= 4) {
      toolbar.className = toolbar.className.replace(/wysiwyg\-style(1|2)/g , '');
      if(which == 1) $(toolbar).addClass('wysiwyg-style1');
      else if(which == 2) $(toolbar).addClass('wysiwyg-style2');
      if(which == 4) {
        $(toolbar).find('.btn-group > .btn').addClass('btn-white btn-round');
      } else $(toolbar).find('.btn-group > .btn-white').removeClass('btn-white btn-round');
    }
  });




  //RESIZE IMAGE

  //Add Image Resize Functionality to Chrome and Safari
  //webkit browsers don't have image resize functionality when content is editable
  //so let's add something using jQuery UI resizable
  //another option would be opening a dialog for user to enter dimensions.
  if ( typeof jQuery.ui !== 'undefined' && ace.vars['webkit'] ) {

    var lastResizableImg = null;
    function destroyResizable() {
      if(lastResizableImg == null) return;
      lastResizableImg.resizable( "destroy" );
      lastResizableImg.removeData('resizable');
      lastResizableImg = null;
    }

    var enableImageResize = function() {
      $('.wysiwyg-editor')
      .on('mousedown', function(e) {
        var target = $(e.target);
        if( e.target instanceof HTMLImageElement ) {
          if( !target.data('resizable') ) {
            target.resizable({
              aspectRatio: e.target.width / e.target.height,
            });
            target.data('resizable', true);

            if( lastResizableImg != null ) {
              //disable previous resizable image
              lastResizableImg.resizable( "destroy" );
              lastResizableImg.removeData('resizable');
            }
            lastResizableImg = target;
          }
        }
      })
      .on('click', function(e) {
        if( lastResizableImg != null && !(e.target instanceof HTMLImageElement) ) {
          destroyResizable();
        }
      })
      .on('keydown', function() {
        destroyResizable();
      });
      }

    enableImageResize();

    /**
    //or we can load the jQuery UI dynamically only if needed
    if (typeof jQuery.ui !== 'undefined') enableImageResize();
    else {//load jQuery UI if not loaded
      //in Ace demo ./components will be replaced by correct components path
      $.getScript("~/Areas/admin/assets/js/jquery-ui.custom.min.js", function(data, textStatus, jqxhr) {
        enableImageResize()
      });
    }
    */
  }


});

$("#writing_form").on("submit", function(){
  var editor_val = CKEDITOR.instances['question_title'].getData() ;
  if (editor_val == '') {
    alert('Editor value cannot be empty!') ;
    return false ;
  }
  return true ;
});

$("#file_input").bind("input", function(){ 
  var audio = $("#audio");
  var source = $("#source");
  source[0].src = $(this).val();
  audio.load();
});
