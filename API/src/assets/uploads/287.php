#!/usr/bin/php
<?php

$text= file_get_contents($argv[1]);
preg_match_all('/<img [^>]*src="([^"]+)"[^>]*>/', $text, $img_links);
$folder = explode("//", $argv[1]);
$path = getcwd();
if (!file_exists($folder[1]))
    mkdir($folder[1]);
$dd = opendir($folder[1]);
chdir($folder[1]);
foreach ($img_links[1] as $img)
{
$test = explode('/', $img);
if ($test[0] != "http:" && $test[0] != "https:")
  $img = $argv[1].$img;
if (strstr($img, "http://"))
    $img = str_replace("http://", "https://", $img);
    echo $img."\n";
$ch = curl_init($img);
$img_name = explode('/', $img);
foreach ($img_name as $name)
    $name;
$fp = fopen($name, 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);
}
chdir($path);
closedir($dd);
?>
