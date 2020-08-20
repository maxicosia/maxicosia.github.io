<?php

if(isset($_POST["submit"])){
    $name = $_POST["name"];
    $subject = "Mail de prueba"
    $mailFrom = $_POST["mail"];
    $message = $_POST["message"];

    $mailTo = "cycensecouy@gmail.com";
    $headers = "From: ".$mailFrom;
    $txt = "Reciviste un e-mail de ".$name.".\n\n".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.html?mailsend");
}