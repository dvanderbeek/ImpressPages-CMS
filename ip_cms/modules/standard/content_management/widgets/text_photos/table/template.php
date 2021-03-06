<?php 
/**
 * @package	ImpressPages
 * @copyright	Copyright (C) 2011 ImpressPages LTD.
 * @license	GNU/GPL, see ip_license.html
 */

namespace Modules\standard\content_management\Widgets\text_photos\table;
 
if (!defined('CMS')) exit;
class Template {

  public static function generateHtml($text, $layout = null){
    $text = str_replace('<br>', '<br />', $text);

    switch($layout){
      default:
      case "default":     
        return "\n".'<div class="ipWidget ipWidgetText ipWidgetTextTable">'."\n  ".$text."\n".'</div>'."\n";
      break;
    }
  }
	 
}

