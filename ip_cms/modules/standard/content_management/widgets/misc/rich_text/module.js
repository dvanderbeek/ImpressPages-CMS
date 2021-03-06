/**
 * @package ImpressPages
 * @copyright Copyright (C) 2011 ImpressPages LTD.
 * @license GNU/GPL, see ip_license.html
 */

function content_mod_rich_text() {
  this.text = '';
  this.my_name = '';
  this.menu_management = '';

  this.preview = preview;
  this.manage = manage;
  this.save = save;
  this.init = init;
  this.store_to_db_fields = store_to_db_fields;
  this.get_answer = get_answer;
  this.set_text = set_text;
  this.close = close;
  this.manage_init = manage_init;
  this.empty = empty;

  var collection_number;
  var id;
  var visible;
  var deleted;
  var layout;

  function init(collection_number, id, visible, my_name, menu_management) {
    this.my_name = my_name;
    this.collection_number = collection_number;
    this.id = id;
    this.visible = visible;
    this.deleted = 0;
    this.menu_management = menu_management;
  }

  function empty() {
    if (this.text == '' || this.text.length < 4
      || this.text == '<p><br mce_bogus="1"></p>')
      return true;
    else
      return false;
  }

  function preview(worker_form, return_script, collection_number) {
    document.getElementById(worker_form).innerHTML = ''
    + '<input name="action" value="make_preview" />'
    + '<input name="collection_number" value="' + collection_number
    + '" />' + '<input name="module_key" value="rich_text" />'
    + '<input name="group_key" value="misc" />'
    + '<input name="layout" value="' + this.layout + '" />'
    + '<textarea name="text" /></textarea>'
    + '<input name="answer_function" value="' + return_script
    + '" />';
    document.getElementById(worker_form).text.value = this.text;

    document.getElementById(worker_form).submit();

  }
  ;

  function manage() {
    var div = document.createElement('div');
    var tinyMCE_script;
    div.setAttribute('name', 'management');
    div.setAttribute('style', 'margin: 0px; padding: 0px;');
    div.innerHTML = ''
    + '<div class="ipCmsManagement">'
    + '<label class="ipCmsModuleName">'
    + widget_rich_text_widget_title + '</label>'
    + '<form id="mod_' + this.collection_number	+ '_layout" action="">'	+ mod_rich_text_layout + '</form>'
    + '<div class="ipCmsModuleSeparator"></div>'
    + '<textarea style="width: 100%;" id="management_' + this.collection_number + '_text"></textarea>'
    + '</div>';
    div.getElementsByTagName('textarea')[0].value = this.text;

    return div;
  }
  ;

  function manage_init() {

    var LayoutSelect = document.getElementById('mod_' + this.collection_number + '_layout').layout;
    for (index = 0; index < LayoutSelect.length; index++) {
      if (LayoutSelect[index].value == this.layout)
        LayoutSelect.selectedIndex = index;
    }
		
    eval(configWidgetMiscRichTextMceInit);

    tinyMCE.execCommand('mceAddControl', true,
      'management_' + this.collection_number + '_text');

  }

  function close() {
    tinyMCE.execCommand('mceRemoveControl', true,
      'management_' + this.collection_number + '_text');

  }

  function save() {
    this.layout = document.getElementById('mod_' + this.collection_number + '_layout').layout.value;
		
    tinyMCE.execCommand('mceFocus', false, 'management_' + this.collection_number + '_text');
    this.text = tinyMCE.get('management_' + this.collection_number + '_text').getContent();// or tinyMCE.activeEditor.getContent()
    this.text = this.text.replace(/[\r\n]+/g, "\n");

    this.menu_management.module_preview_save_response(this.collection_number);
  }

  function get_answer(notes) {
    /*
		 * for(var i=0; i<notes.length; i++) alert(notes[i]);
		 */
    return false;
  }

  function store_to_db_fields(row_number, menu_element_id) {
    if (this.id == null) {
      if (this.deleted == 0) {
        var fields = [];
        fields.push( [ 'action', 'new_module' ]);
        fields.push( [ 'group_key', 'misc' ]);
        fields.push( [ 'module_key', 'rich_text' ]);
        fields.push( [ 'layout', this.layout ]);
        fields.push( [ 'text', this.text ]);
        fields.push( [ 'content_element_id', menu_element_id ]);
        fields.push( [ 'row_number', row_number ]);
        fields.push( [ 'visible', this.visible ]);
        return fields;
      } else {
        return [];
      }
    } else {
      if (this.deleted == 0) {
        var fields = [];
        fields.push( [ 'action', 'update_module' ]);
        fields.push( [ 'group_key', 'misc' ]);
        fields.push( [ 'module_key', 'rich_text' ]);
        fields.push( [ 'layout', this.layout ]);
        fields.push( [ 'text', this.text ]);
        fields.push( [ 'id', this.id ]);
        fields.push( [ 'row_number', row_number ]);
        fields.push( [ 'visible', this.visible ]);
        return fields;
      } else {
        var fields = [];
        fields.push( [ 'action', 'delete_module' ]);
        fields.push( [ 'group_key', 'misc' ]);
        fields.push( [ 'module_key', 'rich_text' ]);
        fields.push( [ 'layout', this.layout ]);
        fields.push( [ 'id', this.id ]);
        return fields;
      }
    }
    document.getElementById(worker_form).submit();
  }

  function set_text(text) {
    this.text = text;
  }

}
