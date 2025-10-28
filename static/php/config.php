<?
/*
    site-specific config
*/

$site_title = 'G-e-s-t-a-l-t';
$head = 'VIS 216';
$site = 'G-e-s-t-a-l-t';
$home = $head . ", " . $site;
$card_default = '/media/jpg/card-default.jpg';
$logo_src = '/media/jpg/logo.jpg';
$description = 'Hello, w-w-w-orld.';
$site_url = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
$site_url .= '://' . $_SERVER['SERVER_NAME'];
$og_locale = 'en_US';
?>
