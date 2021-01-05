<?
// open-records-generator
require_once('open-records-generator/config/config.php');
require_once('open-records-generator/config/url.php');

// site
require_once('static/php/config.php');

$db = db_connect("guest");
$oo = new Objects();
$mm = new Media();
$ww = new Wires();
$uu = new URL();

if($uu->id)
	$item = $oo->get($uu->id);
else
	$item = $oo->get(0);
$name = ltrim(strip_tags($item["name1"]), ".");
$nav = $oo->nav($uu->ids);
$show_menu = false;
if($uu->id) {
	$is_leaf = empty($oo->children_ids($uu->id));
	$internal = (substr($_SERVER['HTTP_REFERER'], 0, strlen($host)) === $host);	
	if(!$is_leaf && $internal)
		$show_menu = true;
} else  
    if ($uri[1])  
        $uu->id = -1; 

?><!DOCTYPE html>
<html>
	<head>
		<title><? echo $site; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="/static/css/main.css">
		<link rel="stylesheet" href="/static/css/sf-text.css">
		<link rel="stylesheet" href="/static/css/sf-mono.css">
		<link rel="apple-touch-icon" href="/media/png/touchicon.png" />
	</head>
	<body><?
	    if(!$uu->id) {
    	    ?><header id="menu" class="hidden homepage"><?
	    }
	    else if($show_menu) {
    	    ?><header id="menu" class="visible"><?
	    }
	    else {
    	    ?><header id="menu" class="hidden"><?
	    }
	    ?><ul>
		    <li><?
			    if($uu->id) {
				    ?><a href="<? echo $host; ?>"><?= $head; ?></a><?
			    }
			    else { 
                    echo $head; 
                }
		    ?></li>
		    <ul class="nav-level"><?
	    $prevd = $nav[0]['depth'];
	    foreach($nav as $n) {
		    $d = $n['depth'];
		    if($d > $prevd) {
    		    ?><ul class="nav-level"><?
		    }
		    else {
			    for($i = 0; $i < $prevd - $d; $i++) { 
                    ?></ul><? 
                }
		    }
		    ?><li><?
			    if($n['o']['id'] != $uu->id) {
    			    ?><a href="<? echo $host.$n['url']; ?>"><?
				    echo $n['o']['name1'];
                    if ($n['o']['url'] !== "about")
    				    echo ', ' . $n['o']['deck'];
	    		    ?></a><?
			    }
			    else {
    			    ?><span><?= $n['o']['name1']; ?></span><?
			    }
		    ?></li><?
		    $prevd = $d;
	    }
	    ?></ul>
	    </ul>
    </header>
