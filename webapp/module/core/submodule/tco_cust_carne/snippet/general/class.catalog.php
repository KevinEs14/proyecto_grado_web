<?php
/**
 * User: henrytaby
 * Date: 3/5/2018
 * Time: 15:22
 */

class Subcatalogo extends Table{

    function __construct(){
        /**
         * Inicializamos todas las librerias y variables para el submodulo
         */
        $this->submodule_init_sbm();

    }
    
    public function obtCazadores(){
        $sql="SELECT cz.itemId,usu.nombre,usu.apellido
        FROM cazador cz
        INNER JOIN usuario usu on 
        usu.itemId=cz.usuario_itemId
        INNER JOIN representante_legal rl on
        rl.tco_itemId=cz.tco_itemId
        INNER JOIN usuario usu2 on 
        (usu2.itemId=rl.usuario_itemId or usu2.rol_itemId=1)
        WHERE usu2.itemId=".$_SESSION["memberId"] ;
        $res=$this->dbm->Execute($sql);
        $res=$res->GetRows();        
        $opt = array();
        foreach($res as $row){
                $opt[$row["itemId"]] = $row["nombre"]." ".$row["apellido"];
        }
		return $opt;
        
    }
    public function conf_catalog_datos_general(){



    }

}