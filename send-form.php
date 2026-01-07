<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = [
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'email' => $_POST['email'],
        'city' => $_POST['city'],
        'message' => $_POST['message']
    ];
    
    // Отправка на email
    $to = "ваш@email.com";
    $subject = "Новая заявка с сайта ТуалетБио";
    $message = print_r($data, true);
    $headers = "From: antidolgi24@gmail.com";
    
    mail($to, $subject, $message, $headers);
    
    echo json_encode(['success' => true]);
}
?>
