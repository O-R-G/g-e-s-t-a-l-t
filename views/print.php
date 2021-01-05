<section id="main">
    <div id='content' class='make'>
        <div id='columns'><?

            // output meta record * (no begin date)
            foreach($nav as $n) {
                $body = $n['o']['body'];
                $date =  $n['o']['begin'];
                if (!$date) {
                    ?><div id='about' class='mono' ><?
                        echo $body;
                    ?></div><?
                }
            }

            // output regular records (begin dates)
            foreach($nav as $n) {
                $name = $n['o']['name1'];
                $deck = $n['o']['deck'];
                $notes = $n['o']['notes'];
                $date =  $n['o']['begin'];
                if ($date) {
                    ?><div id='notes' class='mono'><?
                        echo date("F j, Y", strtotime($date));
                        echo '<br/>';
                        echo $deck;
                        echo '<br/><br/>';
                        echo $notes;
                    ?></div><?
                }
            }
        ?></div>
    </div>
</section>
<script>
    window.onload = function() {
        var random_delay = Math.floor(Math.random() * 4000 - 1500) + 1500;
        setTimeout(function(){
            window.print(); 
            }, random_delay);
    }
</script>
