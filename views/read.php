<section id="main">
    <div id='content' class='pdf'>
        <div id='columns'><?

            $directory = 'media/pdf';
            $files = scandir($directory);

            foreach($files as $f) {                
                $name = $f;
                $url = $directory . '/' . $f;
                if ($name) {
                    ?><div id='notes' class='mono'>
                        <a href='<?= $url; ?>'><?= $name; ?></a>
                    </div><?
                }
            }
        ?></div>
    </div>
</section>
