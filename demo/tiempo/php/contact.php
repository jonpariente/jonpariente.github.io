<?php
/*
TIEMPO 1.0.1
HANDCRAFTED BY HAUNDO DESIGN
http://haundodesign.com
*/

$to = strip_tags( $_POST['to'] );
$name = strip_tags( $_POST['name'] );
$email = strip_tags( $_POST['email'] );
$message = strip_tags( $_POST['message'] );

$subject = 'From ' . $name;
$body = '<p><strong>Name: </strong>' . $name . '<br></p>';
$body .= '<p><strong>Email: </strong>' . $email . '<br></p>';
$body .= '<p><strong>Message: </strong>' . $message . '</p>';
$headers = "From: " . $name . "\r\n";
$headers .= "Reply-To: ". $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$response = '';

if( empty( $name ) || empty( $email ) || empty( $message ) ) {
  $response = 'empty';
}else{
  if( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
    $response = 'email';
  }else{
    $sent = mail( $to, $subject, $body, $headers );

    if( $sent ) {
      $response = 'sent';
    }else{
      $response = 'unsent';
    }
  }
}

echo $response;

die();
?>