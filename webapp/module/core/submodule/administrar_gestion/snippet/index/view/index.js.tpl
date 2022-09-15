{include file="lista/lista.js.tpl"}
{literal}
<script>
    var snippet_button_update = function () {
        var btn_update = $('#btn_update');
        var handle_button_update = function(){
            btn_update.click(function(e){
                e.preventDefault();
                item_Update("","new");
            });
        }
        return {
            // public functions
            init: function() {
                handle_button_update();
            }
        };
    }();

    jQuery(document).ready(function() {
        snippet_button_update.init();
    });
    function item_Update(id,type){
                console.log("{/literal}{$getModule}{literal}&accion=verGestion");
        $.get( "{/literal}{$getModule}{literal}",
            {accion:"verGestion"},
            function(res){
                if(!res){
                    //swal('Eliminado!','El registro fue eliminado','success');
                    swal({position: 'top-center',type: 'warning',title: 'La gestion actual ya esta registrada.',showConfirmButton: false,timer: 2000});
                    table_list.draw();
                }else if(res){
                    var url = '{/literal}{$getModule}{literal}&accion=itemUpdate&id=1&type='+type;
                    location = url;
                }
            },"json");
        
    }
</script>
{/literal}