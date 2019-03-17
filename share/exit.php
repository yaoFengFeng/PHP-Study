<?php
session_start();
unset($_SESSION['username']);
setcookie(session_name(),'',time(),'/');
session_destroy();