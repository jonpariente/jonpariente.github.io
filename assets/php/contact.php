<?php
  $to = 'jonfoxhound@gmail.com';
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = $_POST['message'];  
  
  $subject = 'Contacto';
  $body = 'De: ' . $name . "\r\n";
  $body .= 'E-mail: ' . $email . "\r\n\r\n";
  $body .= 'Mensaje: ' . $message;
  $headers = "From: " . $name . "\r\n";
  $headers .= "Reply-To: ". $email . "\r\n";
  
  if(!$_POST) {
    http_response_code(405);
    echo "There was an error sending the message. Please try again later.";
  }else{
    if(empty($name) || empty($email) || empty($message)) {
      http_response_code(500);
      echo "Something went wrong and the message couldn't be sent.";
    }else{    
      $sent = mail($to, $subject, $body, $headers);
  
      if($sent) {
        echo "The message has been successfully sent. You’ll get a reply very soon.";
        http_response_code(200);
      }else{
        echo "There was an error sending the message. Please try again later.";
        http_response_code(403);
      }
    }
  }
?>