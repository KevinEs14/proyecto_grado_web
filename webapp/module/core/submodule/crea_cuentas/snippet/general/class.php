<?php
class Snippet extends Table
{
    var $item_form;
    function __construct()
    {
        /**
         * Inicializamos todas las librerias y variables para el submodulo
         */
        $this->submodule_init_sbm();

    }
    /**
     * Function que actualiza la informacion de datos de un registro
     * $respuesta = $subObjItem->item_update($item,$itemId,0);
     * $rec = arreglo de datos que llega del formulario
     * $itemId= el id del reguistro que quiero actualizar
     * $que_form = El formulario dentro que quiero actualizar, "Es el mismo nombre del grupo de campos que quiero validar"
     * $accion = new, update ,  solo existen 2 acciones
     *
     **/
    function item_update($rec,$itemId,$que_form,$accion){
        /**
         * preprocesamos los datos
         */
        
        $respuesta_procesa = $this->procesa_datos($que_form,$rec,$accion);
        /**
         * Guardo los datos ya procesados
         */
        if($que_form==="usuario"){
            $respuesta_procesa["password"]=$_POST["pass"];
        }
        $campo_id="itemId";
        $where="";
        $ver=$this->verificar_permiso_usuarios(["1"]);
        if($ver)
        {
            $this->dbm->startTrans();
            $res = $this->item_update_sbm($itemId,$respuesta_procesa,$que_form,$accion,$campo_id,$where);
            if($this->dbm->errorMsg()){
                
                $res["msgdb2"] = $this->dbm->ErrorMsg();
                }
            $rec["usuario_itemId"]=$res["id"];
            $rol=$rec["rol_itemId"];
            $tabla="";
            if($rol=="2"){
                $tabla="cazador";
            }
            if($rol=="3"){
    
                $tabla="representante_legal";
            }
            if($rol=="4"){
    
                $tabla="responsable_curtiembre";
            }
            if($rol=="5"){
    
                $tabla="representante_empresa";
            }
            if($rol=="2"||$rol=="3"||$rol=="4"||$rol=="5"){
                $respuesta_procesa = $this->procesa_datos($tabla,$rec,$accion);
                $res2 = $this->item_update_sbm($itemId,$respuesta_procesa,$tabla,$accion,$campo_id,$where);
            }
            if($this->dbm->errorMsg()){
                
            $res["msgdb"] = $this->dbm->ErrorMsg();
            }
            
            $this->dbm->completeTrans();            
        
        }
        else{
            
            $res["res"] = 2;
            $res["msg"] = "No se logro actualizar la informacion en la B.D.";
            $res["msgdb"] = $this->dbm->ErrorMsg();
        }
        $res["accion"] = $accion;
        return $res;
    }
    /**
     * Funcion que valida los campos a ser guardados
     **/
    function procesa_datos($que_form,$rec,$accion="new"){
        $dato_resultado = array();
        $dato_resultado = $this->procesa_campos_sbm($rec,$this->campos[$que_form],$accion);
        return $dato_resultado;
    }
    
    /**
	 * Table::subirFotoServidor()
	 * 
	 * @param mixed $rol_Id
	 * @return boolean
	 */
    
}