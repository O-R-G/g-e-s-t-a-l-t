<?
/*
    edit $badge per site
    plus .js src above
*/

$badge = "<canvas class='centre'>loading...</canvas>";

if(!$uu->id) {
    ?><div id='badge-container' class='centre'>
    	<div id='badge' class='large badge'>
            <?= $badge; ?>
        </div>
    </div><?
} else {
	if($show_menu) {
    	?><div id="badge-container" class="lower-right">
    	    <div id='badge' class='small badge'>
                <?= $badge; ?>
            </div>
    	</div><?
	} else {
    	?><div id="badge-container" class="lower-right">
    	    <div id='badge' class='small badge'>
                <?= $badge; ?>
            </div>
    	</div><?
	}
}

?><script type='text/javascript' src='/static/js/global.js'></script>
<script type='text/javascript' src='/static/js/menu.js'></script>
<script src='static/js/badge.js'></script>
<script>badge_init();</script>
