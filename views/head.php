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

if(isset($uu->id))
	$item = $oo->get($uu->id);
else {
    http_response_code(404);
    echo 'nothing here.';
    die();
}

$name = isset($item) ? ltrim(strip_tags($item["name1"]), ".") : '';
$nav = $oo->nav($uu->ids);
$show_menu = false;
if($uu->id) {
	$is_leaf = empty($oo->children_ids($uu->id));
	$internal = isset($_SERVER['HTTP_REFERER']) && (substr($_SERVER['HTTP_REFERER'], 0, strlen($host)) === $host);	
	if(!$is_leaf && $internal)
		$show_menu = true;
} else  
    if ($uri[1])  
        $uu->id = -1; 

$card_src = $card_default;
if( isset($item) && $item['id'] !== 0 && count($oo->media($item['id'])) > 0 )
{
	foreach($oo->media($item['id']) as $m)
	{
		if($m['type'] == 'jpg' || $m['type'] == 'png' || $m['type'] == 'gif'){
			$card_src = m_url($m);
			break;
		}
	}
}

?><!DOCTYPE html>
<html lang="en">
	<head>
		<title><? echo $site_title; ?></title>
		<meta name="title" content="<? echo $site_title; ?>">
    	<meta name="description" content="<?php echo $description; ?>">
    	<!-- Open Graph / Facebook --> <!-- this is what Facebook and other social websites will draw on -->
	    <meta property="og:type" content="website">
	    <meta property="og:url" content="<?php echo $site_url; ?>">
	    <meta property="og:title" content="<? echo $site_title; ?>">
	    <meta property="og:description" content="<?php echo $description; ?>">
	    <meta property="og:image" content="<?php echo $site_url . $card_src; ?>">
		<meta property="og:locale" content="<?php echo $og_locale; ?>" />
        <meta property="og:logo" content="<?= $site_url . $logo_src; ?>" />
	    <!-- Twitter --> 
	    <meta property="twitter:card" content="summary_large_image">
	    <meta property="twitter:url" content="<?php echo $site_url; ?>">
	    <meta property="twitter:title" content="<? echo $site_title; ?>">
	    <meta property="twitter:description" content="<?php echo $description; ?>">
	    <meta property="twitter:image" content="<?php echo $site_url . $card_src; ?>">

		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="/static/css/main.css">
		<link rel="stylesheet" href="/static/css/screenfull-windowfull.css">
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
	    if(!empty($nav))
	    {
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
	                    if ($n['o']['deck'] && !ctype_space($n['o']['deck']))
	    				    echo ', ' . $n['o']['deck'];
		    		    ?></a><?
				    }
				    else {
	    			    ?><span><?= $n['o']['name1']; ?></span><?
				    }
			    ?></li><?
			    $prevd = $d;
		    }
	    }
	    ?></ul>
	    </ul>
    </header>
