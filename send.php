<?php

//error_reporting(E_ALL);
ini_set("display_errors", 0);

require 'PHPMailer-master/PHPMailerAutoload.php';
$mail = new PHPMailer;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$ken = "ken@allfever.com";
	$jenny = "jenny@allfever.com";
	$from = "admin@allfever.com";
	$subject = "You've Got RSVP!";

	$who = "Side: " . $_POST['who'];
	$where = "Location: " . $_POST['where'];

	$name = 'Name: ';
	if (isset($_POST['name'])) {
		$name = "Name: " . $_POST['name'];
	}

	$mobile = 'Mobile: ';
	if (isset($_POST['mobile'])) {
		$mobile = "Mobile: " . $_POST['mobile'];
	}

	$address = 'Address: ';
	if (isset($_POST['address'])) {
		$address = "Address: " . $_POST['address'];
	}

	$adult = 'Adult: ';
	if (isset($_POST['adult'])) {
		$adult = "Adult: " . $_POST['adult'];
	}

	$kid = 'Kids: ';
	if (isset($_POST['kid'])) {
		$kid = "Kids: " . $_POST['kid'];
	}

	$babySeat = 'Baby Seat: ';
	if (isset($_POST['baby-seat'])) {
		$babySeat = "Baby Seat: " . $_POST['baby-seat'];
	}

	$vegetarian = 'Vegetarian: ';
	if (isset($_POST['vegetarian'])) {
		$vegetarian = "Vegetarian: " . $_POST['vegetarian'];
	}

	$how = 'Transport: ';
	if (isset($_POST['how'])) {
		$how = "Transport: " . $_POST['how'];
	}

	$message = 'Message: ';
	if (isset($_POST['message'])) {
		$message = "Message: " . $_POST['message'];
	}

	$body = $who . '<br />' . $where . '<br />' . $name . '<br />' . $mobile . '<br />' . $address . '<br />' . $adult . '<br />' . $kid . '<br />' . $babySeat . '<br />'. $vegetarian . '<br />' .$how . '<br />' .$message . '<br />';

	$mail = new PHPMailer(true);

	$mail->CharSet = 'UTF-8';
	$mail->IsHtml(true);

	$mail->IsSMTP();
	$mail->Host = "box.allfever.com";
	$mail->Username = "admin@allfever.com";
	$mail->Password = "feverq1w2e3r4";
	$mail->Port = "587";
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = "tls";

	$mail->Subject = $subject;
	$mail->Body = $body;

	$mail->SetFrom($from, 'RSVP');
	$mail->addReplyTo($from, 'RSVP');
	$mail->AddAddress($ken);
	$mail->AddAddress($jenny);

	$mail->SMTPDebug = 3;

	if ($_POST['where'] == "Taiwan") {
		$redirect = 1;
	}

	if ($_POST['where'] == "Sabah") {
		$redirect = 2;
	}

	if ($_POST['where'] == "Invitation Card" || $_POST['where'] == "Regards" || $_POST['where'] == "Singapore") {
		$redirect = 3;
	}

	$mail->send();

	header( "Location: http://rsvp.allfever.com/index.html?thank-you=" . $redirect );
}
?>