<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

$website_disabled = false;

echo json_encode(array("disabled" => $website_disabled));
