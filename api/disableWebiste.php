<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

$website_disabled = true;
$html = "<div style='min-height: 100vh; display: flex; justify-content: center; align-items: center;'><h1>Webiste Under Attack!</h1></div>";

echo json_encode(array("disabled" => $website_disabled, "html" => $html));
exit();
