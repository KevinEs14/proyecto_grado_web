<?php
/**
 * db.php
 * Contiene la conexion a base de datos
 * mysql y postgresql del sistema
 */
if(isset($_SESSION["auth"]) or $action =="login"){
    //include_once("./lib/adodb/adodb.inc.php");
    //include_once("./lib/adodb/tohtml.inc.php");
    global $db,$dbsig;
    $db = ADONewConnection($CFG->dbType);
    $db->Connect($CFG->dbServer,$CFG->dbUser, $CFG->dbPassword, $CFG->dbDatabase);
    print($db->errorMsg());
    $db->setCharset('utf8');
    $db->SetFetchMode(ADODB_FETCH_ASSOC);
    if ($CFG->debug){
    	$db->debug = true;
    }
    //global $dbsig;
    //$dbsig = ADONewConnection($CFG->dbTypeSig);
    //$dbsig->PConnect($CFG->dbServerSig,$CFG->dbUserSig,$CFG->dbPasswordSig,$CFG->dbDatabaseSig);
}
