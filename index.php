<?
$uri = explode('/', $_SERVER['REQUEST_URI']);

require_once("views/head.php");
if ($uri[1] == 'print')
    require_once("views/print.php");
else if ($uri[1] == 'read')
    require_once("views/read.php");
else 
    require_once("views/main.php");
require_once("views/badge.php");
require_once("views/foot.php");
?>
