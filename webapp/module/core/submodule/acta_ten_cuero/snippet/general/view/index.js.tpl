{literal}
<script>
	var direccionAPI="http://localhost:3000/";
    var snippet_general_form = function() {
        var idficha = '{/literal}{$id}{literal}';
        var type = '{/literal}{$type}{literal}';
        var general_btn_submit_carne = $('#general_submit_carne');
        var general_btn_submit_cuero = $('#general_submit_cuero');

        var handle_general_components = function(){

            $('.select2_general').select2({
                placeholder: "Seleccione una opción"
            });

        };
        var gen_reporte_carne=function(){
            general_btn_submit_carne.click(function(){
                var curt=$("#curtiembre").val();
                var gest=$("#gestion").val();
                if(curt){
                url = direccionAPI+'curt-actas/carne/pdf/'+curt+'/'+gest;
                window.open(url, '_blank');
                return false;}
            });
        }
        var gen_reporte_cuero=function(){
            general_btn_submit_cuero.click(function(){
                var curt=$("#curtiembre").val();
                var gest=$("#gestion").val();
                if(curt){
                url =  direccionAPI+'curt-actas/cuero/pdf/'+curt+'/'+gest;
                window.open(url, '_blank');
                return false;}
            });
        }

        //== Public Functions
        return {
            // public functions
            init: function() {
                handle_general_components();
                gen_reporte_carne();
                gen_reporte_cuero();
            }
        };
    }();

    //== Class Initialization
    jQuery(document).ready(function() {
        snippet_general_form.init();
    });

</script>
{/literal}