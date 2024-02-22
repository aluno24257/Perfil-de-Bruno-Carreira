<?php
if(isset($_POST['email'])) {

  $email_to = "brunocarreira2003@gmail.com";
  $email_subject = "Contato pelo Site";

  function died($error) {
    echo "Lamentamos, mas ocorreram erros no formulário enviado. ";
    echo "Esses erros aparecem abaixo.<br /><br />";
    echo $error."<br /><br />";
    echo "Por favor, volte e corrija esses erros.<br /><br />";
    die();
  }

  if(!isset($_POST['nome']) ||
    !isset($_POST['email']) ||
    !isset($_POST['mensagem'])) {
    died('Lamentamos, mas parece haver um problema com os dados enviados.');       
  }

  $nome = $_POST['nome']; 
  $email = $_POST['email']; 
  $mensagem = $_POST['mensagem']; 

  $email_message = "Detalhes do formulário de contato abaixo.\n\n";

  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

  $email_message .= "Nome: ".clean_string($nome)."\n";
  $email_message .= "Email: ".clean_string($email)."\n";
  $email_message .= "Mensagem: ".clean_string($mensagem)."\n";

  $headers = 'From: '.$email."\r\n".
  'Reply-To: '.$email."\r\n" .
  'X-Mailer: PHP/' . phpversion();
  
  if (@mail($email_to, $email_subject, $email_message, $headers)) {
    ?>

    <!-- Mensagem de sucesso -->
    Obrigado por entrar em contato conosco. Responderemos assim que possível.

    <?php
  } else {
    died('Ocorreu um erro ao enviar o email.');
  }
}
?>
