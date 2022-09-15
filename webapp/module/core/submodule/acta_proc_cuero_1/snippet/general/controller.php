<?php
/**
 * Todo el sub Control se recuperará mediante llamadas por ajax
 */
$templateModule = $templateModuleAjax;

$filas=$_POST;
switch($accion){

    /**
     * Página por defecto (index)
     */

    default:
        $smarty->assign("type",$type);
        $rol_itemId=$objItem->obtenerTCO();
        $smarty->assign("rol_itemId",$rol_itemId["rol_itemId"]);
        
        if($type=="update"){
            $item = $objItem->get_item($id,"tipo");
            $smarty->assign("item",$item);
            $filas=$objItem->obtenerLongitudTotal($id);
            $smarty->assign("filas",$filas);
        }
        else{
            $filas=$objItem->obtenerLongitudTotal();
            $smarty->assign("filas",$filas);
            $total=$objItem->obtenerDisponibleCuero();
            $item["total_chalecos"]=$total[0];
            $item["total_colas"]=$total[1];
            $smarty->assign("item",$item);


        }

        $subObjCatalog->conf_catalog_datos_general();
        $cataobj = $subObjCatalog->obtCurtiembre();
        // print_struc($cataobj);

        $smarty->assign("cataobj",$cataobj);
        $smarty->assign("subpage",$webm["sc_index"]);
        break;



    case 'itemupdatesql':
        $total=$objItem->obtenerDisponibleCuero();
        $respuesta = $subObjItem->item_update($item,$itemId,"acta_cuero",$type,$total);
        $core->print_json($respuesta);
        break;

    case 'get.tipo':
        $item = $subObjCatalog->get_tipo_options($id);
        $core->print_json($item);
        break;
    case 'get.unidad':
        $item = $subObjCatalog->get_unidad_options($id);
        $core->print_json($item);
        break;

}