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

    public function conf_catalog_datos_general($departamento_itemId,$provincia_itemId){

        
        $ver=$this->verificar_permiso_usuario("1");
        if($ver){
                $this->addCatalogList("vrhr_territorio.departamento","Departamento","","nombre","","itemId","","","");
            if($departamento_itemId!=null){
                $this->addCatalogList("vrhr_territorio.provincia","Provincia","","nombre","","itemId","departamentoId='".$departamento_itemId."'","","");
            }
            if($provincia_itemId!=null){
                $this->addCatalogList("vrhr_territorio.municipio","Municipio","","nombre","","itemId","provinciaId='".$provincia_itemId."'","","");
            }
        }

    }

}