<?
if($item)
{
	$name = $item['name1'];
	$deck = $item['deck'];
	$body = $item['body'];
	$notes = $item['notes'];
	$date = $item['begin'];
	$find = '/<div><br><\/div>/';
	$replace = '';
	$body = preg_replace($find, $replace, $body); 
}
else
{
	$name = '';
	$deck = '';
	$body = '';
	$notes = '';
	$date = '';
}

?><div id='fullwindow'></div>
<div id='screenfull-container'></div>
<section id="main">
	<div id="breadcrumbs">
		<ul class="nav-level">
			<li><?
				if(!$uu->id) {
                    echo $home . '<a href="/about">&thinsp;*&nbsp;</a>';
				} else {
				    ?><a href="/"><?= $head; ?></a><?
				}
			?></li>
			<ul class="nav-level">
				<span><? echo $name; ?></span>
			</ul>
		</ul>
	</div>
    <div id='content'>
        <div id='columns'><?
            echo $body;
            if ($date) {
                ?><div id='notes' class='mono'><?
                    echo date("F j, Y", strtotime($date));
                    echo '<br/>';
                    echo $deck;
                    echo '<br/><br/>';
                    echo $notes;
                ?></div><?
            }
        ?></div>
    </div>
</section>

<script type="text/javascript" src="/static/js/screenfull.min.js"></script>	
<script type="text/javascript" src="/static/js/screenfull-extend.js"></script>	
<script type="text/javascript" src="/static/js/windowfull.js"></script>	
<script>
	const images = document.querySelectorAll('img:not(.prevent-windowfull):not(.prevent-screenfull)');
	if (screenfull.isEnabled) {
		new ScreenfullExtended(screenfull, document.getElementById('screenfull-container'), images);
	}	
	else{
		windowfull.init(document.getElementById('fullwindow'), images);
	}
</script>
