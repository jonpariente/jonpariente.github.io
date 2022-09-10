<?php
/*
TIEMPO 1.0.1
HANDCRAFTED BY HAUNDO DESIGN
http://haundodesign.com
*/

$api_key = "a8732de30d959858dc4c2df0f7b64d63-us9";
$list_id = "5c1d185cec";

require('Mailchimp.php');
$Mailchimp = new Mailchimp( $api_key );
$Mailchimp_Lists = new Mailchimp_Lists( $Mailchimp );

try {
  $subscriber = $Mailchimp_Lists->subscribe( $list_id, array( 'email' => $_POST['subscriber_email'] ) );
  $response = 'subscribed';
} catch (Exception $error) {
  $response = $error->getMessage();
}

echo $response;
?>